import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, relative, resolve } from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const cwd = process.cwd();
const outputPath = resolve(cwd, 'docs/reference/runtime-surface-catalog.md');
const catalogPath = resolve(cwd, 'src/components/ui/catalog.ts');
const runtimeIdentityContractPath = resolve(cwd, 'src/runtime-metadata-identity-contract.test.ts');
const frameworkComponentsRoot = normalizePath(resolve(cwd, 'src/components'));
const uiEntryPath = 'src/components/ui/index.ts';
const patternEntryPath = 'src/components/patterns/index.ts';
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
  dataEntry: 'Data Entry',
  dataDisplay: 'Data Display',
  feedback: 'Feedback',
  form: 'Form',
  layout: 'Layout',
  navigation: 'Navigation',
  overlays: 'Overlays',
};
const sourceFileContextCache = new Map();

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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getObjectLiteralPropertyName(name) {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNoSubstitutionTemplateLiteral(name)) {
    return name.text;
  }

  return null;
}

function getAttributeValue(node) {
  if (node === undefined || node === null) {
    return null;
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  if (ts.isJsxExpression(node)) {
    const expression = node.expression;

    if (expression && (ts.isStringLiteral(expression) || ts.isNoSubstitutionTemplateLiteral(expression))) {
      return expression.text;
    }
  }

  return null;
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
            const propertyValue = getAttributeValue(property.initializer);

            if (!propertyName || propertyValue === null) {
              throw new Error(`Invalid ${variableName}.${propertyName ?? '<unknown>'} entry in ${filePath}`);
            }

            return [propertyName, propertyValue];
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
    throw new Error('Unable to locate tsconfig.json for runtime surface catalog generation.');
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

function getDeclarationName(node) {
  if (ts.isFunctionDeclaration(node) || ts.isClassDeclaration(node) || ts.isTypeAliasDeclaration(node)) {
    return node.name?.text ?? null;
  }

  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name)) {
    return node.name.text;
  }

  return null;
}

function getTopLevelDeclarationMap(sourceFile) {
  const declarations = new Map();

  sourceFile.forEachChild((node) => {
    if (ts.isFunctionDeclaration(node) && node.name) {
      declarations.set(node.name.text, node);
      return;
    }

    if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) {
          declarations.set(declaration.name.text, declaration);
        }
      }
    }
  });

  return declarations;
}

function getSourceFileContext(sourceFile) {
  const sourceFilePath = normalizePath(sourceFile.fileName);
  const cachedContext = sourceFileContextCache.get(sourceFilePath);

  if (cachedContext) {
    return cachedContext;
  }

  const context = {
    declarations: getTopLevelDeclarationMap(sourceFile),
    sourceFile,
    sourceFilePath,
    sourceText: sourceFile.getFullText(),
  };

  sourceFileContextCache.set(sourceFilePath, context);

  return context;
}

function collectDirectMarkers(node) {
  const markers = {
    identities: new Map(),
    regions: new Set(),
    slots: new Set(),
    sdkSlots: new Set(),
  };
  const trackedIdentityAttributes = new Set(['data-sdk-ui', 'data-sdk-pattern']);

  function addIdentity(attributeName, value) {
    if (!markers.identities.has(attributeName)) {
      markers.identities.set(attributeName, new Set());
    }

    markers.identities.get(attributeName).add(value);
  }

  function visit(currentNode) {
    if (ts.isJsxAttribute(currentNode)) {
      const attributeName = currentNode.name.text;
      const attributeValue = getAttributeValue(currentNode.initializer);

      if (attributeValue !== null) {
        if (trackedIdentityAttributes.has(attributeName)) {
          addIdentity(attributeName, attributeValue);
        } else if (attributeName === 'data-sdk-region') {
          markers.regions.add(attributeValue);
        } else if (attributeName === 'data-slot') {
          markers.slots.add(attributeValue);
        } else if (attributeName === 'data-sdk-slot') {
          markers.sdkSlots.add(attributeValue);
        }
      }
    }

    if (ts.isPropertyAssignment(currentNode)) {
      const propertyName = getObjectLiteralPropertyName(currentNode.name);
      const propertyValue = getAttributeValue(currentNode.initializer);

      if (propertyName && propertyValue !== null) {
        if (trackedIdentityAttributes.has(propertyName)) {
          addIdentity(propertyName, propertyValue);
        } else if (propertyName === 'data-sdk-region') {
          markers.regions.add(propertyValue);
        } else if (propertyName === 'data-slot') {
          markers.slots.add(propertyValue);
        } else if (propertyName === 'data-sdk-slot') {
          markers.sdkSlots.add(propertyValue);
        }
      }
    }

    ts.forEachChild(currentNode, visit);
  }

  visit(node);

  return markers;
}

