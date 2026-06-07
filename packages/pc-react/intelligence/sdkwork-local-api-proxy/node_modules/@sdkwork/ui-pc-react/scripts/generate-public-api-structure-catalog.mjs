import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const cwd = process.cwd();
const outputPath = resolve(cwd, 'docs/reference/public-api-structure-catalog.md');
const catalogPath = resolve(cwd, 'src/components/ui/catalog.ts');
const runtimeIdentityContractPath = resolve(cwd, 'src/runtime-metadata-identity-contract.test.ts');
const uiEntryPath = 'src/components/ui/index.ts';
const patternEntryPath = 'src/components/patterns/index.ts';
const rootEntryPath = 'src/index.ts';
const uiDomainOrder = [
  'actions',
  'dataEntry',
  'dataDisplay',
  'feedback',
  'form',
  'layout',
  'navigation',
  'overlays',
];
const uiDomainLabels = {
  actions: 'Actions',
  dataDisplay: 'Data Display',
  dataEntry: 'Data Entry',
  feedback: 'Feedback',
  form: 'Form',
  layout: 'Layout',
  navigation: 'Navigation',
  overlays: 'Overlays',
};

function normalizePath(filePath) {
  return filePath.replace(/\\/g, '/');
}

function toRepoRelativePath(filePath) {
  return normalizePath(relative(cwd, filePath));
}

function toTitleCase(value) {
  return value
    .split(/[-\s]+/g)
    .filter(Boolean)
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(' ');
}

function toKebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/([A-Z]+)([A-Z][a-z])/g, '$1-$2')
    .toLowerCase();
}

function unwrapExpression(node) {
  let currentNode = node;

  while (
    ts.isAsExpression(currentNode)
    || ts.isSatisfiesExpression(currentNode)
    || ts.isParenthesizedExpression(currentNode)
  ) {
    currentNode = currentNode.expression;
  }

  return currentNode;
}

function getObjectLiteralPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) {
    return name.text;
  }

  return null;
}

function parseStringArrayMap(filePath, variableName) {
  const source = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let parsedValue = null;

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) {
      return;
    }

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== variableName) {
        continue;
      }

      const initializer = declaration.initializer ? unwrapExpression(declaration.initializer) : null;

      if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
        throw new Error(`${variableName} must be initialized with an object literal in ${filePath}`);
      }

      parsedValue = Object.fromEntries(
        initializer.properties
          .filter((property) => ts.isPropertyAssignment(property))
          .map((property) => {
            const propertyName = getObjectLiteralPropertyName(property.name);

            if (!propertyName || !ts.isArrayLiteralExpression(property.initializer)) {
              throw new Error(`Invalid ${variableName}.${propertyName ?? '<unknown>'} entry in ${filePath}`);
            }

            return [
              propertyName,
              property.initializer.elements.map((element) => {
                if (!ts.isStringLiteral(element) && !ts.isNoSubstitutionTemplateLiteral(element)) {
                  throw new Error(`Expected string literal entries in ${variableName}.${propertyName}`);
                }

                return element.text;
              }),
            ];
          }),
      );
    }
  });

  if (!parsedValue) {
    throw new Error(`Unable to locate ${variableName} in ${filePath}`);
  }

  return parsedValue;
}

function parseStringMap(filePath, variableName) {
  const source = readFileSync(filePath, 'utf8');
  const sourceFile = ts.createSourceFile(filePath, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  let parsedValue = null;

  sourceFile.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) {
      return;
    }

    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== variableName) {
        continue;
      }

      const initializer = declaration.initializer ? unwrapExpression(declaration.initializer) : null;

      if (!initializer || !ts.isObjectLiteralExpression(initializer)) {
        throw new Error(`${variableName} must be initialized with an object literal in ${filePath}`);
      }

      parsedValue = new Map(
        initializer.properties
          .filter((property) => ts.isPropertyAssignment(property))
          .map((property) => {
            const propertyName = getObjectLiteralPropertyName(property.name);

            if (!propertyName || !ts.isStringLiteral(property.initializer)) {
              throw new Error(`Invalid ${variableName}.${propertyName ?? '<unknown>'} entry in ${filePath}`);
            }

            return [propertyName, property.initializer.text];
          }),
      );
    }
  });

  if (!parsedValue) {
    throw new Error(`Unable to locate ${variableName} in ${filePath}`);
  }

  return parsedValue;
}

