This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Project Setup

Packaged Installed

## Apollo Client & GraphQL

```bash
npm install @apollo/client graphql
```

## Chakra UI + form helpers

```bash
npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion
```

## React Hook Form + Zod Validation

```bash
npm install react-hook-form zod @hookform/resolvers
```

## JWT for auth

```bash
npm install jsonwebtoken
npm install -D @types/jsonwebtoken
```

# Tech Stack

- Next.js (App Router)
- TypeScript
- Chakra UI (v3+)
  - `@chakra-ui/react`
- GraphQL + Apollo Client
- JWT Authentication
- React Hook Form + Zod

# Features

- Secure user authentication via JWT
- User detail form with validation
- Cookie-based session persistence
- Apollo GraphQL integration
- Character explorer with modal details (Rick & Morty API)
- Pagination and URL sync (`/information?page=n`)
- Graceful error, loading, and not-found pages

# Getting Started on Local

## Clone the Repository

```bash
git clone https://github.com/MeghaMGoutham/next-graphql-project.git
cd next-graphql-project
```

## Install Dependencies

```bash
npm install
```
## env.local setup for local run
Add a key JWT_SECRET and a value(test value) and save in env.local

## Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# Project Structure

```plaintext
src/
├── app/
│   ├── layout.tsx                # Root layout (Chakra + Apollo providers)
│   ├── page.tsx                  # Home page (JWT auth + user view)
│   ├── api/
│   │   ├── logout/
│   │   │   └── route.ts          # API route to clear JWT cookie
│   │   └── user-token/
│   │       └── route.ts          # API route to issue JWT and set cookie
│   └── information/
│       ├── page.tsx              # Character info page (Apollo query)
│       ├── error.tsx             # Error fallback for /information
│       └── not-found.tsx         # 404 fallback for /information
├── constants/
│   └── type.ts                   # Shared TypeScript types
├── context/
│   └── AuthContext.tsx           # Auth state provider using Context API
├── lib/
│   ├── ApolloWrapper.tsx         # Apollo Client setup
│   └── queries.ts                # GraphQL query for characters
├── tests/                        # All test files for components
│   ├── ClientWrapper.test.tsx
│   ├── Footer.test.tsx
│   ├── InformationPage.test.tsx
│   ├── Layout.test.tsx
│   ├── Loading.test.tsx
│   ├── UserDetailsDisplay.test.tsx
│   └── UserDetailsForm.test.tsx
├── ui/
│   ├── ClientWrapper.tsx         # Displays form or user details
│   ├── Footer.tsx
│   ├── InformationPage.tsx       # Grid, modal, and pagination
│   ├── Layout.tsx                # Page layout with background and footer
│   ├── Loading.tsx               # Chakra-based loading state
│   ├── UserDetailsDisplay.tsx    # Displays submitted user details
│   └── UserDetailsForm.tsx       # Form with zod + react-hook-form

```
