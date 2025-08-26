# Code Screenshot Project

## Project Overview

This is a tool that allows users to create beautiful screenshots of their code. Users are able to customize the syntax theme of the code, the background color, and other visual aspects to fully personalize their screenshots before exporting them.

## Project Structure

This is a Next.js project with TypeScript and Tailwind CSS.

### Tech Stack
- **Framework**: Next.js 15.5.0 (with Turbopack)
- **Runtime**: React 19.1.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Package Manager**: pnpm

### Directory Structure
```
src/
├── app/           # Next.js App Router
│   ├── layout.tsx # Root layout
│   ├── page.tsx   # Home page
│   └── globals.css # Global styles
public/            # Static assets
```

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack
- `npm run start` - Start production server

## Using shadcn/ui Components

This project uses Tailwind CSS and shadcn/ui components. 


1. Add components as needed:
   ```bash
   pnpm dlx shadcn@latest add [component]
   ```

2. Components will be added to `src/components/ui/` and can be imported with the `@/` alias.

## Path Aliases

- `@/*` maps to `src/*` for clean imports