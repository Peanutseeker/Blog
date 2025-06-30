// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMermaid from 'remark-mermaidjs'; // 注意这里是 remarkMermaid
import expressiveCode from 'astro-expressive-code';



// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap(),expressiveCode()],
	markdown: {
    // ... 其他 remark 插件
    rehypePlugins: [
      rehypeKatex, // 在这里添加 KaTeX 插件

    ],
		remarkPlugins:[
			remarkMermaid,
		]
  },
});
