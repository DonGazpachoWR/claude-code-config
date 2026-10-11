import type { Register } from 'claude-code'

// Compacta tras 15 min sin respuesta del usuario (con la caché de 1 h aún
// caliente, compactar ahí es barato), y cuando el contexto crece demasiado
// pide un informe de traspaso, hace /clear y retoma desde el informe. El modo
// lo decide Opus al cargar un skill modo-*; aquí solo se muestra y se conserva
// a través del traspaso.
const IDLE_MS = 15 * 60_000
const IDLE_MIN_TOKENS = 40_000
const HANDOFF_PERCENT = 60
const HANDOFF_TOKENS = 250_000
const TICK_MS = 30_000

const COMPACT_INSTRUCTIONS =
  'Conserva: modo de trabajo activo, objetivo, decisiones y su porqué, estado actual (hecho / en curso / pendiente), ' +
  'rutas y comandos relevantes, jobs en Garnatxa, fuentes/DOIs/accesiones verificadas y próximos pasos.'

const handoffPrompt = (why: string, path: string) =>
  `[context-guard] ${why}. Escribe ahora un informe de traspaso en \`${path}\` ` +
  '(crea la carpeta si no existe) para continuar en una conversación nueva. Incluye: objetivo; ' +
  'decisiones y su justificación; estado (hecho / en curso / pendiente); archivos, rutas y comandos; ' +
  'jobs en Garnatxa; fuentes, DOIs y accesiones verificadas; problemas abiertos; próximos pasos concretos. ' +
  'Máximo ~150 líneas. No hagas nada más y responde solo "Informe guardado".'

const resumePrompt = (path: string, skill: string | undefined) =>
  `Continuamos desde una conversación anterior. Lee \`${path}\`, resume en 5 líneas como máximo ` +
  'dónde estamos y cuál es el siguiente paso, y espera mis instrucciones.' +
  (skill === undefined ? '' : ` Seguimos en el mismo modo: invoca el skill \`${skill}\` antes de responder.`)

const MODE_SKILLS: Record<string, string> = {
  'modo-investigacion': 'investigación',
  'modo-implementacion': 'implementación',
}

// none → requested (umbral o /handoff) → writing (el modelo escribe el
// informe) → clearing (informe en disco: /clear y retomar) → none
type Phase = 'none' | 'requested' | 'writing' | 'clearing'

export const register: Register = on => {
  let runTick: (() => Promise<void>) | undefined
  let isBusy = false
  let lastDoneAt: number | undefined
  let isIdleHandled = false
  let isHandoffOff = false
  let phase: Phase = 'none'
  let why = ''
  let reportPath = ''
  let modeSkill: string | undefined
  let isHandoffClear = false
  let contextPercent: number | undefined

  const status = () =>
    [modeSkill === undefined ? 'modo: normal' : `modo: ${MODE_SKILLS[modeSkill]}`]
      .concat(contextPercent === undefined ? [] : [`ctx ${contextPercent}%`])
      .join(' · ')

  const reset = () => {
    isBusy = false
    lastDoneAt = undefined
    isIdleHandled = false
    isHandoffOff = false
    contextPercent = undefined
    if (isHandoffClear) isHandoffClear = false
    else modeSkill = undefined
  }

  const tickSoon = () => {
    void runTick?.()
  }

  on('session.start', async ($, e, next) => {
    runTick = async () => {
      if (isBusy) return
      if (phase === 'requested') {
        const stamp = new Date(await $.clock.now()).toISOString().slice(0, 16).replace(/[-:T]/g, '')
        reportPath = `${await $.session.root()}/.claude/handoff/${stamp}.md`
        phase = 'writing'
        $.ui.toast(`context-guard: ${why}; generando informe de traspaso`)
        void $.prompt.submit({ text: handoffPrompt(why, reportPath) })
        return
      }
      if (phase === 'clearing') {
        phase = 'none'
        const skill = modeSkill
        isHandoffClear = true
        await $.command.run({ command: 'clear' })
        reset()
        void $.prompt.submit({ text: resumePrompt(reportPath, skill) })
        return
      }
      if (phase !== 'none' || lastDoneAt === undefined || isIdleHandled) return
      if ((await $.clock.now()) - lastDoneAt < IDLE_MS) return
      isIdleHandled = true
      const { context } = await $.session.usage()
      if ((context.tokens ?? 0) < IDLE_MIN_TOKENS) return
      const compacted = await $.session.compact({ instructions: COMPACT_INSTRUCTIONS })
      $.ui.toast(
        compacted.skip !== undefined
          ? `context-guard: compactación omitida (${compacted.skip})`
          : 'context-guard: conversación compactada tras 15 min de inactividad',
      )
    }
    $.clock.every(TICK_MS, () => {
      runTick?.().catch(err => $.ui.log(`context-guard: ${String(err)}`))
    })
    await $.command.register({
      name: 'handoff',
      description: 'Guarda un informe de traspaso, hace /clear y retoma desde él',
    })
    return next(e)
  })

  on('command.run', { command: 'handoff' }, async $ => {
    if (phase !== 'none') return { text: 'Ya hay un traspaso en curso.' }
    phase = 'requested'
    why = 'Traspaso pedido por el usuario'
    $.clock.after(500, tickSoon)
    return { text: 'Generando informe de traspaso…' }
  })

  on('tool.call', { tool: 'Skill' }, async ($, e, next) => {
    const result = await next(e)
    if (MODE_SKILLS[e.skill] !== undefined && e.agentId === undefined) {
      modeSkill = e.skill
      $.ui.status(status())
    }
    return result
  })

  on('turn.start', ($, e, next) => {
    isBusy = true
    return next(e)
  })

  on('turn.complete', async ($, e, next) => {
    const result = await next(e)
    if (e.agentId !== undefined) return result
    isBusy = false
    lastDoneAt = await $.clock.now()
    isIdleHandled = false
    if (e.isAborted) return result

    if (phase === 'writing') {
      if (await $.fs.exists(reportPath)) {
        phase = 'clearing'
        $.clock.after(1_000, tickSoon)
      } else {
        phase = 'none'
        isHandoffOff = true
        $.ui.toast(`context-guard: no se encontró ${reportPath}; traspaso cancelado`)
      }
      return result
    }

    const { context } = await $.session.usage()
    contextPercent = context.percent
    $.ui.status(status())
    const isOverLimit =
      (context.percent ?? 0) >= HANDOFF_PERCENT || (context.tokens ?? 0) >= HANDOFF_TOKENS
    if (phase === 'none' && !isHandoffOff && isOverLimit) {
      phase = 'requested'
      why = `El contexto ha llegado al ${context.percent ?? '?'}% (${context.tokens ?? '?'} tokens)`
      $.clock.after(500, tickSoon)
    }
    return result
  })

  on('session.end', ($, e, next) => {
    if (e.reason === 'clear') reset()
    return next(e)
  })
}
