# ThreadHive Frontend — Agent Guide

## Project Overview

ThreadHive is a React + Vite single-page application focused on user authentication flows (login, register, and password reset). This file provides guidance for AI agents working on this codebase.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| React 19 | UI framework (functional components + hooks) |
| Vite 6 | Dev server and build tool |
| Vitest 3 | Test runner |
| React Testing Library | Component testing |
| @testing-library/user-event | Simulating user interactions in tests |
| jsdom | DOM environment for tests |
| ESLint | Linting |

---

## Project Structure

```
src/
  App.jsx                     # Root component — manages page navigation via useState
  App.css                     # Root-level styles
  main.jsx                    # React DOM entry point
  assets/                     # Static assets (images, icons)
  components/
    Header/
      Header.jsx              # App header; receives onNavigate prop
      Header.css
    Footer/
      Footer.jsx              # App footer
      Footer.css
  pages/
    Auth/
      Auth.css                # Shared styles for all auth pages
      <Login.jsx>               # Controlled login form (email, password)
      <Register.jsx>            # Controlled register form (name, email, password)
      <ResetPassword.jsx>       # Reset password form
tests/
  setup.js                    # Imports @testing-library/jest-dom matchers
  auth.test.jsx               # Unit tests for Login and Register components
```

---

## UI Layout & Page Structure

### App Shell
The overall page is wrapped in a `.app-layout` div defined in `App.css`. It stacks three regions vertically:

```
┌──────────────────────────────┐
│           <Header />         │  ← always visible; contains nav links
├──────────────────────────────┤
│      <CurrentPage />         │  ← swapped via currentPage state
├──────────────────────────────┤
│           <Footer />         │  ← always visible
└──────────────────────────────┘
```

### Auth Page Layout
All auth pages (`Login`, `Register`, `ResetPassword`) share the same two-layer structure from `Auth.css`:

```
.auth-container   ← full-width flex row, centers content horizontally
  └── .auth-box   ← white card, max-width 400px, border + shadow
        ├── h2    ← page title (e.g. "Login", "Register")
        ├── form  ← controlled inputs stacked vertically
        └── ...   ← optional error / success messages below the form
```

### Planned Login Split-Screen Layout
The Login page will be updated to a two-column layout:

```
.login-container
  ├── .login-form-side    ← left column: form fields
  └── .login-image-side   ← right column: placeholder image from src/assets/
```

Styles must remain plain CSS in `Auth.css` — no CSS Modules.

---

## Resources

The top-level `resources/` directory contains reference material for agents and developers:

| File | Description |
|---|---|
| `resources/prompts.md` | The original feature prompts used to drive development (ResetPassword component, Login layout update, unit test completion). Treat this as the **source of truth** for planned features. |
| `resources/login-screenshot.png` | A screenshot of the target Login page design. Used as a visual reference when implementing the split-screen Login layout (left: form, right: image). |

---

## Key Conventions

### Navigation
- Page routing is handled via a `currentPage` state variable in `App.jsx` (no router library).
- `App.jsx` passes `setCurrentPage` as `onNavigate` to `<Header />`.
- To add a new page, add a new state value and a conditional render branch in `App.jsx`.

### Forms
- All forms are **controlled components** using `useState`.
- Form fields use `name` attributes matching the state keys.
- `handleChange` uses `e.target.name` to update state generically.

### Styling
- Global/shared auth styles live in `src/pages/Auth/Auth.css`.
- Component-level styles live alongside the component file.
- CSS classes follow a flat BEM-lite naming convention (e.g., `.auth-container`, `.auth-box`).

### Callbacks / Props
- Pages that perform actions (e.g., submit) should accept callback props (e.g., `onLogin`, `onResetPassword`) so `App.jsx` can respond to user actions.

---

## Running the Project

### `npm install`
Installs all project dependencies listed in `package.json` into `node_modules/`. Run this once after cloning the repo or whenever `package.json` changes.

```bash
npm install
```

### `npm run dev`
Starts the Vite development server with hot module replacement (HMR). The app is available at **http://localhost:5173** by default. Changes to source files are reflected instantly in the browser without a full reload.

```bash
npm run dev
```

### `npm run build`
Compiles and bundles the app for production into the `dist/` directory. Runs Vite's build pipeline — transpiles JSX, tree-shakes unused code, and outputs optimised static assets.

```bash
npm run build
```

### `npm run preview`
Serves the production build locally (from `dist/`) for final verification before deploying. The app runs at **http://localhost:4173** by default. Always run `npm run build` first.

```bash
npm run build && npm run preview
```

### `npm run lint`
Runs ESLint across all source files using the config in `eslint.config.js`. Reports warnings and errors for code quality issues. Fix reported issues before committing.

```bash
npm run lint
```

---

## Running Tests

### `npm test`
Runs all test files once using Vitest (`vitest run`). Exits with a non-zero code if any test fails. Use this in CI or before committing.

```bash
npm test
```

