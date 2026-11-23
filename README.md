# CSI205TC Portfolio — GitHub Pages deployment

Static personal portfolio built for **CSI205TC Networking and Distributed Computing** (Question 2).

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Semantic single-page portfolio (about, skills, projects, education, contact) |
| `style.css` | Design tokens, layout, components and responsive breakpoints |
| `script.js` | Theme switch with `localStorage`, mobile nav, scroll reveal, typing effect |

## Features

- Fully responsive (desktop, tablet, mobile) with a collapsible navigation menu
- Dark / light theme that respects `prefers-color-scheme` and remembers the user choice
- Accessibility: skip link, visible focus styles, ARIA attributes, `prefers-reduced-motion` support
- No frameworks, no external requests, no trackers — one HTML file plus two static assets
- Deployed with GitHub Pages from the `main` branch (root folder)
