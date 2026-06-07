import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import process from 'node:process';
import { spawnSync } from 'node:child_process';

const cwd = process.cwd();
const contractPath = resolve(cwd, 'build/generated-reference-contract.json');

const { generatedReferences } = JSON.parse(readFileSync(contractPath, 'utf8'));

for (const entry of generatedReferences) {
  const result = spawnSync(process.execPath, [resolve(cwd, entry.generatorScript)], {
    cwd,
    encoding: 'utf8',
    stdio: 'pipe',
  });

  if (result.stdout) {
    process.stdout.write(result.stdout);
  }

  if (result.status !== 0) {
    if (result.stderr) {
      process.stderr.write(result.stderr);
    }

    process.exit(result.status ?? 1);
  }
}
