# AGENTS.md — Personal Portfolio Website

## Purpose
This repository is the source for a personal portfolio hosted at **https://mp766.github.io/** (repository: `MP766.github.io`). The site should present technical work clearly to recruiters, hiring managers, collaborators, and other developers. Projects span business applications and automation, IT systems/homelabs, software engineering, games, and experimental/learning work.

**Core goal:** Make it straightforward to browse projects and understand what was built, why it was built, the implementation choices, challenges, evidence (screenshots/video), and lessons learned. The owner will write polished narratives and supply real project media incrementally; support that workflow without requiring layout changes for each new project.

## Project context and known technology
- GitHub Pages **user site** (`<username>.github.io`), so Vite's `base` should ordinarily be `/`.
- Vite + React (JavaScript/JSX), React Router, Tailwind CSS, npm.
- Initial site was a single `index.html`; it has been migrated to a Vite/React application.
- On Windows, development has been run from `I:\Projects\Github\MP766.github.io`.
- Node 18 was incompatible with the installed Vite version. Node was upgraded to v25.7.0 and the local Vite dev server successfully started. For CI, choose a supported Node LTS version compatible with the installed Vite version.
- Tailwind v4 / `@tailwindcss/oxide` initially caused a missing-native-binding installation error. A clean reinstall resolved the immediate startup failure, and Tailwind was visually verified working. **Inspect the installed versions and configuration; do not assume Tailwind v3 or rewrite working configuration.**
- Repository deployment has used a GitHub Actions workflow publishing Vite's `dist` to the `gh-pages` branch (`peaceiris/actions-gh-pages` approach). **Inspect the actual workflow and GitHub Pages configuration before changing it.**

## Expected code organization (verify against repository)
```text
src/
  App.jsx                     # Site shell, navigation, footer, routes
  main.jsx                    # React entry point and CSS import
  index.css                   # Tailwind entry / site-wide styles
  components/
    ProjectCard.jsx           # Reusable project listing card
  pages/
    Home.jsx                  # Intro and featured projects
    Projects.jsx              # Project listing grid
    ProjectDetail.jsx         # Detail view selected by project ID
  data/
    projects.json             # Structured metadata for projects
public/
  images/projects/<project-id>/  # Project images/GIFs, when supplied
  videos/                       # Optional small locally hosted clips
.github/workflows/
  deploy.yml                  # Deployment workflow; verify filename
vite.config.js
package.json
```

Do not treat the tree as proof that every file/feature exists. Inspect the current working tree first, including `package.json`, `src/App.jsx`, page components, project data, `vite.config.js`, and workflows.

## Current implementation (as reported during setup)
- App layout with navigation and routes:
  - `/` — homepage
  - `/projects` — project catalog
  - `/projects/:id` — individual project detail
- Project metadata is read from `src/data/projects.json`.
- `ProjectCard` is reused in featured projects on Home and the Projects grid.
- Project details can render summary, category, technology tags, highlights, and optional external links (`github`, `demo`, `video`).
- Initial sample project records included a Unity slot-machine project and a Pokémon memory viewer. **These are draft portfolio entries, not verified project claims.** Verify actual content with the owner before publishing specifics.
- A `sections` array for richer project breakdowns was discussed and sample implementation provided, but **its integration was not confirmed**. Check the repository before calling it complete.
- Captioned media and YouTube embedding were proposed, but **implementation was not confirmed**.
- GitHub Pages deep-link refresh fallback (e.g. opening `/projects/some-id` directly) remains a known item to verify/fix.

## Project content model and future capability
Keep the portfolio **data-driven**. The base project entry is conceptually:
```json
{
  "id": "unique-project-slug",
  "title": "Project title",
  "category": "Category",
  "summary": "Short accurate summary",
  "tech": ["Technology"],
  "highlights": ["Verified highlight"],
  "links": { "github": "", "demo": "", "video": "" },
  "sections": []
}
```

Support rich, **optional, ordered** project sections so one project can tell a progression story without forcing every project to have the same layout. Proposed section shape:
```json
{
  "title": "Milestone or feature name",
  "body": ["Paragraph one", "Paragraph two"],
  "bullets": ["Technical detail"],
  "media": [
    {
      "type": "image",
      "src": "/images/projects/unique-project-slug/example.webp",
      "alt": "Specific description of the screenshot",
      "caption": "What the screenshot demonstrates"
    }
  ]
}
```

