# Contributing

## Getting Started

1. Fork the repo on GitHub
2. Clone your fork locally
   ```bash
   git clone https://github.com/<your-username>/anon-notepad.git
   cd anon-notepad
   ```
3. Install dependencies
   ```bash
   npm install
   ```
4. Copy the environment file and add your Neon database URL
   ```bash
   cp .env.example .env.local
   ```
5. Run the development server
   ```bash
   npm run dev
   ```

## Making Changes

1. Create a branch from `main`
   ```bash
   git checkout -b fix/your-change-description
   ```
2. Make your changes
3. Test manually in the browser
4. Commit with a clear message following the format:
   ```
   fix: short description of what was fixed
   feat: short description of what was added
   refactor: short description of what was cleaned up
   ```

## Submitting a Pull Request

1. Push your branch to your fork
   ```bash
   git push origin fix/your-change-description
   ```
2. Open a pull request to this repo's `main` branch on GitHub
3. Describe what you changed and why in the PR description
