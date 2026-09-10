# Grade 11 Learning System Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Meridian JEE Atlas into a guided Grade 11 learning system with clearer explanations, richer diagrams, inquiry-based labs, and Chemistry simulations while preserving the existing content bank.

**Architecture:** Keep the current TanStack Start routes and content types. Add a small learning-guide data layer and reusable React components for the guided theory route, diagram reader, and lab inquiry shell. Existing physics and mathematics lab implementations remain local and deterministic; they are upgraded by the shared shell. Chemistry gets a separate set of local visual labs that uses the same shell.

**Tech Stack:** React 19, TanStack Start/Router, TypeScript, Tailwind v4 CSS tokens, existing KaTeX renderer, SVG for exact instructional diagrams, local component state and existing progress store.

**Spec:** `docs/learning-system-upgrade-spec.md`

## Global Constraints

- Preserve `src/lib`, `public/__grok`, `server`, and PWA/preview contracts.
- Do not add auth, database, external API calls, or runtime filesystem writes.
- Keep all simulations deterministic and based on explicit formulas.
- Use the existing dark Meridian visual system; do not introduce a second palette or arbitrary JSX hex values.
- Keep every primary control touch-safe and usable at approximately 390 px wide.
- Use exact CBSE chapter ordering and keep JEE extensions visibly downstream of the foundation.

---

### Task 1: Add Grade 11 learning-guide data and subject lenses

**Files:**
- Create: `src/data/learning/grade11.ts`
- Create: `src/data/learning/index.ts`
- Modify: `src/data/types.ts`
- Test: `src/data/learning/grade11.test.ts`

**Interfaces:**
- `Grade11Guide` contains `bigIdea`, `bridge`, `sequence`, `representation`, `labMission`, `checkpoint`, and `commonMistake`.
- `guideFor(meta: ChapterMeta): Grade11Guide` returns an explicit override for Grade 11 core chapters and a subject-aware fallback for any catalog chapter.

- [x] Define the guide type and subject-specific representation labels.
- [x] Add overrides for Physics XI, core Chemistry XI, and Mathematics XI ids in the catalog.
- [x] Add a fallback that uses `ChapterMeta` without making unsupported content claims.
- [x] Test guide overrides and the subject-aware fallback.

### Task 2: Build the guided theory route

**Files:**
- Create: `src/components/learning-guide.tsx`
- Modify: `src/routes/academy/chapter.$id.tsx`
- Modify: `src/styles.css`

**Interfaces:**
- `ChapterGuide({ meta, content, guide, heroFig, official })` renders the default guided view and a collapsed full-notes reference view.
- `GuidedBlock` renders one `TheoryBlock` with previous/next navigation, progress, optional diagram, bullets, callout, and retrieval prompt.

- [x] Add the orientation header, four-stage route, and subject lens panel.
- [x] Add a chapter map with clickable concept steps.
- [x] Render one concept block at a time by default and let the learner switch to outline/full notes.
- [x] Add an end-of-route retrieval checkpoint using the chapter’s existing quiz items.
- [x] Replace the current theory tab body with `ChapterGuide` while preserving all existing tabs and data.
- [x] Verify that chapters without `classNotes` still produce a usable guided route from `theory` or fallback content.

### Task 3: Upgrade the diagram reader

**Files:**
- Modify: `src/components/diagrams.tsx`
- Create: `src/data/learning/diagram-guides.ts`

**Interfaces:**
- `Figure` keeps its existing `{ id, caption? }` contract and adds local `read`, `redraw`, and `focus` states.
- `diagramGuide(id, caption)` returns `lookFor`, `drawPrompt`, and optional `legend` text.

- [x] Add a figure header and a compact legend for ink, accent, and dashed construction lines.
- [x] Add a readable “look for” explanation and “redraw from memory” prompt.
- [x] Add a focus mode that enlarges the figure without changing the underlying SVG geometry.
- [x] Add keyboard-accessible controls and avoid decorative animation.

### Task 4: Add the guided-inquiry lab shell

**Files:**
- Create: `src/components/lab-guidance.tsx`
- Modify: `src/components/labs.tsx`
- Modify: `src/components/labs-more.tsx`

**Interfaces:**
- `LabProvider({ chapterId, children })` supplies chapter context.
- `LabGuidance({ title, lead })` renders prediction, exploration mission, explanation, observation note, and transfer checkpoint.
- `LabSurface`, `LabSvg`, `LabSlider`, and `LabReadout` are reusable for new labs.

- [x] Add explicit guide data for the Grade 11 physics and mathematics lab map.
- [x] Wrap `ChapterLab` in `LabProvider`.
- [x] Make existing `Shell` implementations include `LabGuidance` without rewriting every simulation.
- [x] Preserve existing formulas/readouts and make the new shell keyboard/touch-safe.
- [x] Add a local note field and a transfer question with feedback.

### Task 5: Add Chemistry Grade 11 virtual labs

**Files:**
- Create: `src/components/chemistry-labs.tsx`
- Modify: `src/components/labs.tsx`

**Interfaces:**
- `ChemistryLab({ chapterId })` returns a deterministic lab for core Chemistry XI ids or `null`.
- Labs include molecule/particle counts, periodic-trend graph, VSEPR geometry, thermochemical energy profile, equilibrium shift, redox bookkeeping, and hydrocarbon builder.

- [x] Implement shared local controls and explanatory readouts using SVG/HTML, not raster art.
- [x] Map the core Chemistry XI catalog ids to labs.
- [x] Make particle-level and symbolic representations update together where applicable.
- [x] Provide safe text descriptions for each visual state.

### Task 6: Integrate, verify, and package

**Files:**
- Modify: `startup.sh` only if the extracted project’s start contract needs synchronization.
- Modify: `src/routeTree.gen.ts` only if route generation requires it; otherwise leave unchanged.
- Create: `screenshots/grade11-guide.png`, `screenshots/grade11-guide-mobile.png`, `screenshots/grade11-chem-lab.png`, and QA JSON outputs.

- [x] Run `npm run typecheck`.
- [x] Run `npm run build`.
- [x] Run local server-rendered smoke checks for Physics, Chemistry, and Mathematics chapter routes.
- [ ] Run cloud-browser desktop/mobile interaction checks; the browser blocks loopback preview URLs in this environment.
- [x] Serve the production build and rerun server-rendered smoke checks against the built output.
- [ ] Inspect the screenshots visually and fix clipping, low contrast, overflow, and broken state changes.
- [x] Package the finished source as an updated workspace archive and preserve the original archive unchanged.
