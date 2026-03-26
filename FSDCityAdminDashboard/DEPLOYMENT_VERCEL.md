# Deploying ARDCity to Vercel

This project currently deploys as a single Next.js app.

GuestPass integration is disabled in the app, but the `guestpass` schema is still initialized in the same database and kept empty for future use.

## 1. Prerequisites
* A Vercel account
* Repository connected to Vercel
* Neon/Postgres `DATABASE_URL`

## 2. Deploy Dashboard
1. In Vercel, click **Add New Project**.
2. Import your repository.
3. Set **Root Directory** to `ARDCityAdminDashboard`.
4. Framework preset: **Next.js**.
5. Add environment variable:
   * `DATABASE_URL` = your production Postgres URL
6. Deploy.

## 3. Initialize Database (One Time)
After first deployment, run once from your project environment:

```bash
npm run db:init:fresh
```

This creates both:
* `public` tables for ARDCity dashboard
* `guestpass` schema and tables (empty)

## 4. Verification
1. Open the deployed dashboard URL.
2. Confirm dashboard pages load successfully.
3. Confirm `/guestpass/` shows the disabled message.
