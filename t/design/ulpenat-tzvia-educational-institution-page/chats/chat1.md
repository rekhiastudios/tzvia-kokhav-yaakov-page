# Educational Institution Website

_Started 2026-05-17 08:36 UTC_

---

## User

Create a wireframe for a educational institucion page. Large video hero with a H1 and CTA bottom left. I want button/box that has a cta for watching the trailer and main cta to register for the new school year. The institution should be called "Ulpenat Tzviya Kokhav Ya'akov" The second section should be an "About Us". Then a news section for updates, carrousel design with  a link to read more. And then a "Activities & Academia" section, that begins with a full width frame that displays a video. It should display a small h3 title "Activities & 
Academic Areas" and a bigger h2  "Our academic areas blend knowledge, creativity, and real-world discovery.". Then a calendar section for institucional activities with a few examples in the future, when hovering over the date, it can display a small card with more details and images o videos about the event. Then a contact form section. Then a "developed by" section, full width video, the developer studio is called "Rekhia Studio", it should display the studio logo in the center, and below a "in colaboration with" h4 displaying a smaller version of the institution logo and the Israel's  Ministry of Education Logo. Finally a big full Footer with relevant links,

## Assistant

_[tool: fig_ls]_

_[tool: image_metadata]_

_[tool: image_metadata]_

_[tool: fig_ls]_

_[tool: read_file]_

_[tool: fig_read]_

_[tool: fig_ls]_

_[tool: fig_read]_

_[tool: update_todos]_

I have enough context. Let me build the wireframe with a sketchy/low-fi vibe. I'll copy the logos in and create the file.

_[tool: copy_files]_

_[tool: copy_starter_component]_

_[tool: write_file]_

_[tool: grep]_

_[tool: read_file]_

_[tool: grep]_

_[tool: str_replace_edit]_

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Built a single-page wireframe covering all 8 sections in a low-fi sketchy style (Caveat + Kalam + JetBrains Mono, paper background, b&w with restrained blue/gold accents to suggest the brand).

**What's in it**
- **Hero** — placeholder full-bleed video w/ play-symbol, H1, eyebrow + dual CTA bottom-left ("Register for 2026–27" primary + "Watch the trailer" with runtime/play glyph). Dashed annotation arrows label the H1 & primary CTA.
- **About Us** — pull-quote H3, lede + body lorem placeholders, 3 stat tiles, two stacked tilted photo placeholders.
- **News & Updates** — horizontal carousel (5 cards) with dots + arrow buttons; toggleable to 3-up grid.
- **Activities & Academia** — full-bleed video frame w/ H3 kicker + big H2 exactly as worded, then 4 area cards beneath.
- **Calendar** — month grid w/ 6 example events; hover any event date → sketchy hover card pops up w/ photo or ▶ video placeholder, title, when, description, link.
- **Contact** — left column copy + info rows, right column form (dashed underline inputs, send button w/ gold shadow).
- **Developed By** — full-bleed video, centered Rekhia Studio logo, "in collaboration with" Tzvia + Israel Ministry of Education logos.
- **Big footer** — brand block + 3 link columns + newsletter + socials + bottom credit row.

**Tweaks** (toolbar toggle): hero anchor (bottom-left / centered), CTA shape (side-by-side / stacked), news layout (carousel / grid), hero annotations on/off, "Strip color" for pure b&w mode, monochrome accents.

Next steps when you're ready to push further: pick a direction from the tweaks, drop real photos/video, and I can convert any section into a hi-fi mock against the figma source.

## User

Lets remake everything, with a more modern and technological style, it should feel like a tech institution

## Assistant

_[tool: update_todos]_

_[tool: write_file]_

Shifting direction — dark technical/blueprint wireframe with terminal-style readouts, mono labels, grid scaffolding, and a single restrained accent that nods to the school's amber. Keeping it a wireframe (placeholders, no real imagery) but the *visual language* now says "tech institution."

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Rebuilt as **v2** with a tech-institution feel. v1 is preserved alongside it.

