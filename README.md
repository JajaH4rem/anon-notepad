# anon-notepad

An anonymous online notepad. Users can create, edit, save, and manage plain-text notes without registering an account. Notes are stored in PostgreSQL and associated with a browser-based anonymous identifier.

## Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL (Neon)
- **ORM:** Drizzle ORM
- **Hosting:** Vercel

## Core Features

- Create, rename, and delete notes
- Plain-text editing with undo and redo
- Explicit save with unsaved change indicators
- Multiple notes open in tabs
- Import and export plain-text files
- Anonymous access without registration
- Notes isolated per browser session

[Architecture](docs/architecture.md)
