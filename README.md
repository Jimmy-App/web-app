# Jimmy Coach

Mocked coaching platform built with Next.js App Router, Prisma types, and in-memory data.

## Tech stack
- Next.js 16, TypeScript
- Prisma schema (types only)
- Tailwind CSS 4 + shadcn/ui
- React Hook Form + Zod
- pnpm

## Getting started

```bash
pnpm install
pnpm prisma:generate
pnpm dev
```

Open http://localhost:3000

## Notes
- Data is stored in memory via `src/lib/mock-db.ts`.
- Auth is mocked with localStorage (and a mirrored cookie for middleware routing).
- Sample coach account: `coach@jimmy.com`.
