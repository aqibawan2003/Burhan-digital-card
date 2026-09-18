# Wedding Invitation Cousin

A single-page React + Vite wedding invitation website with Tailwind CSS and Framer Motion. The design is built around a royal Indian/Pakistani wedding aesthetic with an animated invitation opening sequence, live countdown, event cards, gallery placeholders, RSVP UI, guest wishes, and share controls.

## Extracted invitation data

The following details were extracted from the provided PDF scan and mapped into `src/data/weddingData.js`:

- Groom: `Burhan Ud Din`
- Bride: placeholder only. The PDF shows `D/o Saeed Iqbal`, but the bride's first name is not visible in the scan.
- Mehndi Ceremony: `Friday, 16 October 2026`, `6:30 PM to 9:30 PM`, `Dua Events, 888-N Poonch Road, Samanabad, Lahore`
- Barat Ceremony: `Saturday, 17 October 2026`, `Sehra Bandi 5:00 PM`, `Departure of Barat 6:00 PM`, `H No-7 St-62, Sharif Park Multan Road, Lahore`
- Walima Ceremony: `Sunday, 18 October 2026`, `Reception 6:30 PM`, `Dinner 8:00 PM`, `Qasr-e-Saeed Marquee, 7 Wahdat Rd, Nizam Block Allama Iqbal Town, Lahore`
- Host family: `Mr & Mrs Muhammad Nadeem Anwar`
- Additional family contacts: preserved from the card in the story/info section

## Placeholders still to replace

These items were not available in the PDF and are intentionally marked in `src/data/weddingData.js` or `public/images`:

- Bride's first name
- Couple story / personal message
- Real couple portraits and gallery images
- Optional background music file
- Persistent RSVP / guest wish backend

## Stack

- React 19
- Vite 8
- Tailwind CSS 4
- Framer Motion
- Lucide React

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

## Important files

- `src/App.jsx`: page structure, card opening animation, forms, and interactions
- `src/data/weddingData.js`: extracted content and editable invitation data
- `src/components/CountdownTimer.jsx`: live countdown timer
- `src/components/Reveal.jsx`: scroll-triggered reveal animation wrapper
- `src/index.css`: palette, layout, and reusable styling utilities
- `public/images/`: local placeholder portraits and gallery artwork

## GitHub and Vercel

Local git initialization is safe to do in this environment. Creating the public GitHub repository still requires your GitHub account or authenticated CLI.

Suggested commands:

```bash
git init
git add .
git commit -m "Initial commit: Digital wedding invitation"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wedding-invitation-cousin.git
git push -u origin main
```

Then import the repository into Vercel and deploy as a standard Vite project.
