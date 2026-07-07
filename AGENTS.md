<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# AGENTS.md

# Jeongcheon Law Office Website

## Project Vision

This project is the official website of Jeongcheon Law Office.

The goal is NOT simply to build a beautiful website.

The goal is to build a premium legal platform that:

- is easy for people to use
- is easy for search engines to understand
- is easy for LLMs (AI) to understand
- remains maintainable for many years

Every implementation should prioritize quality over speed.

---

# Team Roles

Project Owner

- Aleum

Technical Architect

- ChatGPT

Coding Agent

- Codex

AI agents should assume ChatGPT is responsible for architectural decisions.

When architectural uncertainty exists, prefer conservative implementations.

---

# Tech Stack

- Next.js (Latest App Router)
- React
- TypeScript
- Tailwind CSS
- ESLint
- npm
- Vercel

Do not introduce additional frameworks unless explicitly requested.

---

# General Development Principles

Always prioritize:

1. Correctness
2. Maintainability
3. Readability
4. Accessibility
5. Performance
6. SEO
7. AI SEO

Avoid clever code.

Prefer simple solutions.

Production-quality code only.

---

# TypeScript Rules

Use strict TypeScript.

Never use `any` unless absolutely unavoidable.

Prefer explicit typing.

Export reusable types.

---

# React Rules

Use Functional Components only.

Avoid Class Components.

Prefer Server Components.

Only use Client Components when browser APIs or interactivity require them.

Avoid unnecessary useEffect.

Prefer async Server Components.

---

# Next.js Rules

Always use App Router.

Use Metadata API.

Prefer Static Rendering.

Use Dynamic Rendering only when necessary.

Never introduce legacy Pages Router.

---

# Styling

Tailwind CSS only.

Avoid inline CSS.

Avoid duplicated utility classes.

Extract reusable UI components.

Maintain consistent spacing throughout the project.

---

# Project Structure

src/

app/

components/

features/

lib/

hooks/

types/

utils/

content/

data/

public/

Never create folders without clear purpose.

---

# Naming Convention

Components

PascalCase

Example

AttorneyCard.tsx

Hooks

camelCase

Example

useScroll.ts

Utilities

camelCase

Pages

lowercase route names

Example

/about

/blog

/contact

---

# Component Design

Each component should have a single responsibility.

Avoid components longer than approximately 250 lines.

Extract repeated UI.

Avoid deeply nested JSX.

---

# Performance

Optimize bundle size.

Optimize images.

Lazy-load large components.

Avoid unnecessary JavaScript.

Prefer Server Components.

Minimize hydration.

---

# Accessibility

Follow WCAG recommendations.

Always use semantic HTML.

Use meaningful alt text.

Support keyboard navigation.

Maintain proper color contrast.

---

# SEO

SEO is a primary requirement.

Every page should include:

- title
- description
- canonical URL
- Open Graph metadata

Use semantic heading hierarchy.

Only one H1.

Never skip heading levels.

Prefer meaningful URLs.

---

# AI SEO

This project should be optimized for AI systems including LLMs.

Always prioritize:

- semantic HTML
- structured content
- logical heading hierarchy
- descriptive section titles
- human-readable URLs

Avoid decorative sections without informational value.

Whenever appropriate, generate structured data using JSON-LD.

Preferred Schema.org types:

- Organization
- LegalService
- Attorney
- Person
- FAQPage
- Article
- BreadcrumbList

---

# Legal Content

Content must be:

Professional

Objective

Trustworthy

Understandable

Avoid:

Marketing exaggeration

Clickbait

Sensational wording

Always explain legal concepts clearly.

---

# UI Design

Visual direction:

Premium

Minimal

Professional

Calm

Readable

Avoid:

Heavy animations

Visual clutter

Excessive gradients

Whitespace is encouraged.

---

# Git Workflow

main

Production

develop

Development

feature/*

Feature branches

Never commit directly to main.

---

# Commit Messages

Use Conventional Commits.

Examples

feat:

fix:

docs:

style:

refactor:

perf:

Example

feat: add attorney profile page

---

# Code Review Checklist

Before completing any task, verify:

TypeScript passes

ESLint passes

Responsive layout works

Accessibility maintained

SEO preserved

No duplicated code

No unnecessary dependencies

---

# Definition of Done

A task is considered complete only if:

The application builds successfully.

There are no TypeScript errors.

There are no ESLint errors.

The implementation is responsive.

Accessibility is preserved.

SEO requirements are satisfied.

The solution is maintainable.

---

# Long-Term Roadmap

The website will eventually include:

Attorney profiles

Practice areas

Case summaries

Legal articles

FAQ

Search

AI-friendly structured content

Multi-language support

Every implementation should be designed with future scalability in mind.

---

# AI Collaboration Rules

AI agents should:

Explain architectural decisions briefly.

Do not rewrite large sections of code unnecessarily.

Preserve existing coding style.

Prefer incremental improvements.

Ask before introducing breaking architectural changes.

When uncertain, choose the simplest maintainable solution.