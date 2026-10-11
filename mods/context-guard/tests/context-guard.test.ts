import type { On } from 'claude-code'
import { expect, mock, test } from 'claude-code/testing'
import type { Engine } from 'claude-code/testing'

const MIN = 60_000

// El mundo bajo el plugin: uso de contexto fijo, y registro de lo que pide.
const world = (on: On, usage: { tokens: number; percent: number }) => {
  const calls = { compact: [] as string[], prompts: [] as string[], commands: [] as string[] }
  const files = new Set<string>()
  const clock = mock.clock(on, { now: Date.UTC(2026, 9, 8, 10, 0) })
  on('session.usage', () => ({ value: { startedAt: 0, context: { ...usage, window: 1_000_000 }, rateLimits: [] } }))
  on('session.root', () => ({ value: '/proj' }))
  on('session.compact', (_$, e) => {
    calls.compact.push(e.instructions ?? '')
    return { messages: [{ role: 'user' as const, text: 'resumen', toolUses: [] }] }
  })
  on('prompt.submit', (_$, e) => {
    calls.prompts.push(e.text)
    return { text: e.text }
  })
  on('command.run', (_$, e) => {
    calls.commands.push(e.command)
    return { text: '' }
  })
  on('command.register', (_$, e) => ({ value: { command: e.name } }))
  on('fs.exists', (_$, e) => ({ value: files.has(e.path) }))
  on('ui.toast', () => ({ value: undefined }))
  on('ui.status', () => ({ value: undefined }))
  on('ui.log', () => ({ value: undefined }))
  on('session.start', (_$, e) => ({ cwd: e.cwd }))
  on('turn.start', (_$, e) => ({ turnId: e.turnId }))
  on('turn.complete', (_$, e) => ({ text: e.answer }))
  return { calls, files, clock }
}

const turn = async ($: Engine, id: string) => {
  await $.turn.start({ text: 'hola', turnId: id })
  await $.turn.complete({ answer: 'ok', durationMs: 1, isAborted: false, turnId: id, reason: 'answer' })
}

test('compacta tras 15 min de inactividad, una sola vez', async ($, on) => {
  const { calls, clock } = world(on, { tokens: 100_000, percent: 10 })
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  await turn($, 't1')
  await clock.advance(14 * MIN)
  expect(calls.compact.length).toBe(0)
  await clock.advance(2 * MIN)
  expect(calls.compact.length).toBe(1)
  await clock.advance(30 * MIN)
  expect(calls.compact.length).toBe(1)
})

test('no compacta un contexto pequeño', async ($, on) => {
  const { calls, clock } = world(on, { tokens: 10_000, percent: 1 })
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  await turn($, 't1')
  await clock.advance(20 * MIN)
  expect(calls.compact.length).toBe(0)
})

test('al pasar el umbral pide informe, hace /clear y retoma', async ($, on) => {
  const { calls, files, clock } = world(on, { tokens: 650_000, percent: 65 })
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  await turn($, 't1')
  await clock.advance(1_000)
  expect(calls.prompts.length).toBe(1)
  const path = /`([^`]+\.md)`/.exec(calls.prompts[0] ?? '')?.[1] ?? ''
  expect(path.startsWith('/proj/.claude/handoff/')).toBe(true)

  files.add(path)
  await turn($, 't2')
  await clock.advance(2_000)
  expect(calls.commands).toEqual(['clear'])
  expect(calls.prompts.length).toBe(2)
  expect(calls.prompts[1]).toContain(path)
  expect(calls.compact.length).toBe(0)
})

test('/handoff lanza el traspaso a mano', async ($, on) => {
  const { calls, clock } = world(on, { tokens: 50_000, percent: 5 })
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  const ran = await $.command.run({
    command: 'handoff',
    args: '',
    origin: { kind: 'composer' },
    presentation: { isFullscreen: false, columns: 120 },
  })
  expect(ran.text).toContain('traspaso')
  await clock.advance(1_000)
  expect(calls.prompts[0]).toContain('[context-guard] Traspaso pedido por el usuario')
})

test('el traspaso conserva el modo que eligió Opus', async ($, on) => {
  const { calls, files, clock } = world(on, { tokens: 650_000, percent: 65 })
  on('tool.call', () => ({ result: 'skill cargado' }))
  await $.session.start({ cwd: '/proj', surface: 'terminal', isInteractive: true })
  await $.tool.call({ tool: 'Skill', skill: 'modo-investigacion' })
  await turn($, 't1')
  await clock.advance(1_000)
  const path = /`([^`]+\.md)`/.exec(calls.prompts[0] ?? '')?.[1] ?? ''
  files.add(path)
  await turn($, 't2')
  await clock.advance(2_000)
  expect(calls.prompts[1]).toContain('modo-investigacion')
})
