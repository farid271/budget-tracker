# Budget Tracker

A simple personal finance web app for tracking income and expenses, built with React and tested with Playwright.

## Live Demo

https://budget-tracker-pied-seven.vercel.app/

## Features

- Add income and expense transactions
- Live balance, total income, and total expense calculations
- Delete transactions
- Input validation with error messages

## Tech Stack

- **React** (Vite) — frontend UI
- **Playwright** — end-to-end automated testing

## Running the App
```bash
npm install
npm run dev
```

Open http://localhost:5173 in your browser.

## Running the Tests

Make sure the dev server is running first, then in a separate terminal:
```bash
npx playwright test
```

9 tests covering:
- Balance calculations
- Adding income and expense transactions
- Deleting transactions
- Input validation and edge cases

## What I Learned

- Building a React app with hooks and state management
- Writing end-to-end tests with Playwright
- Thinking about edge cases and how software breaks
- Structuring a project for readability and testability


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
