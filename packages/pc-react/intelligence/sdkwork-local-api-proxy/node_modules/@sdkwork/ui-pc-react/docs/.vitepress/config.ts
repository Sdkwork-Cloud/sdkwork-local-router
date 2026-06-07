import { defineConfig } from 'vitepress';
import generatedReferenceContract from '../../build/generated-reference-contract.json';

const nav = [
  { text: 'Guide', link: '/guide/getting-started' },
  { text: 'Design', link: '/design/architecture' },
  { text: 'Reference', link: '/reference/package' },
];

const generatedReferenceItems = generatedReferenceContract.generatedReferences.map((entry) => ({ text: entry.title, link: entry.link }));

const sidebar = [
  {
    text: 'Guide',
    items: [{ text: 'Getting Started', link: '/guide/getting-started' }],
  },
  {
    text: 'Design',
    items: [
      { text: 'Framework Benchmark', link: '/design/framework-benchmark' },
      { text: 'Architecture', link: '/design/architecture' },
      { text: 'Component Planning', link: '/design/component-planning' },
      { text: 'Desktop Shell Design', link: '/design/2026-03-31-sdkwork-ui-pc-react-desktop-shell-design' },
      { text: 'Migration Audit', link: '/design/migration-audit' },
      { text: 'PC App Adoption Matrix', link: '/design/pc-app-adoption-matrix' },
    ],
  },
  {
    text: 'Reference',
    items: [
      { text: 'Package', link: '/reference/package' },
      { text: 'Framework Governance', link: '/reference/framework-governance' },
      ...generatedReferenceItems,
    ],
  },
];

export default defineConfig({
  title: 'SDKWORK UI PC React',
  description: 'Shared PC React UI framework for SDKWORK desktop-class applications.',
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    nav,
    sidebar,
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    footer: {
      message: 'Built for the SDKWORK PC application family.',
      copyright: 'Copyright 2026 SDKWORK',
    },
  },
  head: [['meta', { name: 'theme-color', content: '#2563eb' }]],
});
