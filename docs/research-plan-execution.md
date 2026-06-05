# Rapyder Cloud Quest - Research, Plan, and Execution Notes

Date: 2026-06-05

## 1. Project Goal

Build a full-fledged browser game, not a single-file prototype, for a Rapyder-themed storytelling experience.

The game should:

- Use a 3-level structure.
- Keep the AI pet companion idea.
- Feel like an original 8-bit platform adventure inspired by classic NES-era side-scrollers and island adventure games.
- Reflect the themes of Rapyder, CloudEVA, and OneLenz.
- Include a research-backed story foundation around Amit Gupta, CEO of Rapyder Cloud Solutions, without copying protected characters, maps, names, or sprites from existing games.

## 2. Research Sources

Primary and public sources used:

- Rapyder website: https://www.rapyder.com/
- Rapyder team page: https://www.rapyder.com/our-team/
- Rapyder Cloud Management page: https://www.rapyder.com/services/cloud-management/
- CloudEVA website: https://cloudeva.ai/
- OneLenz website: https://onelenz.ai/
- CIO Axis profile: https://www.cioaxis.com/ceo-amit-gupta-rapyder-cloud-solutions/
- The Org public profile: https://theorg.com/org/rapyder-cloud-solutions/org-chart/amit-gupta
- Business Standard company profile: https://www.business-standard.com/companies/rapyder-cloud-solutions-private-limited-756631/information/company-history

Research date: 2026-06-05.

## 3. Amit Gupta Research Summary

### Confirmed Public Facts

Amit Gupta is publicly listed as the Founder and CEO of Rapyder Cloud Solutions.

The Rapyder team page describes him as the Founder and CEO, and states that he brings over 25 years of experience in IT infrastructure, cloud computing, and entrepreneurship.

The Rapyder team page also notes that he co-founded Intelligentia IT Systems in 1998 and served more than 4,000 customers across India and the United States.

Public profile sources such as The Org also identify him as Founder and CEO of Rapyder Cloud Solutions.

Business Standard company records list Rapyder Cloud Solutions Private Limited as incorporated in 2017.

### Strategic Pattern From Research

The public story around Amit Gupta and Rapyder points to a founder-led cloud company built around:

- enterprise cloud transformation
- customer-first cloud adoption
- migration and modernization
- cloud operations and managed services
- practical business outcomes rather than cloud for its own sake

This is interpreted in the game as a founder signal: infrastructure experience leads to customer-first cloud transformation, then to decision intelligence and business signal intelligence. The game does not attempt to recreate Amit Gupta as a visual likeness or simulate his personality. He appears as a neutral founder-mentor checkpoint based on public themes.

## 4. Website Theme Research

### Rapyder

Rapyder presents itself as a cloud services and solutions company focused on cloud adoption, modernization, managed services, migration, and enterprise outcomes.

Relevant game translation:

- Level 1 is about cloud migration and managed-service readiness.
- Collectibles are workload and operations signals.
- Hazards represent outages, noise, and unmanaged migration risk.
- The level goal is an AWS-style gate, represented generically as a cloud destination.

### CloudEVA

CloudEVA presents itself around cloud decision intelligence and AI-driven cloud management. The site emphasizes decision-making, AI agents, cloud governance, and explainable action.

Relevant game translation:

- Level 2 is about decision loops, explainability, and governance.
- Collectibles include who, why, risk, decision, audit, and action.
- Hazards represent ungoverned AI or cloud changes.
- The level goal is a decision engine gate.

### OneLenz

OneLenz presents itself as a revenue intelligence and signal platform connecting sources such as email, CRM, meetings, and business communication.

Relevant game translation:

- Level 3 is about scattered revenue signals.
- Collectibles include mail, CRM, meetings, deals, sync, and next action.
- Hazards represent signal leakage and disconnected workflows.
- The level goal is a unified one-lens tower.

## 5. Game Concept

Working title: Rapyder Cloud Quest.

Player character: Maya, a Rapyder cloud guide.

AI pet: EVA, a CloudEVA mascot companion that follows the player and translates messy signals into level objectives.

Story premise:

Maya and EVA move across three worlds. Each world represents one chapter of a public founder-led business arc:

1. Rapyder Ridge: Amit's infrastructure experience becomes a customer-ready cloud foundation.
2. Decision Loop Lagoon: the cloud foundation evolves into CloudEVA-style governance and explainable action.
3. Revenue Signal Ruins: customer and commercial activity connect through OneLenz-style signal intelligence.

The story frame is intentionally simple: collect the founder signals, avoid the risks, talk to mentor/NPC checkpoints, and reach the goal gate.

## 6. Level Design

### Level 1: Rapyder Ridge

Theme:

- Bright cloud transformation world.
- Red Rapyder accent.
- Brick platforms, cloud ledges, cloud operations path.

Collectibles:

- INFRA
- CUST
- CLOUD
- AWS
- SCALE
- TRUST

Hazards:

- outage sparks
- operational noise
- unmanaged migration risk

NPC:

- Amit founder-mentor text prompt about infrastructure reality and customer value.

Completion meaning:

The customer team moves from scattered workloads to a clear cloud migration route.

### Level 2: Decision Loop Lagoon

Theme:

- Darker AI/cloud governance world.
- Cyan and teal decision-system palette.
- Platforms represent decision records and audit trails.

Collectibles:

- OWNER
- WHY
- RISK
- AUDIT
- EVA
- ACT

Hazards:

- ungoverned bots
- unclear decision paths
- silent automation risk

NPC:

- Amit founder-mentor checkpoint about decision quality.
- EVA decision companion.

Completion meaning:

