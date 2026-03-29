# Prince Capital Group — Official Website

A modern, multi-page website for Prince Capital Group, built with React 19, Tailwind CSS 4, and Vite. Deployed on Vercel.

## 🌐 Live Website

- **Production:** https://princecapitalgroup.vercel.app
- **Custom Domain:** (Configure in Vercel dashboard)

## 📋 Features

✅ **6 Complete Pages:**
- **Home** — Hero, process loop, pillars, proof-of-work
- **Strategy** — Signal stack, cross-pair mispricing, macro filters
- **Risk & Governance** — Risk philosophy, governance loop, compliance
- **Academy** — Educational content, learning paths, resources
- **About** — Founder, 90-day build, KPIs, values
- **Contact** — Contact form, inquiry types, direct contact

✅ **Design:**
- Dark navy editorial aesthetic (OKLCH color system)
- Playfair Display + IBM Plex Sans typography
- Responsive mobile-first design
- Scroll animations & smooth interactions
- Full compliance disclaimers

✅ **Technology:**
- React 19 with TypeScript
- Wouter for client-side routing
- Tailwind CSS 4 with custom design tokens
- Vite for fast builds
- pnpm for dependency management
- Express.js for production server

## 🚀 Quick Start

### Local Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm run dev

# Visit http://localhost:3000
```

### Production Build

```bash
# Build for production
pnpm run build

# Preview production build
pnpm run preview

# Start production server
NODE_ENV=production node dist/index.js
```

## 📁 Project Structure

```
prince-capital-group/
├── client/
│   ├── public/              # Static files (favicon, robots.txt)
│   ├── src/
│   │   ├── pages/           # Page components (Home, Strategy, etc.)
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── contexts/        # React contexts
│   │   ├── App.tsx          # Routes & layout
│   │   ├── main.tsx         # Entry point
│   │   └── index.css        # Global styles & design tokens
│   └── index.html           # HTML template
├── server/
│   └── index.ts             # Express server
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript config
├── vercel.json              # Vercel deployment config
└── VERCEL-DEPLOYMENT.md     # Deployment guide
```

## 🎨 Design System

### Colors (OKLCH)
- **Primary Background:** `oklch(0.22 0.04 243)` — Deep Navy
- **Accent:** `oklch(0.52 0.07 228)` — Steel Blue
- **Text:** `oklch(0.75 0.03 243)` — Soft Gray

### Typography
- **Headlines:** Playfair Display (serif)
- **Body:** IBM Plex Sans (sans-serif)
- **Monospace:** IBM Plex Mono

### Custom Classes
- `.pcg-section-label` — Section labels
- `.pcg-card` — Card styling
- `.pcg-btn-primary` — Primary buttons
- `.pcg-disclaimer` — Disclaimer text
- `.fade-up` — Scroll animations

## 🔧 Development

### Available Scripts

| Command | Purpose |
|---------|---------|
| `pnpm run dev` | Start development server |
| `pnpm run build` | Build for production |
| `pnpm run preview` | Preview production build |
| `pnpm run check` | TypeScript type checking |
| `pnpm run format` | Format code with Prettier |

### Adding New Pages

1. Create `client/src/pages/NewPage.tsx`
2. Add route in `client/src/App.tsx`
3. Add navigation link in `client/src/components/Navigation.tsx`
4. Build and test

### Customizing Content

Edit page files in `client/src/pages/`:
- `Home.tsx` — Home page content
- `Strategy.tsx` — Strategy section
- `Risk.tsx` — Risk & governance
- `Academy.tsx` — Educational content
- `About.tsx` — About section
- `Contact.tsx` — Contact form

### Customizing Styles

Edit `client/src/index.css` for:
- Color tokens
- Typography
- Custom component classes
- Global styles

## 📦 Dependencies

### Core
- **react** 19.2.1 — UI framework
- **wouter** 3.3.5 — Routing
- **tailwindcss** 4.1.14 — Styling
- **vite** 7.1.7 — Build tool

### UI Components
- **shadcn/ui** — Pre-built components
- **lucide-react** — Icons
- **framer-motion** — Animations

### Server
- **express** 4.21.2 — HTTP server
- **typescript** 5.6.3 — Type safety

See `package.json` for complete list.

## 🚀 Deployment

### Deploy to Vercel

1. **Connect GitHub repository:**
   - Go to https://vercel.com
   - Click "New Project"
   - Select `princecapitalgrp/princecapitalgroup`
   - Vercel auto-detects settings
   - Click "Deploy"

2. **Automatic deployments:**
   - Every push to `main` triggers deployment
   - Preview URLs for pull requests
   - Rollback to previous deployments anytime

3. **Add custom domain:**
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Update DNS records (if needed)

See `VERCEL-DEPLOYMENT.md` for detailed instructions.

### Deploy to Other Platforms

**GitHub Pages:**
```bash
npm install -g vercel
vercel deploy --prod
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir dist/public
```

**Self-Hosted:**
```bash
pnpm run build
NODE_ENV=production node dist/index.js
```

## 🔐 Security

✅ **Included:**
- HTTPS/SSL (automatic on Vercel)
- Security headers (X-Frame-Options, X-XSS-Protection)
- Content Security Policy
- DDoS protection (Vercel)

✅ **Recommended:**
- Enable 2FA on GitHub & Vercel
- Use environment variables for secrets
- Regular dependency updates
- Monitor security alerts

## 📊 Performance

- **Build size:** ~360 KB (uncompressed), ~105 KB (gzip)
- **Load time:** <1 second (typical)
- **Lighthouse score:** 85–95
- **Core Web Vitals:** Optimized

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
pnpm run build
```

### TypeScript Errors
```bash
# Check for type issues
pnpm run check

# Auto-format code
pnpm run format
```

### Dev Server Won't Start
```bash
# Kill any existing processes
pkill -f "vite"

# Restart
pnpm run dev
```

## 📚 Documentation

- **Main Guide:** See `PCG-Website-Guide.md`
- **Deployment:** See `VERCEL-DEPLOYMENT.md`
- **HTML Export:** See `HTML-GENERATION-INSTRUCTIONS.md`

## 📝 License

This website is proprietary to Prince Capital Group. All rights reserved.

## 📧 Support

For questions or issues:
- **Email:** contact@princecapitalgroup.com
- **GitHub Issues:** Report bugs here
- **Vercel Support:** https://vercel.com/support

---

**Built with React 19, Tailwind CSS 4, and Vite**

*Prince Capital Group — Global Macro FX through Disciplined Execution*