Desired future rendering behavior:
- A section can contain explanatory paragraphs, bullets, and zero or more associated screenshots or videos, displayed together in context.
- Sections appear in array order; they can depict implementation phases, milestones, architecture, troubleshooting, and outcomes.
- Empty/missing `sections` or `media` should render nothing, **not** an empty placeholder card or broken image.
- Avoid inventing text or adding hypothetical imagery. The owner will add factual copy and source files later.
- If rich prose becomes difficult to maintain in JSON, **propose** a Markdown/MDX content format before undertaking a migration. Do not unilaterally replace the data model.

## Media hosting conventions
- Prefer static screenshots and optimized animations in `public/images/projects/<project-id>/`.
- Vite copies `public/` assets to build output. For this user-site deployment, URLs such as `/images/projects/<project-id>/screenshot.webp` are appropriate with `base: '/'`.
- Use meaningful filenames and descriptive `alt` text; captions explain the technical significance instead of merely restating the picture.
- Prefer optimized WebP/PNG and small compressed assets. Avoid large binaries in the repo; host substantial video on a suitable external platform and embed/link to it when the owner provides the URL.
- Never commit secrets, private organization data, client records, or unauthorized workplace screenshots. Recommend anonymizing/redacting sensitive screenshots.

## Development principles
1. **Inspect before editing.** Read relevant source and verify current behavior; this file is a handoff, not a substitute for code inspection.
2. **Make incremental changes.** The owner prefers step-by-step implementation and testing; avoid large unrequested redesigns.
3. **Preserve working functionality.** Keep existing routes, Tailwind setup, project data, and GitHub Pages deployment intact unless a change is necessary.
4. **Use reusable components.** Project cards, media views, and section renderers should be separate components when doing so reduces duplication.
5. **Separate content from presentation.** A new project should primarily involve updating project data and adding actual media, not hand-coding a new page.
6. **Avoid unsupported claims.** Do not invent achievements, project metrics, technologies used, screenshots, live demos, source-code links, or employment details.
7. **Be accessible and responsive.** Semantic headings, alt text, keyboard navigation, readable contrast, and mobile layout matter.
8. **Keep it fast and maintainable.** Prefer lightweight libraries, lazy-load media, and avoid unnecessary dependencies.
9. **Do not insert fake contact information.** Replace placeholder addresses/URLs only after verification or owner input.
10. **Check deployment constraints.** GitHub Pages serves static files and does not automatically provide SPA history-route fallback.

## Known next steps (priority order)
1. **Audit current state:** check working tree, existing `sections` renderer, media components, routing, Tailwind version, build, and deployment workflow.
2. **Validate/add optional project sections:** support ordered heading, body paragraphs, bullets, and later media without showing empty sections.
3. **Build reusable media renderer when requested:** multiple captioned screenshots and optional embedded videos within a section; graceful handling of missing media.
4. **Fix/test GitHub Pages direct-link refresh:** direct visits to `/projects` and `/projects/:id` must work on the deployed site. Consider a well-tested Pages SPA 404 fallback, a routing strategy change, or static prerendering; explain tradeoffs before changing routing.
5. **Improve project content workflow:** convenient project additions, featured project selection, and eventual filtering/search when useful.
6. **Polish presentation:** project thumbnails, layout, responsive design, accessibility, metadata/social previews, and resume/contact links after core content capabilities work.

These are priorities, **not permission to implement everything in one pass**. Follow the owner's current request.

## Working and verification checklist
Before each change:
- Check `git status` and inspect relevant source files.
- Check `package.json` scripts and dependency versions.
- Determine whether the requested capability is already present.

After each change:
- Run `npm run build` and any available lint/test commands (for example `npm run lint` if defined).
- Run `npm run dev` for local UI verification where appropriate.
- Check Home, Projects, a valid project detail, and an unknown project ID.
- Where routing/deployment changed, verify direct navigation/refresh behavior on GitHub Pages, not only local development.
- Explain touched files, behavior changes, outstanding limitations, and an appropriate focused commit message.

## Communication preferences
- Give clear, practical explanations with file paths and small executable steps.
- The owner wants the **structure in place now** and will supply polished project narratives, progress writeups, and visuals later.
- Ask for evidence or clarifications when a specific project claim, screenshot, link, or design decision cannot be grounded, but proceed with safe scaffolding when feasible.
- Do not claim a feature is deployed, tested, or complete unless it has actually been verified.
