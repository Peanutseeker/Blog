// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import rehypeKatex from 'rehype-katex';
import remarkMermaid from 'remark-mermaidjs';
import remarkMath from 'remark-math';
import remarkGithubAdmonitions from 'remark-github-beta-blockquote-admonitions';
import { remarkMark } from 'remark-mark-highlight';

// https://astro.build/config
export default defineConfig({
  site:'https://peanutseeker.github.io',
	integrations: [expressiveCode(), mdx(), sitemap(), react()],
	markdown: {
    rehypePlugins: [
      rehypeKatex,
    ],
		remarkPlugins:[
			remarkMermaid,
      remarkMath,
      remarkGithubAdmonitions,
      remarkMark
		]
  },
});
