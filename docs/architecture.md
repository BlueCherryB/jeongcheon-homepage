# Architecture

# Jeongcheon Law Office Website

Version: 1.0

---

# Overview

This project is the official website of Jeongcheon Law Office.

The website is designed as a long-term legal platform rather than a simple marketing homepage.

Core priorities:

- Excellent user experience
- Excellent SEO
- Excellent AI SEO
- High maintainability
- Scalable architecture

The system is designed to support future expansion without major architectural changes.

---

# Technology Stack

Framework

- Next.js (App Router)

Language

- TypeScript

Styling

- Tailwind CSS

Deployment

- Vercel

Version Control

- Git + GitHub

Development Environment

- VS Code

AI Development

- ChatGPT
- Codex

---

# High Level Architecture

```

```
Browser

↓

Next.js

↓

App Router

↓

Components

↓

Content

↓

Metadata / JSON-LD

↓

HTML

↓

Search Engine / AI
```

```markdown

The application follows a component-first architecture.

Business logic should remain separated from presentation.

---

# Directory Structure

```

```
src

├── app
├── components
├── features
├── content
├── data
├── hooks
├── lib
├── types
├── utils

public

docs
```

```markdown

---

# Routing Strategy

Every major topic has its own route.

Example

/
Home

/about
About the law office

/attorneys
Attorney introduction

/practice
Practice areas

/cases
Case summaries

/blog
Legal articles

/faq
Frequently asked questions

/contact
Contact information

Future expansion should create new routes instead of increasing page complexity.

---

# Component Architecture

Component hierarchy

```

```
Layout

↓

Section

↓

Card

↓

UI
```

```markdown

Example

Layout

Header

Footer

Sections

HeroSection

PracticeSection

BlogSection

Cards

AttorneyCard

CaseCard

ArticleCard

UI

Button

Badge

Input

Modal

---

# Content Strategy

Content is separated from UI whenever possible.

Future content should be stored in Markdown or structured data.

Possible content

- Blog
- FAQ
- Case summaries
- Attorney profile
- Practice descriptions

---

# SEO Architecture

Every page should contain

- Metadata
- Canonical URL
- Open Graph
- Structured heading hierarchy

The application should generate sitemap.xml automatically.

robots.txt should be maintained.

JSON-LD should be generated whenever appropriate.

---

# AI SEO Strategy

The project is designed for AI systems as well as search engines.

Content should be

- structured
- factual
- semantic
- easy to parse

Important Schema.org types

- Organization
- LegalService
- Person
- Attorney
- FAQPage
- Article
- BreadcrumbList

Avoid visual sections that contain little information.

---

# Performance Strategy

Target

Lighthouse

Performance

95+

Accessibility

95+

Best Practices

100

SEO

100

---

# Security

Never expose secrets.

Environment variables belong in

.env.local

Never commit

API keys

Passwords

Private credentials

---

# Deployment

Development

localhost

↓

GitHub

↓

develop branch

↓

Review

↓

main

↓

Vercel

↓

Production

---

# Git Strategy

main

Production

develop

Integration

feature/*

Feature development

Bug fixes

hotfix/*

Future

---

# Future Roadmap

Phase 1

Environment

Core pages

SEO

Phase 2

Blog

Case summaries

FAQ

Search

Phase 3

Structured legal database

Advanced filtering

AI-assisted search

Phase 4

Multi-language

Client portal

Appointment system

Newsletter

---

# Design Philosophy

The visual identity should communicate

Professionalism

Trust

Calmness

Precision

Avoid excessive decoration.

Whitespace is considered part of the design.

---

# Development Philosophy

Every implementation should satisfy:

Correctness

↓

Maintainability

↓

Performance

↓

SEO

↓

AI SEO

↓

Visual polish

Correct architecture is always preferred over quick implementation.