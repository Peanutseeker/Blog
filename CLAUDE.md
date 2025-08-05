# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based blog application built with TypeScript. The project uses Astro's static site generation capabilities with support for Markdown and MDX content, mathematical expressions via KaTeX, and Mermaid diagrams.

## Development Commands

- `npm run dev` - Start local development server at localhost:4321
- `npm run build` - Build production site to ./dist/
- `npm run preview` - Preview built site locally
- `npm run astro` - Run Astro CLI commands

## Architecture & Structure

### Content Management
- Blog posts are stored in `src/posts/` as Markdown (.md) and MDX (.mdx) files
- Content schema is defined in `src/content.config.ts` with required frontmatter fields:
  - `title` (string): Post title
  - `description` (string): Post description  
  - `pubDate` (date): Publication date
  - `updatedDate` (date, optional): Last updated date
  - `heroImage` (image, optional): Hero image for the post

### Key Directories
- `src/components/` - Reusable Astro components (BaseHead, Header, Footer, etc.)
- `src/layouts/` - Page layout templates (BlogPost.astro)
- `src/pages/` - Route-based pages including blog index and individual post pages
- `src/assets/images/` - Static images used in blog posts
- `src/private-notes/` - Private content not published to the blog

### Configuration
- Site configuration in `astro.config.mjs` includes:
  - Site URL: https://peanutseeker.github.io
  - Integrations: Expressive Code, MDX, Sitemap
  - Markdown plugins: KaTeX for math, Mermaid for diagrams
- Global constants in `src/consts.ts` (SITE_TITLE, SITE_DESCRIPTION)

### Special Features
- Mathematical expressions supported via remark-math + rehype-katex
- Mermaid diagrams supported via remark-mermaidjs
- Code syntax highlighting via astro-expressive-code
- RSS feed generation
- Sitemap generation
- Image optimization with Sharp

## Content Creation
When creating new blog posts:
1. Add .md or .mdx files to `src/posts/`
2. Include required frontmatter fields (title, description, pubDate)
3. Images should be placed in `src/assets/images/` and referenced relatively
4. Math expressions use LaTeX syntax wrapped in $ or $$
5. Mermaid diagrams use ```mermaid code blocks

## Important Restrictions

**NEVER modify these directories - they contain the user's personal content:**
- `src/assets/images/` - User's image collection and blog assets

- `src/private-notes/` - User's private notes and drafts

Only make changes to code files (components, layouts, configuration) and never alter the user's content or images.

## Testing
- Playwright is configured for end-to-end testing
- Run tests with appropriate Playwright commands