# Vocal Contracts

A local-first vocal artist contract builder built with React and Vite.

## Current workflow

- Create a vocal artist agreement from structured form fields.
- Live contract preview updates from the same contract data.
- Drafts automatically persist in browser IndexedDB.
- Reopen, edit, search, finalize, and delete contracts.
- Print the contract or use the browser's **Save as PDF** option.
- Open a pre-filled Gmail compose window with the client email, subject, and message.
- Keep the sample contract template isolated in `src/template.js` so the real legal agreement can replace it later.

## Important storage note

Drafts are local to the browser/device and origin. They are not synced between computers and are not a cloud backup. IndexedDB is used because it supports structured client-side data and persistent browser storage.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Replacing the sample agreement

The contract renderer lives in `src/template.js`. Replace `renderContract()` and the sample terms as needed while keeping the structured `contract` data model. This preserves the form, local draft system, print workflow, and Gmail workflow when the actual contract language is introduced.