### Run a specific test file
Pass the file path directly to Vitest to run only that file:

```bash
npx vitest run tests/auth.test.jsx
```

### Watch mode (re-runs on file save)
Useful during development — Vitest watches for changes and re-runs affected tests automatically:

```bash
npx vitest
```

### Test configuration
| Setting | Value |
|---|---|
| Test runner | Vitest 3 |
| DOM environment | jsdom |
| Setup file | `tests/setup.js` |
| Global APIs | enabled (`globals: true` in `vite.config.js`) |
| Test directory | `tests/` |

### Test Conventions
- All tests live in the top-level `tests/` directory.
- Use `@testing-library/react` for rendering components.
- Use `@testing-library/user-event` for simulating user interactions.
- Use `vi.spyOn` for spying on `console.log` or callbacks.
- Query elements with accessible queries: `getByLabelText`, `getByRole`, `getByPlaceholderText`.

---

## Planned Features (from `resources/prompts.md`)

1. **ResetPassword component** (`src/pages/Auth/ResetPassword.jsx`)
   - Controlled form: email, old password, new password, confirm password
   - Accept `onResetPassword` callback prop
   - Validate that `newPassword === confirmPassword` before calling callback
   - Show inline error message if validation fails
   - Show success message using conditional rendering after reset

2. **Login page layout update**
   - Split-screen layout: placeholder image on the right, form on the left
   - Place a placeholder image in `src/assets/`
   - Use existing CSS approach (no CSS Modules — plain CSS with class names)
   - Move labels inside inputs as placeholders, retaining font styling

3. **Complete Login unit tests** in `tests/auth.test.jsx`
   - Render Login and verify form fields are present
   - Spy on `console.log`, simulate input + submit, verify logged values

---

## Component Reference

### `<Header onNavigate={fn} />`
- Located at `src/components/Header/Header.jsx`
- Accepts `onNavigate` prop (passed as `setCurrentPage` from `App.jsx`)
- Contains a hardcoded `isAuthenticated = false` flag — **do not replace this with real auth logic** unless explicitly asked
- Renders **Register** and **Login** nav buttons when unauthenticated; a **Logout** button when authenticated
- Nav buttons call `onNavigate('register')` / `onNavigate('login')` to switch pages

### `<Footer />`
- Located at `src/components/Footer/Footer.jsx`
- Stateless; renders copyright text with the current year (`new Date().getFullYear()`)
- No props required

### `<Login />`
- Located at `src/pages/Auth/Login.jsx`
- Controlled form with `email` and `password` state (individual `useState` calls, not a combined object)
- Has proper `<label htmlFor>` + `<input id>` pairs — use `getByLabelText` in tests
- On submit: logs `email` and `password` to `console.log` and calls `alert("Login successful!")`

### `<Register />`
- Located at `src/pages/Auth/Register.jsx`
- Controlled form with a combined `form` state object: `{ name, email, password }`
- Uses `handleChange` with `e.target.name` for generic field updates
- Has proper `<label htmlFor>` + `<input id>` pairs (required for accessible test queries)
- On submit: logs `'Register Attempt:'` + form object, then resets form to empty strings

### `<ResetPassword onResetPassword={fn} />`
- Located at [src/pages/Auth/ResetPassword.jsx](src/pages/Auth/ResetPassword.jsx)
- Controlled form with combined state: `{ email, oldPassword, newPassword, confirmPassword }`
- Validates that `newPassword === confirmPassword` on submit
- Shows an inline error message if mismatching; shows a success message view upon success

---

## Known Pitfalls

- **Login vs Register state shape differ** — `Login` uses two separate `useState` variables (`email`, `password`), while `Register` uses a single `useState` object (`form`). Don't mix the two patterns when editing either component.
- **`isAuthenticated` in Header is hardcoded** — it is a placeholder. Do not wire it to any real state unless asked.
- **No router** — there is no `<BrowserRouter>` or any routing library. Adding one will break the app. Navigation is done purely via `currentPage` state in `App.jsx`.
- **No CSS Modules** — all style files use globally-scoped plain CSS class names. Do not rename files to `.module.css` or use the `styles.className` import pattern.
- **New pages must be wired up manually** — creating a new `.jsx` page file is not enough. You must also add the state value to `App.jsx`, add a conditional render branch, and add a nav button in `Header.jsx`.
- **`tests/setup.js` must not be removed** — it imports `@testing-library/jest-dom` which provides custom matchers like `toBeInTheDocument()`. Removing it breaks all tests.

---

## Important Notes for Agents

- Do **not** introduce a router (e.g., React Router) unless explicitly requested. Navigation is intentionally managed with `useState` in `App.jsx`.
- Do **not** use CSS Modules. All styles use plain CSS with globally-scoped class names.
- Keep new page components inside `src/pages/<Section>/` and new shared components inside `src/components/<ComponentName>/`.
- Keep all tests inside the top-level `tests/` directory.
- After adding a new page, wire it up in `App.jsx` (state value + conditional render + Header navigation).