function createProgramFromTsConfig() {
  const tsConfigPath = ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json');

  if (!tsConfigPath) {
    throw new Error('Unable to locate tsconfig.json for public API structure catalog generation.');
  }

  const tsConfigFile = ts.readConfigFile(tsConfigPath, ts.sys.readFile);
  const tsConfig = ts.parseJsonConfigFileContent(tsConfigFile.config, ts.sys, cwd);

  return ts.createProgram({
    rootNames: tsConfig.fileNames,
    options: tsConfig.options,
  });
}

function resolveExportSymbol(checker, symbol) {
  if (symbol.flags & ts.SymbolFlags.Alias) {
    return checker.getAliasedSymbol(symbol);
  }

  return symbol;
}

function getModuleSymbol(program, checker, modulePath) {
  const normalizedModulePath = normalizePath(resolve(cwd, modulePath));
  const sourceFile = program
    .getSourceFiles()
    .find((candidate) => normalizePath(candidate.fileName) === normalizedModulePath);

  if (!sourceFile) {
    throw new Error(`Unable to resolve source module ${modulePath}`);
  }

  const moduleSymbol = checker.getSymbolAtLocation(sourceFile)
    ?? sourceFile.symbol;

  if (!moduleSymbol) {
    throw new Error(`Unable to resolve module symbol for ${modulePath}`);
  }

  return moduleSymbol;
}

function getExportMap(program, checker, modulePath) {
  const moduleSymbol = getModuleSymbol(program, checker, modulePath);

  return new Map(
    checker.getExportsOfModule(moduleSymbol).map((symbol) => {
      const resolvedSymbol = resolveExportSymbol(checker, symbol);
      return [resolvedSymbol.getName(), resolvedSymbol];
    }),
  );
}

function getDeclarationNode(symbol) {
  return symbol.valueDeclaration ?? symbol.declarations?.[0] ?? null;
}

