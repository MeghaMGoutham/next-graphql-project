This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Setup

Install Required packages

# Apollo Client & GraphQL

npm install @apollo/client graphql

# Chakra UI + form helpers

npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion

# Chakra UI Components (Modal, Form Control, etc.)

npm install @chakra-ui/form-control @chakra-ui/modal

# React Hook Form + Zod Validation

npm install react-hook-form zod @hookform/resolvers

# JWT for auth

npm install jsonwebtoken
npm install -D @types/jsonwebtoken

## Tech Stack

- Next.js (App Router)
- TypeScript
- Chakra UI (v3+)
  - `@chakra-ui/react`
  - `@chakra-ui/form-control` (for labeled fields and error messages)
  - `@chakra-ui/modal` (for modal dialogs)
- GraphQL + Apollo Client
- JWT Authentication
- React Hook Form + Zod

## Features

-  Secure user authentication via JWT
-  User detail form with validation
-  Cookie-based session persistence
-  Apollo GraphQL integration
-  Character explorer with modal details (Rick & Morty API)
-  Pagination and URL sync (`/information?page=n`)
-  Graceful error, loading, and not-found pages

## Getting Started

# Clone the Repository

```bash
git clone https://github.com/MeghaMGoutham/next-graphql-project.git
cd next-graphql-project
```

# Install Dependencies

```bash
npm install
```

# Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

src/
├── app/
│ ├── layout.tsx # Root layout (Chakra + Apollo providers)
│ ├── page.tsx # Home page (JWT auth + user view)
│ ├── api/
│ │ └── user-token/
│ │ └── route.ts # API route to issue JWT and set cookie
│ └── information/
│ ├── page.tsx # Character info page (Apollo query)
│ ├── error.tsx # Error fallback for /information
│ ├── loading.tsx # Loading UI for /information
│ └── not-found.tsx # 404 fallback for /information
├── lib/
│ ├── ApolloWrapper.tsx # Apollo Client setup
│ └── queries.ts # GraphQL query for characters
├── ui/
│ ├── Layout.tsx # Page layout with background and footer
│ ├── Footer.tsx
│ ├── ClientWrapper.tsx # Displays form or user details
│ ├── UserDetailsForm.tsx # Form with zod + react-hook-form
│ └── InformationPage.tsx # Grid, modal, and pagination