Every important cloud change has context, ownership, and an outcome check.

### Level 3: Revenue Signal Ruins

Theme:

- Warm commercial signal world.
- CRM, email, meeting, and deal clues represented as pixel artifacts.
- A unified tower endpoint.

Collectibles:

- MAIL
- CRM
- MEET
- DEAL
- SIGNAL
- LENZ

Hazards:

- signal leaks
- scattered context
- disconnected deal actions

NPC:

- Amit founder-mentor checkpoint about business signals becoming action.
- Buyer signal prompt.

Completion meaning:

The team turns disconnected sales activity into a coherent deal signal path.

## 7. Gameplay Systems

Implemented systems:

- Canvas rendering.
- Side-scrolling camera.
- Keyboard controls.
- Mobile pointer controls.
- Player movement and jumping.
- Gravity and platform collisions.
- Collectibles.
- Hazards and lives.
- Level goals locked until all signals are collected.
- AI pet follow behavior.
- NPC talk prompts.
- Story modals between missions.
- HUD for level, signals, trust, and lives.

Controls:

- Left: ArrowLeft or A.
- Right: ArrowRight or D.
- Jump: ArrowUp, W, or Space.
- Talk: E or Enter.
- Mobile: visible Left, Right, Jump, Talk buttons.

## 8. Visual Direction

The requested inspiration was a mix of classic NES platformer and island adventure energy.

Implementation guardrail:

The game uses original pixel-style blocks, clouds, coin-like signals, hazard shapes, palm/pipe silhouettes, and character forms. It does not use protected names, characters, maps, sprites, logos, music, or exact mechanics from Super Mario, Adventure Island, Nintendo, or Hudson.

Rapyder visual cues:

- red primary accent
- cloud paths
- signal collectibles
- business transformation gates
- enterprise cloud vocabulary

## 9. File Structure

```text
projects/rapyder-cloud-quest-game/
  index.html
  src/
    styles.css
    story.js
    levels.js
    game.js
    main.js
  docs/
    research-plan-execution.md
  README.md
  .nojekyll
```

Purpose of each file:

- `index.html`: app shell, canvas, HUD, story modal, mobile controls.
- `src/styles.css`: responsive app UI and pixel-game presentation.
- `src/story.js`: story data, level briefs, ending text, founder-mentor framing.
- `src/levels.js`: platform layouts, collectibles, hazards, NPCs, visual themes.
- `src/game.js`: game engine, physics, collisions, rendering, scoring, level progression.
- `src/main.js`: DOM wiring, input binding, story modal actions.
- `README.md`: local run and GitHub Pages deployment instructions.
- `.nojekyll`: tells GitHub Pages to serve the static files as-is.

## 10. Execution Log

Completed:

- Created new multi-file game project.
- Replaced the earlier single-page prototype with a proper modular browser game.
- Implemented 3 levels with unique visual themes and business meanings.
- Added AI pet follow behavior.
- Replaced the placeholder blue pet with the CloudEVA mascot files from `mascot/`.
- Added research-backed story framing.
- Reworked the narrative into a founder-led Amit Gupta arc: infrastructure experience, Rapyder cloud foundation, CloudEVA decision intelligence, and OneLenz business signal intelligence.
- Replaced generic collectibles with founder/story signals across all three levels.
- Added Amit mentor checkpoints in all three levels.
- Added mobile controls.
- Added detailed Markdown documentation.
- Added high-DPI canvas rendering to improve text sharpness.
- Reworked UI typography from low-resolution pixel text to sharper system text while keeping the retro game composition.
- Added textured canvas surfaces through layered gradients, highlights, platform marks, and subtle scan structure.
- Added level-specific main character sprites from `src/hero/`:
  - Level 1 uses `Rapyder_Run.png` and `Rapyder_Jump.png`.
  - Level 2 uses `Cloudeva_Run.png` and `CloudEva_Jump.png`.
  - Level 3 uses `OneLenz_Run.png` and `OneLenz_Jump.png`.
- Cleaned the OneLenz hero PNG backgrounds with `tools/clean_onelenz_background.py`.
- Preserved the original OneLenz generated files under `src/hero/originals/`.
- Retuned the final approach in all three levels by moving the existing final platform closer to the goal, moving the last signal with it, and widening the goal trigger.
- Added launch polish for mobile and laptop use:
  - safe mobile viewport handling with `100svh` and safe-area padding
  - sticky mobile controls with larger tap targets
  - laptop short-height canvas constraints
  - touch-action handling to reduce accidental page gestures during play
  - first-level hero preload and lazy loading for later hero themes
  - modal mascot async decoding
- Prepared GitHub Pages deployment:
  - renamed OneLenz hero files to URL-safe filenames
  - added `.nojekyll`
  - added `README.md` with deployment notes

## 11. Verification Plan

Checks to run:

- JavaScript syntax checks for all JS files.
- ASCII scan for edited text.
- Browser smoke test by opening `index.html`.
- Manual gameplay path:
  - start story
  - move and jump
  - collect all signals
  - avoid hazards
  - talk to NPC
  - reach goal
  - progress through all three levels

Current limitation:

The game is a local browser game with no build system or external dependencies. This keeps it portable and avoids dependency installation, but advanced QA such as Playwright screenshots or Lighthouse was not added yet.

## 12. Future Upgrade Ideas

- Add sprite sheets for smoother animation.
- Add chiptune-style WebAudio sound effects.
- Add checkpoint flags.
- Add a level select screen.
- Add downloadable score summary.
- Add a proper Rapyder brand asset if an approved logo file is provided.
- Convert to React/Vite if deployment automation, routing, or component testing becomes necessary.
