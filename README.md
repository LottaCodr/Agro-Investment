# AYF — Agro Investment

African Youth Forum’s investor platform: browse verified West African farms, place capital, track harvests, and run the admin desk that lists those farms.

## Run it

```bash
npm install
npm run dev
```

The app is a Vite + React demo. State lives in `localStorage` on this device (no backend).

## Demo accounts

| Role | Email | Password |
| --- | --- | --- |
| Investor | `bami@ayf.africa` | any |
| Admin | `admin@ayf.africa` | any |

Or use the one-click demo buttons on `/auth`. Switch roles from the profile menu.

## What works

- Landing, FAQ, featured farms, privacy / terms / contact
- Sign in, sign up, session persistence
- Discover with search, status, crop, risk, ROI, and sort
- Farm pages, watchlist, wallet deposit/withdraw, live investing
- Portfolio, transactions, news articles, notifications, profile
- Admin CRUD for farms and investors, working filters and reports

Reset the workspace from **Profile → Reset demo data**.
