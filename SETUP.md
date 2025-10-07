# 🚀 AVANGARD - Quick Setup Guide

## 📋 Prerequisites

- **Node.js** 18+ 
- **npm** 9+

## ⚡ Quick Start (Unified Development)

```bash
# 1. Clone/navigate to project
cd avangard-web

# 2. Install ALL dependencies (frontend + backend)
npm run install:all

# 3. Start EVERYTHING with one command! 🎉
npm run dev
```

**That's it!** Aplikacija se pokreće na:
- 🌐 **Frontend**: http://localhost:5173
- 🔧 **Backend API**: http://localhost:3001

## 📁 Available Scripts

```bash
# Development
npm run dev              # Pokreće frontend + backend
npm run dev:frontend     # Samo frontend
npm run dev:backend      # Samo backend

# Installation
npm run install:all      # Instalira sve dependencies

# Building
npm run build           # Build frontend + backend
npm run build:frontend  # Build samo frontend
npm run build:backend   # Build samo backend

# Production
npm start              # Pokreće production backend
npm run preview        # Preview frontend build

# Maintenance
npm run clean          # Briše build fajlove
npm run lint           # Lint kod
npm run format         # Format kod
```

## 🔧 Architecture

### Development Setup
- **concurrently** pokreće oba servera
- **Vite proxy** (/api -> localhost:3001) 
- **Hot reload** za sve izmene
- **TypeScript** za type safety

### File Structure
```
avangard-web/
├── src/              # React frontend
├── api/              # Express backend
├── package.json      # Root (unified scripts)
└── api/package.json  # Backend dependencies
```

## 📧 Email Setup (Production)

Za production, izmeni `api/.env`:

```env
# Production email (Gmail example)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=contact@avangard.dev
EMAIL_TO=hello@avangard.dev
```

## 🌐 Production Deployment

```bash
# Build everything
npm run build

# Deploy frontend to Vercel
vercel

# Deploy API to separate Vercel project
cd api && vercel
```

## 🎯 Development Workflow

1. **Start**: `npm run dev`
2. **Code**: Edit bilo koji fajl
3. **Test**: Auto-reload u browseru
4. **Deploy**: `npm run deploy`

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3001
npx kill-port 3001

# Kill process on port 5173  
npx kill-port 5173
```

### Dependencies Issues
```bash
# Clean install
npm run clean
rm -rf node_modules api/node_modules
npm run install:all
```

### Email Not Working
- Check `api/.env` konfiguraciju
- Za Gmail, omogući 2FA i generiši App Password
- Test sa Ethereal email (development default)

## 📊 Development URLs

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Health Check**: http://localhost:3001/health
- **Contact API**: http://localhost:3001/api/contact

---

**Happy Coding!** 🎉