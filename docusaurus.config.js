// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'SmartAdmin Docs',
  tagline: 'AI-Powered RPA for Logistics: From Natural Language to Safe Workflow Automation',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://uparcelchengz.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/smartadmin-docs/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'uparcelchengz', // Usually your GitHub org/user name.
  projectName: 'smartadmin-docs', // Usually your repo name.

  onBrokenLinks: 'ignore', // Temporarily ignore broken links

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false, // Disable blog entirely
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themes: ['@docusaurus/theme-mermaid'],

  // In order for Mermaid code blocks in Markdown to be rendered as diagrams,
  // you also need to enable the Remark plugin with this option
  markdown: {
    mermaid: true,
  },

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: 'img/docusaurus-social-card.jpg',
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true,
        respectPrefersColorScheme: false,
      },
      navbar: {
        style: 'dark',
        title: 'SmartAdmin Docs',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'tutorialSidebar',
            position: 'left',
            label: 'Documentation',
          },
          {
            href: 'https://uparcelchengz.github.io/smartadmin/app/',
            label: 'SmartAdmin APP',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Project Overview',
                to: '/docs/overview',
              },
              {
                label: 'Architecture',
                to: '/docs/architecture',
              },
              {
                label: 'User Guide',
                to: '/docs/user/login',
              },
              {
                label: 'Electron Components',
                to: '/docs/electron/main',
              },
            ],
          },
          {
            title: 'AI Integration',
            items: [
              {
                label: 'OpenRouter API',
                to: '/docs/ai/openrouter',
              },
              {
                label: 'Local LLaMA',
                href: '/docs/ai/local',
              },
              {
                label: 'RAG System',
                href: '/docs/ai/rag',
              },
            ],
          },
          {
            title: 'Community & Resources',
            items: [
              {
                label: 'GitHub Repository',
                href: 'https://github.com/uparcelchengz/smartadmin-docs',
              },
              {
                label: 'Browser Extension',
                href: 'https://uparcelchengz.github.io/smartadmin/extension/',
              },
              {
                label: 'Extension Install Guide',
                href: 'https://uparcelchengz.github.io/smartadmin/extension/install.html',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'License',
                href: 'https://github.com/uparcelchengz/smartadmin-docs/blob/main/LICENSE',
              },
              {
                label: 'Issues',
                href: 'https://github.com/uparcelchengz/smartadmin-docs/issues',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} SmartAdmin Project. Docs built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
      mermaid: {
        theme: {light: 'neutral', dark: 'dark'},
        options: {
          themeVariables: {
            primaryColor: '#a259ff',
            primaryTextColor: '#c7a4ff',
            primaryBorderColor: '#b066ff',
            lineColor: '#b48cff',
            sectionBkgColor: 'rgba(162, 89, 255, 0.1)',
            altSectionBkgColor: 'rgba(199, 164, 255, 0.05)',
            gridColor: 'rgba(199, 164, 255, 0.2)',
            tertiaryColor: 'rgba(45, 24, 70, 0.8)',
          },
        },
      },
    }),
};

export default config;
