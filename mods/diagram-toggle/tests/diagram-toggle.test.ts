import type { On } from 'claude-code'
import { expect, test } from 'claude-code/testing'

// The world beneath the plugin: a fixed `claude plugin` outcome, and a record
// of the host commands and slash commands the plugin asks for.
const world = (on: On, exitCode: number) => {
  const calls = { argv: [] as string[][], commands: [] as string[] }
  on('process.run', (_$, e) => {
    calls.argv.push([...e.argv])
    return { value: { exitCode, stdout: 'done', stderr: '' } }
  })
  on('command.run', (_$, e) => {
    calls.commands.push(e.command)
    return { text: '' }
  })
  on('command.register', (_$, e) => ({ value: { command: e.name } }))
  on('ui.toast', () => ({ value: undefined }))
  return calls
}

test('activate enables the plugin and reloads plugins', async ($, on) => {
  const calls = world(on, 0)
  const { text } = await $.command.run({ command: 'diagram', args: 'activate' })
  expect(calls.argv[0]).toContain('enable')
  expect(calls.argv[0]).toContain('diagram-design@diagram-design')
  expect(text).toContain('reloading')
})

test('deactivate disables the plugin', async ($, on) => {
  const calls = world(on, 0)
  await $.command.run({ command: 'diagram', args: 'deactivate' })
  expect(calls.argv[0]).toContain('disable')
})

test('a failed toggle does not reload', async ($, on) => {
  const calls = world(on, 1)
  await $.command.run({ command: 'diagram', args: 'activate' })
  expect(calls.commands).not.toContain('reload-plugins')
})

test('an unknown argument runs nothing', async ($, on) => {
  const calls = world(on, 0)
  const { text } = await $.command.run({ command: 'diagram', args: 'foo' })
  expect(calls.argv).toHaveLength(0)
  expect(text).toContain('Uso')
})
