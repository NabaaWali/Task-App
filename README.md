# Task App
A simple, fast task manager built with Next.js. Create tasks with due dates and priority levels, track them across All / Active / Completed views, and manage everything with a clean, responsive UI that supports dark mode.

## Features

- **Create tasks** with a name, due date, and priority level (High, Medium, Low)
- **Filter views** — switch between **All**, **Active**, and **Completed** tasks
- **Search** to quickly find a specific task
- **Mark complete** with a single checkbox click
- **Countdown display** showing time remaining until a task is due
- **Delete tasks** permanently with one click
- **Toast notifications** for actions like creating, completing, or deleting a task
- **Dark mode** with no flash-of-wrong-theme on load
- **Persistent storage** — tasks are saved in your browser's local storage, so they're still there when you come back (no account or backend required)

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router)
- TypeScript
- Tailwind CSS
- Browser `localStorage` for data persistence

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- npm (comes with Node.js)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/NabaaWali/TaskApp.git
   cd TaskApp
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

That's it — no database setup or environment variables needed, since tasks are stored locally in your browser.

## Project Structure

```
TaskApp/
├── app/
│   ├── layout.tsx      # Root layout, theme flash-prevention script, ThemeProvider
│   ├── page.tsx        # Main screen: all task CRUD, filters, search, toasts
│   └── globals.css     # Tailwind import + dark variant
├── components/         # UI building blocks
├── hooks/
│   └── useLocalStorage.ts
├── lib/
│   └── formatDueDate.ts
├── types/
│   ├── task.ts
│   └── toast.ts
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

## License