function isFrameworkComponentSourceFile(filePath) {
  return normalizePath(filePath).startsWith(frameworkComponentsRoot);
}

function nodeContainsIdentifier(node, identifierName) {
  let found = false;

  function visit(currentNode) {
    if (found || !currentNode) {
      return;
    }

    if (ts.isIdentifier(currentNode) && currentNode.text === identifierName) {
      found = true;
      return;
    }

    ts.forEachChild(currentNode, visit);
  }

  visit(node);

  return found;
}

function resolveReferencedComponentInfo(checker, node) {
  if (!ts.isIdentifier(node)) {
    return null;
  }

  const symbol = checker.getSymbolAtLocation(node);

  if (!symbol) {
    return null;
  }

  const resolvedSymbol = resolveExportSymbol(checker, symbol);
  const declaration = getDeclarationNode(resolvedSymbol);

  if (!declaration) {
    return null;
  }

  const componentName = resolvedSymbol.getName();

  if (!/^[A-Z]/.test(componentName)) {
    return null;
  }

  const sourceFile = declaration.getSourceFile();
  const sourceFilePath = normalizePath(sourceFile.fileName);

  if (!isFrameworkComponentSourceFile(sourceFilePath)) {
    return null;
  }

  return {
    declaration,
    name: componentName,
    sourceFile,
    sourceFilePath,
  };
}

function collectDelegateCandidates({
  checker,
  declaration,
  selfName,
}) {
  const currentSourceContext = getSourceFileContext(declaration.getSourceFile());
  const sameFileDelegateNames = new Set();
  const importedDelegateGroups = new Map();
  const slotDelegatedImportedGroups = new Map();

  function addImportedDelegate(info) {
    const existingGroup = importedDelegateGroups.get(info.sourceFilePath);

    if (existingGroup) {
      existingGroup.delegates.set(info.name, info);
      return;
    }

    importedDelegateGroups.set(info.sourceFilePath, {
      delegates: new Map([[info.name, info]]),
      sourceFilePath: info.sourceFilePath,
    });
  }

  function addSlotDelegatedImported(info) {
    const existingGroup = slotDelegatedImportedGroups.get(info.sourceFilePath);

    if (existingGroup) {
      existingGroup.delegates.set(info.name, info);
      return;
    }

    slotDelegatedImportedGroups.set(info.sourceFilePath, {
      delegates: new Map([[info.name, info]]),
      sourceFilePath: info.sourceFilePath,
    });
  }

  function recordReferencedComponent(info) {
    if (!info || info.name === selfName) {
      return;
    }

    if (info.sourceFilePath === currentSourceContext.sourceFilePath) {
      if (currentSourceContext.declarations.has(info.name)) {
        sameFileDelegateNames.add(info.name);
      }

      return;
    }

    addImportedDelegate(info);
  }

  function visit(currentNode) {
    if ((ts.isJsxSelfClosingElement(currentNode) || ts.isJsxOpeningElement(currentNode)) && ts.isIdentifier(currentNode.tagName)) {
      const resolvedComponentInfo = resolveReferencedComponentInfo(checker, currentNode.tagName);
      recordReferencedComponent(resolvedComponentInfo);

      const slotPropsAttribute = currentNode.attributes.properties.find(
        (property) => ts.isJsxAttribute(property) && property.name.text === 'slotProps',
      );

      if (
        resolvedComponentInfo
        && slotPropsAttribute
        && slotPropsAttribute.initializer
        && resolvedComponentInfo.sourceFilePath !== currentSourceContext.sourceFilePath
        && nodeContainsIdentifier(slotPropsAttribute.initializer, 'slotProps')
      ) {
        addSlotDelegatedImported(resolvedComponentInfo);
      }
    }

    if (ts.isCallExpression(currentNode)) {
      currentNode.arguments.forEach((argument) => {
        const candidate = unwrapExpression(argument);

        if (!ts.isIdentifier(candidate)) {
          return;
        }

        recordReferencedComponent(resolveReferencedComponentInfo(checker, candidate));
      });
    }

    ts.forEachChild(currentNode, visit);
  }

  visit(declaration);

  return {
    importedDelegateGroups: [...importedDelegateGroups.values()].map((group) => ({
      delegates: [...group.delegates.values()],
      sourceFilePath: group.sourceFilePath,
    })),
    sameFileDelegateNames: [...sameFileDelegateNames],
    slotDelegatedImportedGroups: [...slotDelegatedImportedGroups.values()].map((group) => ({
      delegates: [...group.delegates.values()],
      sourceFilePath: group.sourceFilePath,
    })),
  };
}