function inferPatternDomain(sourcePath) {
  const match = sourcePath.match(/^src\/components\/patterns\/([^/]+)\//);
  return match?.[1] ?? 'patterns';
}

function getEntityNameText(entityName) {
  if (ts.isIdentifier(entityName)) {
    return entityName.text;
  }

  if (ts.isQualifiedName(entityName)) {
    return entityName.right.text;
  }

  if (ts.isPropertyAccessExpression(entityName)) {
    return entityName.name.text;
  }

  return null;
}

function collectTypeReferenceNames(node) {
  const names = new Set();

  function visit(currentNode) {
    if (ts.isTypeReferenceNode(currentNode)) {
      const typeName = getEntityNameText(currentNode.typeName);

      if (typeName) {
        names.add(typeName);
      }
    } else if (ts.isExpressionWithTypeArguments(currentNode)) {
      const expressionName = getEntityNameText(currentNode.expression);

      if (expressionName) {
        names.add(expressionName);
      }
    }

    ts.forEachChild(currentNode, visit);
  }

  visit(node);
  return [...names];
}

function collectPropertyTypeReferenceEntries(checker, propsSymbol) {
  const propsType = checker.getDeclaredTypeOfSymbol(propsSymbol);

  return propsType.getProperties().map((propertySymbol) => {
    const typeNames = new Set();

    for (const declaration of propertySymbol.declarations ?? []) {
      if (!('type' in declaration) || !declaration.type) {
        continue;
      }

      collectTypeReferenceNames(declaration.type).forEach((typeName) => typeNames.add(typeName));
    }

    return {
      propertyName: propertySymbol.getName(),
      typeNames: [...typeNames],
    };
  });
}

function collectNestedPublicTypeNames(symbol) {
  const typeNames = new Set();

  for (const declaration of symbol.declarations ?? []) {
    if (
      ts.isInterfaceDeclaration(declaration)
      || ts.isTypeAliasDeclaration(declaration)
      || ts.isClassDeclaration(declaration)
    ) {
      collectTypeReferenceNames(declaration).forEach((typeName) => typeNames.add(typeName));
    }
  }

  return [...typeNames];
}

function categorizeContract(typeName) {
  if (typeName.endsWith('SlotProps')) {
    return 'slotContracts';
  }

  if (typeName.endsWith('Props') || typeName.endsWith('PropsResolver')) {
    return 'surfaceTypes';
  }

  if (/(Handler|Renderer|Resolver|Factory|Subscriber|Unsubscribe)$/.test(typeName)) {
    return 'callbackContracts';
  }

  return 'surfaceTypes';
}

function resolveRelevantPublicType({
  componentDirectoryPath,
  rootExportMap,
  surfaceExportMap,
  typeName,
}) {
  if (!surfaceExportMap.has(typeName) || !rootExportMap.has(typeName)) {
    return null;
  }

  const symbol = surfaceExportMap.get(typeName) ?? rootExportMap.get(typeName);
  const declaration = symbol ? getDeclarationNode(symbol) : null;

  if (!declaration) {
    return null;
  }

  const sourceFilePath = normalizePath(declaration.getSourceFile().fileName);

  if (!sourceFilePath.startsWith(componentDirectoryPath)) {
    return null;
  }

  return {
    sourceFilePath,
    symbol,
    typeName,
  };
}

function createSurfaceEntries({
  abstractRuntimeComponents,
  catalog,
  checker,
  kind,
  rootExportMap,
  surfaceExportMap,
}) {
  const sourceGroups = kind === 'ui'
    ? uiDomainOrder.map((domain) => [domain, catalog[domain].filter((name) => /^[A-Z]/.test(name))])
    : [['patterns', catalog.patterns]];

  return sourceGroups.flatMap(([groupName, componentNames]) =>
    componentNames.map((componentName) => {
      const componentSymbol = surfaceExportMap.get(componentName);

      if (!componentSymbol) {
        throw new Error(`Public ${kind} surface ${componentName} is missing from ${kind === 'ui' ? uiEntryPath : patternEntryPath}`);
      }

      const componentDeclaration = getDeclarationNode(componentSymbol);

      if (!componentDeclaration) {
        throw new Error(`Unable to resolve declaration for ${componentName}`);
      }

      const componentSourcePath = toRepoRelativePath(componentDeclaration.getSourceFile().fileName);
      const componentDirectoryPath = normalizePath(resolve(
        cwd,
        dirname(componentSourcePath),
      ));
      const propsName = `${componentName}Props`;
      const propsSymbol = surfaceExportMap.get(propsName);

      if (!propsSymbol) {
        throw new Error(`Missing public props contract ${propsName} for ${componentName}`);
      }

      const slotContracts = new Set();
      const surfaceTypes = new Set();
      const callbackContracts = new Set();
      const visitedTypeNames = new Set();
      const queue = [];

      function enqueueType(typeName) {
        if (typeName === componentName || typeName === propsName) {
          return;
        }

        const resolvedType = resolveRelevantPublicType({
          componentDirectoryPath,
          rootExportMap,
          surfaceExportMap,
          typeName,
        });

        if (!resolvedType || visitedTypeNames.has(resolvedType.typeName)) {
          return;
        }

        visitedTypeNames.add(resolvedType.typeName);

        if (categorizeContract(resolvedType.typeName) === 'slotContracts') {
          slotContracts.add(resolvedType.typeName);
        } else if (categorizeContract(resolvedType.typeName) === 'callbackContracts') {
          callbackContracts.add(resolvedType.typeName);
        } else {
          surfaceTypes.add(resolvedType.typeName);
        }

        queue.push(resolvedType.symbol);
      }

      collectPropertyTypeReferenceEntries(checker, propsSymbol)
        .flatMap((entry) => entry.typeNames)
        .forEach((typeName) => enqueueType(typeName));

      while (queue.length > 0) {
        const currentSymbol = queue.shift();

        collectNestedPublicTypeNames(currentSymbol).forEach((typeName) => enqueueType(typeName));
      }

      return {
        callbackContracts: [...callbackContracts].sort(),
        domain: kind === 'ui' ? groupName : inferPatternDomain(componentSourcePath),
        kind,
        marker: toKebabCase(componentName),
        name: componentName,
        propsName,
        runtimeStatus: abstractRuntimeComponents.has(componentName) ? 'abstract' : 'rendered',
        slotContracts: [...slotContracts].sort(),
        sourcePath: componentSourcePath,
        surfaceTypes: [...surfaceTypes].sort(),
      };
    }),
  );
}

function formatListCell(values) {
  return values.length > 0 ? values.map((value) => `\`${value}\``).join('<br>') : '-';
}

function renderTable(entries) {
  const lines = [
    '| Surface | Marker | Props | Slot Contracts | Surface Types | Callback Contracts | Runtime | Source |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
  ];

  for (const entry of entries) {
    lines.push(
      `| \`${entry.name}\` | \`${entry.marker}\` | \`${entry.propsName}\` | ${formatListCell(entry.slotContracts)} | ${formatListCell(entry.surfaceTypes)} | ${formatListCell(entry.callbackContracts)} | ${entry.runtimeStatus} | \`${entry.sourcePath}\` |`,
    );
  }

  return lines;
}

function renderGroupedSections({ entries, groupLabelResolver, groupOrder }) {
  const lines = [];

  for (const groupName of groupOrder) {
    const groupEntries = entries.filter((entry) => entry.domain === groupName);

    if (groupEntries.length === 0) {
      continue;
    }

    lines.push(`### ${groupLabelResolver(groupName)}`);
    lines.push('');
    lines.push(...renderTable(groupEntries));
    lines.push('');
  }

  return lines;
}

function summarize(entries) {
  return {
    abstractCount: entries.filter((entry) => entry.runtimeStatus === 'abstract').length,
    callbackSurfaceCount: entries.filter((entry) => entry.callbackContracts.length > 0).length,
    slotSurfaceCount: entries.filter((entry) => entry.slotContracts.length > 0).length,
    totalCount: entries.length,
  };
}

function buildMarkdown() {
  const catalog = parseStringArrayMap(catalogPath, 'uiComponentCatalog');
  const abstractRuntimeComponents = parseStringMap(
    runtimeIdentityContractPath,
    'abstractRuntimeMetadataComponents',
  );
  const program = createProgramFromTsConfig();
  const checker = program.getTypeChecker();
  const uiExportMap = getExportMap(program, checker, uiEntryPath);
  const patternExportMap = getExportMap(program, checker, patternEntryPath);
  const rootExportMap = getExportMap(program, checker, rootEntryPath);
  const uiEntries = createSurfaceEntries({
    abstractRuntimeComponents,
    catalog,
    checker,
    kind: 'ui',
    rootExportMap,
    surfaceExportMap: uiExportMap,
  });
  const patternEntries = createSurfaceEntries({
    abstractRuntimeComponents,
    catalog,
    checker,
    kind: 'pattern',
    rootExportMap,
    surfaceExportMap: patternExportMap,
  });
  const uiSummary = summarize(uiEntries);
  const patternSummary = summarize(patternEntries);
  const patternDomainOrder = [...new Set(patternEntries.map((entry) => entry.domain))];

  const lines = [
    '# Public API Structure Catalog',
    '',
    '<!-- Generated file. Do not edit directly. -->',
    '',
    'This reference page is generated by `pnpm docs:catalog` from the public runtime inventory and the exported props-type contract graph.',
    '',
    '## Summary',
    '',
    `- UI surfaces: ${uiSummary.totalCount} total, ${uiSummary.slotSurfaceCount} with slot contracts, ${uiSummary.callbackSurfaceCount} with callback contracts, ${uiSummary.abstractCount} abstract runtime surfaces`,
    `- Pattern surfaces: ${patternSummary.totalCount} total, ${patternSummary.slotSurfaceCount} with slot contracts, ${patternSummary.callbackSurfaceCount} with callback contracts, ${patternSummary.abstractCount} abstract runtime surfaces`,
    '- Rows cross-index the public runtime marker with the exported `ComponentNameProps` contract, named slot contracts, recursively discovered same-family public helper types, and callback contracts.',
    '- Use `/reference/runtime-surface-catalog` when you need concrete DOM regions and `data-slot` anatomy; use this page when you need the stable public TypeScript contract surface.',
    '',
    '## UI Surfaces',
    '',
    ...renderGroupedSections({
      entries: uiEntries,
      groupLabelResolver: (groupName) => uiDomainLabels[groupName] ?? toTitleCase(groupName),
      groupOrder: uiDomainOrder,
    }),
    '## Pattern Surfaces',
    '',
    ...renderGroupedSections({
      entries: patternEntries,
      groupLabelResolver: (groupName) => toTitleCase(groupName),
      groupOrder: patternDomainOrder,
    }),
  ];

  return `${lines.join('\n').trimEnd()}\n`;
}

const markdown = buildMarkdown();

if (process.argv.includes('--stdout')) {
  process.stdout.write(markdown);
  process.exit(0);
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(outputPath, markdown);
process.stdout.write(`Generated ${toRepoRelativePath(outputPath)}\n`);
