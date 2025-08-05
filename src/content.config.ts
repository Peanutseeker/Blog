import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
	// Load Markdown and MDX files in the `src/posts/` directory.
	loader: glob({ pattern: '**/*.{md,mdx}', base: './src/posts' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) => z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: image().optional(),
		tags: z.array(z.string()).optional(),
		category: z.string().optional(),
	}),
});

export const collections = { posts };
