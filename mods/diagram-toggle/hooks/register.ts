/**
 * diagram-toggle
 *
 * Registers `/diagram activate|deactivate`, which enables or disables the
 * diagram-design plugin and reloads plugins entirely on the host, so
 * toggling it never calls a model and costs no tokens.
 *
 * Version: 0.1.0
 * Author: Adrian Berenguer-Agustí (I2SysBio-CSIC)
 * Date: 2026-10-11
 */
import type { Register } from 'claude-code'

// Plugin toggled by the command, as `claude plugin` names it.
const PLUGIN_ID = 'diagram-design@diagram-design'

// The absolute path avoids depending on the PATH the engine runs with.
const CLAUDE_BIN = '/home/adrian/.local/bin/claude'

// Maps each accepted argument to its `claude plugin` subcommand.
const ACTIONS: Record<string, string> = {
  activate: 'enable',
  deactivate: 'disable',
}

const USAGE = 'Uso: /diagram activate | deactivate'

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'diagram',
      description: 'Activate or deactivate the diagram-design plugin',
      argumentHint: 'activate | deactivate',
    })

    return next(e)
  })

  on('command.run', { command: 'diagram' }, async ($, e) => {
    const action = ACTIONS[e.args.trim()]
    let text = USAGE
    if (action !== undefined) {
      const ran = await $.process.run([
        CLAUDE_BIN, 'plugin', action, PLUGIN_ID, '--scope', 'user',
      ])
      const output = (ran.stdout + ran.stderr).trim()
      if (ran.exitCode === 0) {
        // The reload is queued until the session is idle, which happens
        // right after this command returns, so it must not be awaited.
        void $.command.run({ command: 'reload-plugins' }).catch(() =>
          $.ui.toast('diagram: run /reload-plugins to apply the change'),
        )
        text = `${output} · reloading plugins`
      } else {
        text = output || `claude plugin ${action} failed (${ran.exitCode})`
      }
    }

    return { text }
  })
}