function mergeMarkerSets(target, source) {
  source.forEach((value) => target.add(value));
}

function getDirectMarkerFootprint(declaration) {
  const directMarkers = collectDirectMarkers(declaration);

  return directMarkers.regions.size + directMarkers.slots.size + directMarkers.sdkSlots.size;
}

function selectPrimaryImportedDelegateGroups(groups) {
  if (groups.length === 0) {
    return [];
  }

  const scoredGroups = groups.map((group) => ({
    ...group,
    count: group.delegates.length,
    score: group.delegates.reduce(
      (total, delegate) => total + getDirectMarkerFootprint(delegate.declaration),
      0,
    ),
  }));
  const maxScore = Math.max(...scoredGroups.map((group) => group.score));
  const scoreFilteredGroups = scoredGroups.filter((group) => group.score === maxScore);
  const maxCount = Math.max(...scoreFilteredGroups.map((group) => group.count));

  return scoreFilteredGroups.filter((group) => group.count === maxCount);
}

function hasExactMarkerInSource(sourceText, attributeName, expectedValue) {
  const pattern = new RegExp(
    `${escapeRegExp(attributeName)}(?:=|['"]\\s*:)[\\s\\S]{0,200}?['"]${escapeRegExp(expectedValue)}['"]`,
  );

  return pattern.test(sourceText);
}

