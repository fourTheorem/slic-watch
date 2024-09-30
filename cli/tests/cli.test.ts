import childProcess from 'node:child_process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { promisify } from 'node:util'
import tap from 'tap'
import tmp from 'tmp'
const execFile = promisify(childProcess.execFile)

const cliPath = path.resolve(__dirname, '../index')

interface RunResult {
  stdout: string
  stderr: string
  exitCode: number | null
}

interface ExecFileError {
  code: number | null
  stdout: string
  stderr: string
}

async function runCli (cliArgs: string[] = []): Promise<RunResult> {
  try {
    const { stderr, stdout } = await execFile('tsx', [cliPath, ...cliArgs])

    return {
      stdout: stdout.trim(),
      stderr: stderr.trim(),
      exitCode: 0
    }
  } catch (e) {
    const err = e as ExecFileError
    return {
      stdout: err.stdout.trim(),
      stderr: err.stderr.trim(),
      exitCode: err.code
    }
  }
}

tap.test('CLI should print error when no arguments are provided', async (t) => {
  const { stderr, exitCode } = await runCli()
  t.equal(exitCode, 1)
  t.equal(stderr, "error: missing required argument 'input_template'")
  t.end()
})

tap.test('CLI should print error when no output template file is provided', async (t) => {
  const { stderr, exitCode } = await runCli(['/path/to/non-existent/template.json'])
  t.equal(exitCode, 1)
  t.equal(stderr, "error: missing required argument 'output_template'")
  t.end()
})

tap.test('CLI should print error when a non-existent input template file is provided', async (t) => {
  const { stderr, exitCode } = await runCli(['/path/to/non-existent/template.json', '/tmp/out.json'])
  t.equal(exitCode, 1)
  t.ok(stderr.includes('no such file or directory'))
  t.end()
})

tap.test('CLI should succeed with valid input file', async (t) => {
  const inputFile = tmp.tmpNameSync({ postfix: '.json' })
  await fs.writeFile(inputFile, '{}')
  const outputFile = tmp.tmpNameSync({ postfix: '.json' })
  const { stderr, exitCode } = await runCli([inputFile, outputFile])
  t.equal(stderr, '')
  t.equal(exitCode, 0)
})
