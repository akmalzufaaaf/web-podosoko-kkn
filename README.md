# KKN Web Project

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app) and integrated with [Sanity.io](https://www.sanity.io) for content management.

## Environment Variables

Before running or deploying the project, you need to set up your environment variables. 

1. Copy the `.env.example` file to `.env.local` (for local development) or configure them in your deployment platform (like Vercel).
2. Fill in the required values:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID="your_sanity_project_id"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2024-06-27"
```

You can find your Sanity Project ID in your [Sanity Manage Dashboard](https://www.sanity.io/manage) or in the `sanity.cli.ts` / `sanity.config.ts` file.

## Local Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment Tutorial

The easiest way to deploy this Next.js app is to use [Vercel](https://vercel.com/).

### Step 1: Push your code to GitHub
Make sure your project is pushed to a GitHub repository.

### Step 2: Import Project on Vercel
1. Log in to [Vercel](https://vercel.com/).
2. Click on **Add New...** and select **Project**.
3. Import your GitHub repository.

### Step 3: Configure Environment Variables
Before clicking Deploy, expand the **Environment Variables** section and add the variables from your `.env.example` file:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`
- `NEXT_PUBLIC_SANITY_DATASET`
- `NEXT_PUBLIC_SANITY_API_VERSION`

*Note: Ensure the dataset is set to `production` unless you have configured a different dataset.*

### Step 4: Deploy
Click **Deploy**! Vercel will build and deploy your application. 

## Sanity Studio Setup for Deployment
If you have embedded Sanity Studio within your Next.js app (usually at `/studio` or similar), you will need to add your deployed URL to the CORS origins in Sanity:
1. Go to [Sanity Manage](https://www.sanity.io/manage).
2. Select your project.
3. Go to **API** -> **CORS origins**.
4. Add your deployed Vercel URL (e.g., `https://your-app.vercel.app`) and allow credentials if needed.