**The vocabulary now is technical, not handwritten:**
- Dark blueprint canvas (#07090f) with a 48px structural grid that lives under everything
- Type pairing: **Sora** for display headers (geometric, optical-tightened), **Space Grotesk** for body, **JetBrains Mono** for everything quantitative — coordinates, IDs, timestamps, labels
- Single restrained accent — amber `#f4c46c` (a nod to the wheat in the school's mark) — with a cyan secondary for system/data signals
- Square corners, hairline borders, corner-tick framing on hero/devby (those tiny `⌐` brackets at each corner)

**Section-by-section, what changed:**
- **System bar** up top: status dot, schema, region, build time — frames the whole page as if it were a console
- **Hero** now has a crosshair-and-ring video target, animated REC dot, scanlines, telemetry readout (RES/FPS/aspect), and lat/lon/elevation metadata on the right. CTA pair sits bottom-left; the register button itself carries a mono subtitle
- **About** — number-driven stats panel with deltas vs. national average; 3-up image-placeholder grid with ID tags & dimensions
- **News** — cards with monospaced ANN/WIN/EVT/ALM/UPD tags + ISO dates; carousel has a thin progress fill
- **Academics** — full-bleed pulse-ring video frame, then a 4-column "AREA / 01–04" grid with monospace IDs
- **Calendar** — proper grid layout (not isolated cells), today-marker, color-coded event chips, hover expands into a full media-rich card with ID + dimensions
- **Contact** — split panel, the form is framed as `step 01 / 03 · personal details · TLS-encrypted`
- **Developed by** — Rekhia Studio centered in a bracketed frame, cyan scanlines, MoE + Tzvia collaborator badges below
- **Footer** — adds a system-ID block (`INST_ID`, `MoE_REF`, `ACCRED`), 4-col link grid with hover arrows, and a giant `U✦L✦P✦E✦N✦A✦T  TZVIA` wordmark row above the legal line

**Tweaks** (toolbar toggle): theme mode (dark/light), accent (amber / cyan / violet), CTA arrangement, hero annotations, news layout, density (compact/regular/loose).

Let me know which version (v1 or v2) you want to push to hi-fi, or which sections you'd like me to push further into the tech direction (e.g. animated calendar, parallax hero).

## User

Lets push to hi-fi now

## User

push v2 to hi-fi now

## Assistant

_[tool: update_todos]_

_[tool: write_file]_

Pushing v2 to hi-fi — bringing in real photography, refining the typography and micro-details, removing wireframe scaffolding while keeping the technical-institutional vocabulary that made v2 distinct.

_[tool: update_todos]_

_[tool: done]_

_[tool: fork_verifier_agent]_

Pushed v2 to **hi-fi** at `Ulpenat Tzvia.html`. Both wireframes (v1, v2) are preserved.

**What changed from v2 wireframe → hi-fi:**

- **Real photography throughout** — atmospheric library hero, campus + bet midrash + lab in About, 5 unique news thumbnails, lab-close-up in the Activities video frame, 6 distinct event photos in calendar hover cards, abstract terrain map in Contact, circuit/tech imagery behind Developed By. All darkened/contrast-graded to fit the palette.
- **Hero refined** — Ken Burns slow zoom on the bg, triple-ring video target with an orbiting accent dot, more sophisticated telemetry readout (RES / FPS / CHAPTER / CAPTION), the CTA shows "12 places remaining" urgency. Sticky blurred nav.
- **About** — italic-accent headers ("built on *Torah*, scaled by *science*"), real institutional copy + accent-bar pull-quote from the head of school, stats with up/down deltas and unit suffixes.
- **News cards** — image hover zoom, border-color hover, arrow translates on hover.
- **Academic** — 4 area cards with bottom-border slide-in animation on hover, icon background lights up.
- **Calendar** — hover cards now use real event photos with a glassy play button for video events; today-marker animates.
- **Contact** — map tile with a pulsing pin and lat/lon overlay; "Avg. response time · 1.4 business days" trust signal; TLS badge stays.
- **Developed By** — Rekhia badge in a corner-bracketed frame, cyan secondary scanlines, dark hue-shifted bg.
- **Footer** — system-ID block uses key/value rows now; link list items shift right + arrow appears on hover; the giant `U✦L✦P✦E✦N✦A✦T  TZVIA` lockup remains as a brand stamp.

**Tweaks panel** still exposes mode (dark/light), accent (amber / cyan / violet), CTA layout, news layout, and density.

Verifier is running screenshots in the background — I'll loop back if it flags anything.

## User

Verifier agent check completed

