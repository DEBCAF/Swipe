# Swipe

A personal website to ASK YOUR CRUSH OUT!! It is currently coded to me, so you can also rewrite it to fit your own booking workflow.

## Features

- Light weight website - no database
- Interactive scaling buttons for funsies
- Date validation ensures date chosen is after or on today
- Will send you an email when the user fills in the form (need to set up yourself)

## What you can do to personalise this website

- Change the date options under allowedEvents[] in route.ts, and on the frontend page.tsx
- Add your Resend API key in your own .env.local, alongside your email and noreply resend email addresses
- When deploying on Vercel, remember to update the env variables on the Vercel interface too!

## Technology Stack

- Next.js backend
- No database
- Vercel app deployment
- Resend email notification

## Prerequisites

Ensure you have the following installed:
- Node.js >= 18.0.0
- npm >= 9.0.0

## Installation

1. Clone the repository
2. Install dependencies
3. Run development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result