function collectComponentMarkers({
  checker,
  declaration,
  expectedIdentity = null,
  identityAttribute = null,
  visitedComponentKeys = new Set(),
}) {
  const sourceContext = getSourceFileContext(declaration.getSourceFile());
  const directMarkers = collectDirectMarkers(declaration);
  const declarationName = getDeclarationName(declaration);
  const regions = new Set(directMarkers.regions);
  const slots = new Set(directMarkers.slots);
  const sdkSlots = new Set(directMarkers.sdkSlots);
  const componentKey = `${sourceContext.sourceFilePath}::${declarationName ?? '<anonymous>'}`;
  let hasExpectedIdentity = expectedIdentity && identityAttribute
    ? directMarkers.identities.get(identityAttribute)?.has(expectedIdentity) ?? false
    : true;
  const hasThinDirectAnatomy = regions.size === 0 && slots.size === 0 && sdkSlots.size === 0;
  const delegateCandidates = !visitedComponentKeys.has(componentKey)
    ? collectDelegateCandidates({
        checker,
        declaration,
        selfName: declarationName,
      })
    : {
        importedDelegateGroups: [],
        sameFileDelegateNames: [],
        slotDelegatedImportedGroups: [],
      };

  if (
    !visitedComponentKeys.has(componentKey)
    && (!hasExpectedIdentity || hasThinDirectAnatomy || delegateCandidates.slotDelegatedImportedGroups.length > 0)
  ) {
    const nextVisitedKeys = new Set([...visitedComponentKeys, componentKey]);
    const { sameFileDelegateNames, slotDelegatedImportedGroups } = delegateCandidates;

    for (const delegateName of sameFileDelegateNames) {
      const delegatedDeclaration = sourceContext.declarations.get(delegateName);

      if (delegatedDeclaration) {
        const delegatedMarkers = collectComponentMarkers({
          checker,
          declaration: delegatedDeclaration,
          expectedIdentity,
          identityAttribute,
          visitedComponentKeys: nextVisitedKeys,
        });

        hasExpectedIdentity = hasExpectedIdentity || delegatedMarkers.hasExpectedIdentity;
        mergeMarkerSets(regions, delegatedMarkers.regions);
        mergeMarkerSets(slots, delegatedMarkers.slots);
        mergeMarkerSets(sdkSlots, delegatedMarkers.sdkSlots);
      }
    }

    if (sameFileDelegateNames.length === 0) {
      for (const importedGroup of selectPrimaryImportedDelegateGroups(delegateCandidates.importedDelegateGroups)) {
        for (const delegate of importedGroup.delegates) {
          const delegatedMarkers = collectComponentMarkers({
            checker,
            declaration: delegate.declaration,
            visitedComponentKeys: nextVisitedKeys,
          });

          mergeMarkerSets(regions, delegatedMarkers.regions);
          mergeMarkerSets(slots, delegatedMarkers.slots);
          mergeMarkerSets(sdkSlots, delegatedMarkers.sdkSlots);
        }
      }
    }

    for (const importedGroup of selectPrimaryImportedDelegateGroups(slotDelegatedImportedGroups)) {
      for (const delegate of importedGroup.delegates) {
        const delegatedMarkers = collectComponentMarkers({
          checker,
          declaration: delegate.declaration,
          visitedComponentKeys: nextVisitedKeys,
        });

        mergeMarkerSets(regions, delegatedMarkers.regions);
        mergeMarkerSets(slots, delegatedMarkers.slots);
        mergeMarkerSets(sdkSlots, delegatedMarkers.sdkSlots);
      }
    }
  }

  if (!hasExpectedIdentity && expectedIdentity && identityAttribute) {
    hasExpectedIdentity = hasExactMarkerInSource(sourceContext.sourceText, identityAttribute, expectedIdentity);
  }

  return {
    hasExpectedIdentity,
    regions: [...regions].sort(),
    slots: [...slots].sort(),
    sdkSlots: [...sdkSlots].sort(),
  };
}

