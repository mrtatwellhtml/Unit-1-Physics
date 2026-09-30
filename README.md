# CAPE Vectors — interactive workbook

An interactive website that goes with *CAPE® Physics Unit 1 — Topic Workbook 1: Vectors*. Students learn the notation, study each concept, and practise with questions that are marked instantly and have full worked solutions. Every question gets new numbers each time.

## What's inside

| Page | What it does |
|---|---|
| **Notation** | How to read, say and hand-write every symbol: bold vs arrow vs underline, \|a\|, AB-arrow, î ĵ k̂, a-hat, column vectors, dot and cross, v<sub>AB</sub>, Δ, Σ, bearings vs angles from +x, units like m s⁻¹, Greek letters, and exam vocabulary. Ends with a notation quiz. |
| **Lessons V1–V16** | One lesson for each workbook section, with *What you need*, worked examples, diagrams, the *Examiner's trap* boxes, and the CAPE syllabus reference. V11, V12 and V16 are marked **Beyond CAPE**. |
| **Practice** | 79 question types across the 16 sections, labelled L1 (Foundation), L2 (CAPE standard) or L3 (College). Answers are auto-marked; students can type fractions, `sqrt(…)` or `1.6e-19`. |
| **Mixed test** | 10 random questions from across the topic, one attempt each, with a summary that points to the sections to revise. |
| **MCQ bank** | The 30 M2 Paper 01-style items, each with an explanation of why the wrong options are wrong. |
| **Playground** | Drag two vectors to see the sum, difference, components, projection, dot product and cross product change live. |
| **Formula sheet** and **Checklist** | Every key result on one page, and the workbook's self-assessment checklist (ticks are saved in the student's browser). |

Progress and checklist ticks are saved in each student's own browser (`localStorage`). There are no accounts and no server.

## Running it

It is a static site with no build step. Open `index.html` through any web server, for example:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

KaTeX (for the maths) is included in `vendor/katex`, so the site works offline and on school networks that block CDNs.

### Publishing with GitHub Pages

In the repository go to **Settings → Pages**. Under "Build and deployment", choose **Deploy from a branch**, pick the branch and `/ (root)`, and save. The site will then be live at `https://<username>.github.io/<repo>/`.

## Project layout

```
index.html          page shell and navigation
css/style.css       styles (light and dark themes, mobile layout)
js/util.js          maths, number formatting, answer parsing/checking, SVG diagrams
js/lessons.js       notation guide, lessons V1–V16, formula sheet, checklist
js/generators.js    random question generators with worked solutions
js/mcq.js           M2 multiple-choice bank
js/app.js           routing, practice/test/MCQ/playground pages
vendor/katex/       KaTeX 0.16.11 (MIT licence)
```

To add a question type, add an object `{ name, level, fn }` to the right section's array in `js/generators.js`. `fn()` returns `{ q, fields, steps, svg? }`. A numeric field looks like `{ label, ans, unit, angle? }`; a multiple-choice field looks like `{ label, options, ans }`.
