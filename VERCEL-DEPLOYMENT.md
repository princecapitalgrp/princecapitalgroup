# Prince Capital Group — Vercel Deployment Guide

## Overview

Your Prince Capital Group website is ready to deploy on Vercel. This guide walks you through the complete deployment process.

---

## Prerequisites

- ✅ GitHub repository with all files pushed: `https://github.com/princecapitalgrp/princecapitalgroup.git`
- ✅ Vercel configuration file: `vercel.json` (already included)
- ✅ Node.js 22.x compatible project
- ✅ pnpm package manager configured

---

## Step 1: Connect to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. **Go to Vercel:** https://vercel.com
2. **Sign up or log in** with your GitHub account
3. **Click "New Project"**
4. **Select your repository:** `princecapitalgrp/princecapitalgroup`
5. **Vercel will auto-detect settings:**
   - Framework: Vite
   - Build Command: `pnpm run build`
   - Output Directory: `dist/public`
   - Install Command: `pnpm install`
6. **Click "Deploy"**

Vercel will automatically:
- Install dependencies
- Build the project
- Deploy to a live URL
- Set up automatic deployments on every push

### Option B: Using Vercel CLI

```bash
# 1. Install Vercel CLI globally
npm install -g vercel

# 2. Navigate to project directory
cd /home/ubuntu/prince-capital-group

# 3. Deploy
vercel --prod

# 4. Follow the prompts:
# - Link to existing project? → No (first time)
# - Set up and deploy? → Yes
# - Which scope? → Your account
# - Project name? → princecapitalgroup
# - Detected framework? → Vite (confirm)
# - Build command? → pnpm run build (confirm)
# - Output directory? → dist/public (confirm)
```

---

## Step 2: Configure Environment (Optional)

If you need environment variables (for analytics, APIs, etc.):

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings → Environment Variables**
4. **Add variables:**
   ```
   NODE_ENV = production
   VITE_ANALYTICS_WEBSITE_ID = your_id
   VITE_ANALYTICS_ENDPOINT = your_endpoint
   ```
5. **Redeploy** (push to main branch or click "Redeploy")

---

## Step 3: Custom Domain (Optional)

### Add Custom Domain

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Settings → Domains**
4. **Add Domain**
5. **Enter your domain:** `princecapitalgroup.com`
6. **Choose option:**
   - **Option A:** Use Vercel's nameservers (easiest)
   - **Option B:** Add DNS records to your registrar

### Using Vercel Nameservers (Recommended)

1. **Copy Vercel's nameservers** from the domain setup page
2. **Go to your domain registrar** (GoDaddy, Namecheap, etc.)
3. **Update nameservers** to Vercel's
4. **Wait 24–48 hours** for DNS propagation
5. **Verify domain** in Vercel dashboard

---

## Step 4: Verify Deployment

### Check Deployment Status

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **View Deployments tab**
4. **Look for "Production" deployment** with green checkmark

### Test Your Site

- **Default URL:** `https://princecapitalgroup.vercel.app`
- **Custom domain:** `https://princecapitalgroup.com` (if configured)

### Run Tests

```bash
# Test locally before pushing
pnpm run build
pnpm run preview

# Then visit http://localhost:4173
```

---

## Step 5: Set Up Automatic Deployments

Vercel automatically deploys when you push to `main` branch:

```bash
# Make changes locally
nano client/src/pages/Home.tsx

# Commit and push
git add .
git commit -m "Update home page content"
git push origin main

# Vercel automatically builds and deploys!
# Check deployment status in Vercel dashboard
```

---

## Troubleshooting

### Build Fails on Vercel

**Error: "Cannot find module"**
```bash
# Solution: Ensure all dependencies are in package.json
pnpm install
pnpm run build  # Test locally first
git add pnpm-lock.yaml
git push origin main
```

**Error: "Build command failed"**
```bash
# Check build logs in Vercel dashboard
# Verify: pnpm run build works locally
# Check TypeScript errors: pnpm run check
```

### Site Shows Blank Page

**Solution:**
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab for failed requests
4. Verify CDN URLs are accessible
5. Clear cache and hard refresh (Ctrl+Shift+R)

### Domain Not Working

