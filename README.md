Quick start

- Install deps (frontend):

  ```bash
  npm install
  ```

- Start frontend (dev):

  ```bash
  npm run dev
  ```

- Start backend (Flask):

  ```bash
  python app.py


Project layout

- `src/` — React source
  - `components/` — UI components and pages (Dashboard, LoginPage, etc.)
  - `pages/` — page-level components (legacy pages may be moved to `pages/legacy`)
- `public/` — static assets
- `app.py` — Flask backend (serves API and static build)
- `package.json` — frontend scripts and deps


