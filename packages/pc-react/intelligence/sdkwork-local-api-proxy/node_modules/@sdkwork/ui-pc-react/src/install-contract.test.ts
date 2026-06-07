import { existsSync, readFileSync, realpathSync } from 'node:fs';
import { dirname, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const workspaceAppsRoot = resolve(packageRoot, '..', '..');
const packageJson = JSON.parse(readFileSync(resolve(packageRoot, 'package.json'), 'utf8')) as {
  scripts?: Record<string, string>;
  types?: string;
  exports?: Record<string, unknown>;
};

const criticalRuntimePackages = [
  'react',
  'react-dom',
  'cmdk',
  'lucide-react',
  '@types/react',
  '@types/react-dom',
];

function resolveDependencyEntry(packageName: string): string {
  const segments = packageName.split('/');
  return resolve(packageRoot, 'node_modules', ...segments);
}

function isInsidePackageRoot(targetPath: string): boolean {
  const relativePath = relative(packageRoot, targetPath);

  return relativePath !== ''
    && relativePath !== '.'
    && !relativePath.startsWith(`..${sep}`)
    && relativePath !== '..';
}

function isInsideWorkspaceAppsRoot(targetPath: string): boolean {
  const relativePath = relative(workspaceAppsRoot, targetPath);

  return relativePath !== ''
    && relativePath !== '.'
    && !relativePath.startsWith(`..${sep}`)
    && relativePath !== '..';
}

describe('sdkwork-ui install contract', () => {
  it('keeps critical dependency entrypoints inside this package boundary', () => {
    const offenders = criticalRuntimePackages.flatMap((packageName) => {
      const dependencyEntry = resolveDependencyEntry(packageName);

      if (!existsSync(dependencyEntry)) {
        return [`missing dependency entry: ${packageName}`];
      }

      const resolvedEntry = realpathSync(dependencyEntry);

      return (isInsidePackageRoot(resolvedEntry) || isInsideWorkspaceAppsRoot(resolvedEntry))
        ? []
        : [`${packageName} -> ${resolvedEntry}`];
    });

    expect(offenders).toEqual([]);
  });

  it('ships prebuilt assets for git dependency installs instead of relying on prepare hooks', () => {
    expect(packageJson.scripts?.prepare).toBeUndefined();
    expect(existsSync(resolve(packageRoot, 'dist', 'index.js'))).toBe(true);
    expect(existsSync(resolve(packageRoot, 'dist', 'sdkwork-ui.css'))).toBe(true);
  });

  it('points all published type entries at files shipped in dist', () => {
    const typeEntries = [
      packageJson.types,
      ...Object.values(packageJson.exports ?? {})
        .filter((entry): entry is { types: string } => (
          Boolean(entry)
          && typeof entry === 'object'
          && !Array.isArray(entry)
          && typeof (entry as { types?: unknown }).types === 'string'
        ))
        .map((entry) => entry.types),
    ].filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);

    const missingTypeEntries = typeEntries.filter((entry) => (
      !existsSync(resolve(packageRoot, entry))
    ));

    expect(missingTypeEntries).toEqual([]);
  });
});
