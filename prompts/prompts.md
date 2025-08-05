Task:
I need your help to refactor my existing Astro blog and apply a new theme based on the design mockups I've attached in the 6 pictures in @prompts.

### Project content

1. The website is an existing blog built with the Astro framework.
2. All of my blog post drafts (my content library) are stored in the directory:[src/assets] [src/contents/private-notes]. The files are in .md format.
3. You can only alter the properties sections in all of my posts in [src/content/posts]

### Core Requirement (Most Important):

Your task is to generate the code for the new theme. Under NO circumstances should you modify, delete, or touch any files within the [src/contents/private-notes] [src/assets] and [assets/images] directory. My content library must be preserved exactly as it is.

Your scope of work is limited to creating and modifying files within the src/layouts/ and src/components/ directories, as well as any related CSS files.

Notice that you should tell me how should I format my posts in order to be compatible with your defined github workflow.

### wanted style

All of the example of the final prototype are displayed in the 6 pictures in @prompts

Pay special attention to what I have written for each of the modules and buttons.
For the graphic and beauty style, I want to mimic the game Arcaea and its official website. But keep the shapes I've designed the same. Functionality and Robustness is the priority.

### Technical Implementation suggestions:
Here are some of the suggested ways. **But be sure to ultrathink and plan before you actually practice.Also you need to consider more about the structure organization of this astro project.**

**You don't need to follow these pictures strictly if you find that any of them are impractical or not robust when coding.**

Component-Based Architecture: Build the UI using reusable .astro components. For example, the unique purple arrow/diamond shape used for titles and buttons should be encapsulated into its own component (e.g., <ArrowButton.astro>).

Arrow/Diamond Shapes: Implement these shapes using the CSS clip-path property. Do not use raster images (PNG, JPG) for these core UI elements.

Labels on the blogs page: find a way to let them fixed and do not go out of shape

Interactive Features (Astro Islands):

For the "Projects" / "Papers" toggle functionality, create an interactive client-side component (e.g., <WorkTabs.jsx>) and use an Astro client:* directive (like client:load) to hydrate it.

For the collapsible sections on the "About" page, please prioritize using native HTML <details> and <summary> tags for simplicity and accessibility.

Markdown & MDX Rendering: The setup must support advanced Markdown features. Please provide the necessary configuration in astro.config.mjs to integrate remark or rehype plugins for:

Mathematical formulas (using KaTeX).

Syntax highlighting for code blocks (using a library like Prism or Shiki).

Responsive Design: All pages and layouts must be fully responsive. On smaller screens (e.g., mobile devices), the two-column layouts should adapt gracefully, such as having the sidebar stack on top of the main content.

