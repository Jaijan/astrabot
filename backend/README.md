# Astrabot Backend

Express API for Astrabot. It is ready to deploy as a Render Web Service.

## Local Setup

```powershell
cd backend
npm install
copy .env.example .env
npm run dev
```

Health check:

```text
http://localhost:5000/api/health
```

## Render Settings

Use these values when creating a Render Web Service:

```text
Root Directory: backend
Build Command: npm install
Start Command: npm start
```

Environment variables:

```text
NODE_ENV=production
CORS_ORIGIN=https://your-vercel-app.vercel.app
```

After Render deploys, add the backend URL to Vercel:

```text
VITE_API_URL=https://your-render-service.onrender.com
```
