import { GovernedDocumentationEntry } from '../../build/docs-governance-contract';
export type DocumentationSnippet = {
    readonly code: string;
    readonly extension: 'ts' | 'tsx';
    readonly filePath: string;
    readonly index: number;
};
export type ImportReference = {
    readonly filePath: string;
    readonly packageSpecifier: string;
    readonly importedNames: readonly string[];
    readonly isSideEffectOnly: boolean;
};
export { type GovernedDocumentationEntry };
export declare const governedDocumentationEntries: ({
    readonly filePath: "README.md";
    readonly auditFrameworkImports: true;
    readonly typecheckPackageSnippets: true;
} | {
    readonly filePath: "docs/guide/getting-started.md";
    readonly auditFrameworkImports: true;
    readonly typecheckPackageSnippets: true;
} | {
    readonly filePath: "docs/reference/framework-governance.md";
    readonly auditFrameworkImports: true;
    readonly typecheckPackageSnippets: false;
} | {
    readonly filePath: "docs/reference/package.md";
    readonly auditFrameworkImports: true;
    readonly typecheckPackageSnippets: true;
} | {
    filePath: string;
    auditFrameworkImports: true;
    typecheckPackageSnippets: false;
})[];
export declare function getGovernedDocumentationPaths(filters?: Partial<Pick<GovernedDocumentationEntry, 'auditFrameworkImports' | 'typecheckPackageSnippets'>>): string[];
export declare function collectFrameworkCodeSnippets(markdownPath: string): DocumentationSnippet[];
export declare function collectFrameworkImportReferences(markdownPath: string): ImportReference[];
