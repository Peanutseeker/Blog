// @ts-check
import { defineConfig } from 'astro/config';
import expressiveCode from 'astro-expressive-code';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import rehypeKatex from 'rehype-katex';
import remarkMermaid from 'remark-mermaidjs'; // 注意这里是 remarkMermaid
import remarkMath from 'remark-math'; // 确保也安装和引入了这个



// https://astro.build/config
export default defineConfig({
  site:'https://peanutseeker.github.io',
  base: '/Blog/',
	integrations: [expressiveCode(),mdx(), sitemap()],
	markdown: {
    // ... 其他 remark 插件
    rehypePlugins: [
      rehypeKatex, // 在这里添加 KaTeX 插件
    ],
		remarkPlugins:[
			remarkMermaid,
      remarkMath
		]
  },
});
