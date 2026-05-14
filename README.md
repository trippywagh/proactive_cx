# super.money — Prototype

Frontend prototype demonstrating customer-experience flows for **failed** and **pending** transaction states on super.money.

## Run locally

```bash
npm install
npm run dev
```

Open the printed URL (usually http://localhost:5173).

## Structure

- `src/App.jsx` — top navigation bar + screen switcher
- `src/components/IPhoneMock.jsx` — the iPhone 17 device frame
- `src/screens/` — one file per screen (e.g. `Home.jsx`, `Failed.jsx`, `Pending.jsx`)

Add a new screen by:
1. Creating a new file in `src/screens/`
2. Adding it to the `SCREENS` array in `src/App.jsx`

## Deploy

This project builds to plain static files (`npm run build` → `dist/`). Configured for GitHub Pages.
