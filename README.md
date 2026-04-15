# Murtuza Zabuawala Portfolio

This repository now contains a full custom portfolio website.

## Live Site Structure

- Home Hero with value proposition and impact metrics
- Career timeline with quantified bullets per role
- Featured projects grid with stack tags and outcomes
- Certifications grid with proof links per item
- Product management framework section
- One-page resume section with open/download/save-as-PDF actions
- LinkedIn profile integration across hero and contact sections
- Dark/light theme switch with persisted user preference
- Open source and contact sections

## Files

- `index.html` - site structure and content
- `styles.css` - custom visual direction and responsive design
- `script.js` - reveal animations, active navigation, theme preference, resume print action
- `resume-one-page.html` - printable and downloadable one-page resume

## Run Locally

Open `index.html` directly in your browser.

Or run a local static server from this folder:

```bash
python3 -m http.server 8080
```

Then visit:

http://localhost:8080

## Publish on GitHub Pages

1. Push this repository to GitHub.
2. Open repository Settings -> Pages.
3. Under Build and deployment, choose Deploy from a branch.
4. Select branch `main` and folder `/ (root)`.
5. Save and wait for deployment.

Your portfolio will be served from your GitHub Pages URL.
