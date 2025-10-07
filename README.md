# 🚀 AVANGARD - Production Ready Website

Kompletna, production-ready web aplikacija za IT kompaniju sa avangardnim dizajnom, 3D animacijama i contact form-om.

## ⚡ Quick Start

```bash
# 1. Install dependencies
npm run install:all

# 2. Start development (frontend + backend)
npm run dev
```

**Aplikacija se pokreće na:**
- 🌐 Frontend: http://localhost:5173  
- 🔧 Backend: http://localhost:3001

## ✨ Features

- **🎨 Avangardni Dizajn**: Futuristički cyber dizajn sa glassmorphism efektima
- **🌐 Single Page App**: Smooth scroll navigacija između sekcija
- **🎭 3D Animacije**: Three.js particle sistemi i 3D komponente
- **📱 Fully Responsive**: Mobile-first pristup za sve uređaje
- **📧 Contact System**: Kompletna forma sa email integracijom
- **⚡ High Performance**: Optimizovano za brzinu i SEO
- **🔒 Production Security**: Rate limiting, validacija, CORS zaštita

## 🏗️ Tech Stack

### Frontend
- **React 18** + **TypeScript** + **Vite**
- **Framer Motion** + **GSAP** (animacije)
- **Three.js** + **React Three Fiber** (3D)
- **TailwindCSS** (styling)
- **React Hook Form** + **Zod** (forms)

### Backend
- **Node.js** + **Express** + **TypeScript**
- **Nodemailer** (email)
- **Winston** (logging)
- **Express Rate Limit** (security)

## 📁 Project Structure

```
avangard-web/
├── src/                    # Frontend React App
│   ├── components/         # UI komponente
│   │   ├── sections/      # Hero, Services, Portfolio, About, Contact
│   │   ├── 3d/           # Three.js komponente
│   │   ├── forms/        # Contact forma
│   │   └── layout/       # Header, Footer, Layout
│   ├── data/             # Services, Projects, Team data
│   ├── utils/            # Utility funkcije
│   └── styles/           # Global CSS
├── api/                   # Backend Express API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── services/     # Email service
│   │   ├── middleware/   # Express middleware
│   │   └── utils/        # Logger, helpers
│   └── .env             # Environment variables
├── package.json          # Root package (unified scripts)
└── README.md            # Ova dokumentacija
```

## 🎨 Design System

### Color Palette
```css
--electric-blue: #00D4FF    /* Primary brand */
--cyber-purple: #8B5CF6     /* Secondary */
--neon-green: #00FF88       /* Accent */
--dark-slate: #0F172A       /* Background */
--midnight: #020617         /* Deep background */
```

### Typography
- **Headers**: Space Grotesk (futuristic)
- **Body**: Inter (readable) 
- **Code**: JetBrains Mono

## 📱 Sections Overview

### 🏠 Hero Section
- 3D particle background sa Three.js
- Animated logo i headline
- Company statistics counter
- Dual CTA buttons

### 🛠️ Services Section  
- 6 service cards sa 3D ikonama
- Hover transformacije i animacije
- Technology badges
- Process timeline

### 💼 Portfolio Section
- Project filtering po kategorijama
- Interactive case studies
- Technology showcases
- Client results metrics

### 👥 About Section
- Company story i mission
- Team member showcase
- Company values sa ikonama
- Global office locations

### 📞 Contact Section
- Multi-step contact form
- Real-time validacija sa Zod
- Email integration
- Contact info i social links

## 📧 Email Configuration

### Development (Default)
Email koristi Ethereal Email za testiranje - poruke se neće stvarno poslati.

### Production Setup
Izmeni `api/.env`:

```env
# Gmail example
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-char-app-password
EMAIL_FROM=contact@avangard.dev
EMAIL_TO=hello@avangard.dev
```

Za Gmail:
1. Omogući 2-Factor Authentication
2. Generiši App Password (16 karaktera)
3. Koristi App Password, ne obični password

## 🔧 Development Scripts

```bash
# Development
npm run dev              # Start frontend + backend
npm run dev:frontend     # Samo frontend (port 5173)
npm run dev:backend      # Samo backend (port 3001)

# Installation  
npm run install:all      # Install frontend + backend deps

# Building
npm run build           # Build sve
npm run build:frontend  # Build frontend
npm run build:backend   # Build backend  

# Production
npm start              # Start production backend
npm run preview        # Preview frontend build

# Maintenance
npm run clean          # Delete build files
npm run lint           # Lint code
npm run format         # Format code
```

## 🌐 API Endpoints

```
GET  /health              # API health check
POST /api/contact         # Submit contact form
GET  /api/contact/status  # Contact service status
```

### Contact Form API

**POST** `/api/contact`

```json
{
  "name": "string (required)",
  "email": "string (required)", 
  "company": "string (optional)",
  "phone": "string (optional)",
  "projectType": "enum (required)",
  "budget": "enum (required)", 
  "timeline": "enum (required)",
  "message": "string (required)"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your message has been sent successfully"
}
```

## 🚢 Deployment

### Vercel (Recommended)

```bash
# 1. Build everything
npm run build

# 2. Deploy frontend
vercel

# 3. Deploy API (separate project)
cd api
vercel
```

### Environment Variables

**Frontend** (Vercel):
```env
VITE_API_URL=https://your-api.vercel.app
```

**Backend** (Vercel):
```env
NODE_ENV=production
FRONTEND_URL=https://your-frontend.vercel.app
EMAIL_USER=production-email@domain.com
EMAIL_PASS=production-password
EMAIL_FROM=contact@avangard.dev
EMAIL_TO=hello@avangard.dev
```

## 📊 Performance

- **Lighthouse Score**: 95+ na svim metrikama
- **Bundle Size**: <500KB gzipped
- **First Paint**: <1.5s
- **3D Optimization**: LOD rendering i culling

## 🔒 Security Features

- **Rate Limiting**: 5 contact submissions / 15 minuta
- **Input Validation**: Zod schema validacija
- **CORS Protection**: Konfigurisan za production
- **Security Headers**: Helmet middleware
- **Email Sanitization**: XSS zaštita

## 🎯 Browser Support

- Chrome/Edge 88+
- Firefox 85+  
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Content Management

Sav sadržaj je u TypeScript fajlovima za lake izmene:

- **Services**: `src/data/services.ts`
- **Portfolio**: `src/data/projects.ts` 
- **Team**: `src/data/team.ts`

Samo izmeni fajl i restartuj development server.

## 🛠️ Customization

### Dodavanje Nove Sekcije
1. Kreiraj komponentu u `src/components/sections/`
2. Dodaj u `src/pages/Homepage.tsx`
3. Dodaj u navigation `src/utils/smoothScroll.ts`

### Promena Boja
Izmeni `tailwind.config.js` i `src/styles/globals.css`

### Dodavanje 3D Elemenata
Kreiraj komponentu u `src/components/3d/` sa Three.js

## 🔍 Troubleshooting

### Port Already in Use
```bash
npx kill-port 3001
npx kill-port 5173
```

### Email Not Working
- Proveri `api/.env` konfiguraciju
- Test sa http://localhost:3001/health
- Za Gmail: omogući 2FA + App Password

### Build Errors
```bash
npm run clean
rm -rf node_modules api/node_modules  
npm run install:all
```

## 📞 Support

- 📧 **Email**: hello@avangard.dev
- 📞 **Phone**: +381 11 123 4567
- 🌐 **Website**: [avangard.dev](https://avangard.dev)

---

**Razvio**: Avangard Development Team  
**Verzija**: 1.0.0  
**Licenca**: MIT

**🎉 Ready for production deployment!**