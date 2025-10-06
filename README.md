# UTM Builder Platform

Modern, minimalist workspace for governing UTM links across organizations. Built with Next.js 14, Tailwind, shadcn/ui primitives, Prisma, and React Query.

## Getting started

```bash
pnpm install
pnpm db:push
pnpm db:seed
pnpm dev
```

Create a `.env` from `.env.example` and configure database credentials plus OAuth secrets.

## Key features

- App shell with minimalist dashboard, builder, campaigns, templates, rules, analytics, and settings screens.
- Collaborative UTM builder with live preview, validation, and copy-to-clipboard shortcut.
- Prisma schema + seed establishing org/workspace governance objects.
- Rules lint utility with unit tests.
- API routes for link building and URL shortener stubs.

## Testing

```bash
pnpm test
```