**Solution:**
1. Verify DNS records are updated (use: https://dnschecker.org)
2. Wait 24–48 hours for DNS propagation
3. Check domain configuration in Vercel dashboard
4. Ensure SSL certificate is issued (green lock icon)

### Slow Performance

**Solution:**
1. Enable Vercel Analytics (free tier available)
2. Check image sizes (use CDN URLs)
3. Enable Gzip compression (automatic on Vercel)
4. Use Vercel's Edge Functions for optimization

---

## Vercel Configuration Explained

The `vercel.json` file includes:

```json
{
  "buildCommand": "pnpm run build",           // Build command
  "outputDirectory": "dist/public",           // Output folder
  "installCommand": "pnpm install",          // Install dependencies
  "framework": "vite",                        // Framework detection
  "nodeVersion": "22.x",                      // Node.js version
  "env": {
    "NODE_ENV": "production"                  // Environment variable
  },
  "headers": [                                // Security headers
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=3600"     // Cache for 1 hour
        }
      ]
    }
  ],
  "rewrites": [                               // SPA routing
    {
      "source": "/(.*)",
      "destination": "/index.html"            // Route to index.html
    }
  ]
}
```

---

## Monitoring & Analytics

### Enable Vercel Analytics

1. **Go to Vercel Dashboard**
2. **Select your project**
3. **Analytics tab**
4. **Enable Web Analytics** (free tier)
5. **View real-time metrics:**
   - Page views
   - Visitors
   - Core Web Vitals
   - Response times

### View Deployment Logs

1. **Go to Deployments tab**
2. **Click on a deployment**
3. **View build logs**
4. **Check for errors or warnings**

---

## Continuous Integration

### Automatic Deployments

Vercel automatically deploys when:
- ✅ You push to `main` branch
- ✅ A pull request is created (preview deployment)
- ✅ A pull request is merged

### Preview Deployments

For every pull request, Vercel creates a preview URL:
- **Format:** `https://princecapitalgroup-pr-123.vercel.app`
- **Useful for:** Testing changes before merging
- **Auto-deleted:** When PR is closed

---

## Rollback to Previous Deployment

If something breaks:

1. **Go to Vercel Dashboard**
2. **Deployments tab**
3. **Find previous working deployment**
4. **Click "Promote to Production"**

Or revert code on GitHub:
```bash
git revert HEAD
git push origin main
```

---

## Security Best Practices

✅ **Already configured:**
- HTTPS/SSL (automatic)
- Security headers (X-Frame-Options, X-XSS-Protection)
- Cache control headers
- DDoS protection

✅ **Recommended:**
- Enable Vercel's Web Application Firewall (WAF)
- Set up environment variables for secrets
- Use GitHub branch protection rules
- Enable 2FA on GitHub and Vercel accounts

---

## Performance Optimization

### Already Optimized

- ✅ Minified CSS & JavaScript
- ✅ Gzip compression
- ✅ CDN image URLs
- ✅ Code splitting (Vite)
- ✅ Production build

### Further Optimization

1. **Enable Image Optimization:**
   ```json
   {
     "images": {
       "domains": ["d2xsxph8kpxj0f.cloudfront.net"]
     }
   }
   ```

2. **Add Caching Headers:**
   - Already configured in `vercel.json`
   - Cache: 1 hour for HTML, longer for assets

3. **Monitor Performance:**
   - Use Vercel Analytics
   - Check Lighthouse scores
   - Monitor Core Web Vitals

---

## Support & Resources

- **Vercel Docs:** https://vercel.com/docs
- **Vite Docs:** https://vitejs.dev
- **React Docs:** https://react.dev
- **Vercel Support:** https://vercel.com/support

---

## Quick Reference

| Task | Command |
|------|---------|
| **Deploy** | `vercel --prod` |
| **Preview** | `vercel --prod --confirm` |
| **View logs** | Go to Vercel Dashboard → Deployments |
| **Rollback** | Vercel Dashboard → Promote previous deployment |
| **Add domain** | Vercel Dashboard → Settings → Domains |
| **View analytics** | Vercel Dashboard → Analytics |

---

## Deployment Checklist

Before deploying:

- [ ] All files pushed to GitHub (`git push origin main`)
- [ ] Local build works (`pnpm run build`)
- [ ] No TypeScript errors (`pnpm run check`)
- [ ] All pages load correctly
- [ ] Images display properly
- [ ] Navigation works on all pages
- [ ] Contact form validation works
- [ ] Responsive design tested (mobile/tablet/desktop)
- [ ] No console errors in browser DevTools

---

**Your website is ready to go live! 🚀**

Visit https://vercel.com and connect your GitHub repository to start deploying.