function inferPatternDomain(sourcePath) {
  const match = sourcePath.match(/^src\/components\/patterns\/([^/]+)\//);
  return match?.[1] ?? 'patterns';
}

function createSurfaceEntries({
  abstractRuntimeComponents,
  catalog,
  checker,
  exportMap,
  kind,
}) {
  const identityAttribute = kind === 'ui' ? 'data-sdk-ui' : 'data-sdk-pattern';
  const sourceGroups = kind === 'ui'
    ? uiDomainOrder.map((domain) => [domain, catalog[domain].filter((name) => /^[A-Z]/.test(name))])
    : [['patterns', catalog.patterns]];

  return sourceGroups.flatMap(([groupName, componentNames]) =>
    componentNames.map((componentName) => {
      const symbol = exportMap.get(componentName);

      if (!symbol) {
        throw new Error(`Public ${kind} surface ${componentName} is missing from ${kind === 'ui' ? uiEntryPath : patternEntryPath}`);
      }

      const declaration = getDeclarationNode(symbol);

      if (!declaration) {
        throw new Error(`Unable to resolve declaration for ${componentName}`);
      }

      const sourceFile = declaration.getSourceFile();
      const sourcePath = toRepoRelativePath(sourceFile.fileName);
      const expectedIdentity = toKebabCase(componentName);
      const abstractReason = abstractRuntimeComponents.get(componentName) ?? null;
      const markers = abstractReason
        ? {
            hasExpectedIdentity: false,
            regions: [],
            slots: [],
            sdkSlots: [],
          }
        : collectComponentMarkers({
            checker,
            declaration,
            expectedIdentity,
            identityAttribute,
          });

      if (!abstractReason && !markers.hasExpectedIdentity) {
        throw new Error(`${componentName} does not expose ${identityAttribute}="${expectedIdentity}" in generator extraction.`);
      }

      return {
        domain: kind === 'ui' ? groupName : inferPatternDomain(sourcePath),
        kind,
        marker: expectedIdentity,
        name: componentName,
        note: abstractReason,
        sdkSlots: markers.sdkSlots,
        slots: markers.slots,
        sourcePath,
        status: abstractReason ? 'abstract' : 'rendered',
        regions: markers.regions,
      };
    }),
  );
}

function formatListCell(values) {
  return values.length > 0 ? values.map((value) => `\`${value}\``).join('<br>') : '-';
}

function formatNotesCell(note) {
  return note ? note.replace(/\|/g, '\\|') : '-';
}

function renderTable(entries) {
  const lines = [
    '| Surface | Marker | Source | Regions | Slots | SDK Slots | Status | Notes |',
    '| --- | --- | --- | --- | --- | --- | --- | --- |',
  ];

  for (const entry of entries) {
    lines.push(
      `| \`${entry.name}\` | \`${entry.marker}\` | \`${entry.sourcePath}\` | ${formatListCell(entry.regions)} | ${formatListCell(entry.slots)} | ${formatListCell(entry.sdkSlots)} | ${entry.status} | ${formatNotesCell(entry.note)} |`,
    );
  }

  return lines;
}

function renderGroupedSections({ entries, groupOrder, groupLabelResolver }) {
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
  const renderedCount = entries.filter((entry) => entry.status === 'rendered').length;
  const abstractCount = entries.length - renderedCount;

  return {
    abstractCount,
    renderedCount,
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
  const uiEntries = createSurfaceEntries({
    abstractRuntimeComponents,
    catalog,
    checker,
    exportMap: uiExportMap,
    kind: 'ui',
  });
  const patternEntries = createSurfaceEntries({
    abstractRuntimeComponents,
    catalog,
    checker,
    exportMap: patternExportMap,
    kind: 'pattern',
  });
  const uiSummary = summarize(uiEntries);
  const patternSummary = summarize(patternEntries);
  const patternDomainOrder = [...new Set(patternEntries.map((entry) => entry.domain))];

  const lines = [
    '# Runtime Surface Catalog',
    '',
    '<!-- Generated file. Do not edit directly. -->',
    '',
    'This reference page is generated by `pnpm docs:catalog` from the public runtime inventory and the runtime metadata identity contract.',
    '',
    '## Summary',
    '',
    `- UI surfaces: ${uiSummary.totalCount} total, ${uiSummary.renderedCount} rendered, ${uiSummary.abstractCount} abstract`,
    `- Pattern surfaces: ${patternSummary.totalCount} total, ${patternSummary.renderedCount} rendered, ${patternSummary.abstractCount} abstract`,
    '- Columns list the exact public runtime marker, owning source file, named regions, published `data-slot` anatomy markers, and any scoped `data-sdk-slot` markers.',
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
