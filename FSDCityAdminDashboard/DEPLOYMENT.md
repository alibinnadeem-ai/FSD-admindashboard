# Deployment Guide: ARDCity Admin Dashboard

This project now deploys as a standalone application.

GuestPass integration is currently disabled in the dashboard UI and routing. A separate `guestpass` database schema is still provisioned and kept empty for future activation.

## 1. Server Requirements
* **OS**: Ubuntu 20.04/22.04 LTS (recommended)
* **Runtime**: Node.js 18+
* **Database**: PostgreSQL (NeonDB recommended)
* **Process Manager**: PM2 (recommended)

## 2. Deploy Steps (Server)

### Step A: Install Runtime
```bash
npm install -g pm2
```

### Step B: Install Project
```bash
cd /var/www/fsdcity/ARDCityAdminDashboard
npm install --production
```

### Step C: Configure Environment
Create `/var/www/fsdcity/ARDCityAdminDashboard/.env.local`:

```ini
DATABASE_URL=postgres://user:pass@host/db_name
```

### Step D: Initialize Fresh Database
Run once to create both schemas with empty tables:

```bash
cd /var/www/fsdcity/ARDCityAdminDashboard
npm run db:init:fresh
```

### Step E: Build and Run
```bash
cd /var/www/fsdcity/ARDCityAdminDashboard
npm run build
pm2 start npm --name "fsdcity-dashboard" -- start
```

## 3. Nginx Reverse Proxy
```nginx
server {
    listen 80;
    server_name dashboard.fsdcity.pk;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 4. Verification
1. Open `http://dashboard.fsdcity.pk`.
2. Confirm core pages load (Dashboard, Users, Scheduler, Analytics, Settings).
3. Visit `/guestpass/` and confirm the module-disabled message appears.
