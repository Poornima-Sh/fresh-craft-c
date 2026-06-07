# Fresh‑Craft Website
### Professional Kidswear Sourcing — Mumbai, India

---

## 🎨 Brand Identity

| Token         | Value                   |
|---------------|-------------------------|
| Primary Red   | `#E30613`               |
| Dark Red      | `#B8000F`               |
| White         | `#FFFFFF`               |
| Black         | `#000000`               |
| Dark Grey     | `#333333`               |
| Light Grey    | `#F5F5F5`               |
| Heading Font  | Montserrat (700/800/900)|
| Body Font     | Open Sans (400/600)     |

---

## 📁 Project Structure

```
fresh-craft/
├── index.html          ← Main website (all 7 sections + footer)
├── css/
│   └── styles.css      ← Complete stylesheet (CSS variables, layout, responsive)
├── js/
│   └── main.js         ← GSAP animations, form handling, confetti, interactions
├── assets/             ← Place custom images/logos here
└── README.md           ← This file
```

---

## 🚀 Quick Start (Static / No Build Step)

This project is **pure HTML/CSS/JS** with CDN-loaded GSAP. No build step is required to run it locally or deploy.

### Option A — Open directly in browser
```bash
# Simply open index.html in any modern browser
open index.html         # macOS
start index.html        # Windows
xdg-open index.html     # Linux
```

### Option B — Local server (recommended to avoid font/CORS issues)
```bash
# Using Python
python3 -m http.server 8080
# Then visit http://localhost:8080

# Using Node.js (npx)
npx serve .
# Then visit http://localhost:3000

# Using VS Code
# Install "Live Server" extension → right-click index.html → "Open with Live Server"
```

---

## 📦 NPM/Vite Upgrade Path (Optional)

If you want to use npm/yarn with Framer Motion instead of CDN GSAP:

### 1. Initialise a Vite project
```bash
npm create vite@latest fresh-craft-app -- --template react
cd fresh-craft-app
npm install
npm install framer-motion
```

### 2. Install dependencies
```bash
npm install framer-motion gsap @gsap/react lucide-react
```

### 3. Migrate the HTML sections to React components
```
src/
├── components/
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Expertise.jsx
│   ├── Products.jsx
│   ├── Factories.jsx
│   ├── Sustainability.jsx
│   └── Contact.jsx
├── App.jsx
└── main.jsx
```

### 4. Start dev server
```bash
npm run dev
# Runs at http://localhost:5173
```

### 5. Build for production
```bash
npm run build
# Output → dist/
```

---

## 🌐 Deployment Guide

### Option A — Netlify (Recommended, Free)
1. Go to [netlify.com](https://netlify.com) → Log in
2. Drag and drop the **entire `fresh-craft/` folder** onto the Netlify dashboard
3. Netlify auto-detects static site → deploys instantly
4. Your site is live at `https://your-site.netlify.app`

### Option B — Vercel
```bash
npm install -g vercel
cd fresh-craft
vercel
# Follow prompts → deploys to https://your-site.vercel.app
```

### Option C — GitHub Pages
```bash
git init
git add .
git commit -m "Fresh-Craft website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/fresh-craft.git
git push -u origin main
# Enable GitHub Pages → Settings → Pages → Deploy from main branch
```

### Option D — cPanel / Traditional Hosting
1. Zip the contents of `fresh-craft/` (not the folder itself)
2. Upload via File Manager or FTP to `public_html/`
3. Unzip in `public_html/`
4. Visit your domain — site is live

### Option E — AWS Amplify
1. Push to a GitHub/GitLab repo
2. Open AWS Amplify Console → New App → Host Web App
3. Connect repository → Deploy (no build command needed for static)

---

## ✏️ Customisation Guide

### Updating Company Information
Open `index.html` and search/replace:
- `Fresh‑Craft` → Your company name
- `Andheri East, Mumbai — 400069` → Your address
- `sourcing@freshcraft.in` → Your email
- `+91 22 4000 0000` → Your phone
- `Est. 2010` → Your founding year
- Stats: `15+`, `50+`, `30+` → Your actual figures

### Changing Colours
Open `css/styles.css`, find `:root` and update:
```css
:root {
  --red:       #E30613;   /* Main accent — change here to rebrand */
  --red-dark:  #B8000F;   /* Hover/dark variant */
  --red-light: #FF3340;   /* Light variant */
}
```

### Changing Fonts
Replace the Google Fonts link in `<head>` of `index.html`:
```html
<link href="https://fonts.googleapis.com/css2?family=YourHeadingFont:wght@700;800;900&family=YourBodyFont:wght@400;600&display=swap" rel="stylesheet">
```
Then update in `css/styles.css`:
```css
--font-head: 'YourHeadingFont', sans-serif;
--font-body: 'YourBodyFont', sans-serif;
```

### Adding Real Product Images
Replace the coloured gradient blocks in the Products section:
```html
<!-- Find each .product-visual div and replace style with: -->
<div class="product-visual">
  <img src="assets/tops.jpg" alt="Tops" style="width:100%;height:100%;object-fit:cover;">
</div>
```

### Adding a Real Logo
1. Place your logo SVG or PNG in `assets/logo.svg`
2. In `index.html`, replace `.nav-logo`:
```html
<a href="#" class="nav-logo">
  <img src="assets/logo.svg" alt="Fresh-Craft" height="36">
</a>
```

### Connecting the Contact Form (Netlify Forms)
Add `data-netlify="true"` to the form wrapper:
```html
<form name="inquiry" method="POST" data-netlify="true">
  <!-- form fields -->
</form>
```
Netlify automatically captures submissions with no backend needed.

### Connecting the Contact Form (Formspree)
1. Sign up at [formspree.io](https://formspree.io)
2. Create a new form → get your endpoint
3. In `js/main.js`, replace `handleFormSubmit` with:
```javascript
const res = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  body: JSON.stringify({ name: firstName.value, email: email.value, message: message.value })
});
if (res.ok) showSuccess();
```

---

## 🔧 GSAP Animation Reference

All animations use **GSAP 3.12** loaded via CDN:
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
```

Key animations in `js/main.js`:

| Animation              | Trigger          | Method                  |
|------------------------|------------------|-------------------------|
| Hero entrance timeline | Page load        | `gsap.timeline()`       |
| Children idle bounce   | Continuous       | `gsap.to()` yoyo+repeat |
| Stat counters          | Page load        | Custom `onUpdate`       |
| Scroll reveals         | Scroll enter     | `ScrollTrigger`         |
| Map pin pulse          | Scroll into view | CSS `@keyframes ping`   |
| Card hover morph       | Mouse enter      | `gsap.to()` scale       |
| Confetti cannon        | Form submit      | Canvas `requestAnimationFrame` |
| Progress bar           | Scroll           | `window.scrollY` %      |

---

## 🖥 Browser Support

| Browser        | Supported |
|----------------|-----------|
| Chrome 90+     | ✅        |
| Firefox 88+    | ✅        |
| Safari 14+     | ✅        |
| Edge 90+       | ✅        |
| Opera 76+      | ✅        |
| IE 11          | ❌        |

---

## ♿ Accessibility

- Semantic HTML5 landmarks (`nav`, `section`, `main`, `footer`)
- `aria-label` on icon-only buttons
- Keyboard navigation via tab order
- Focus states preserved on all interactive elements
- `prefers-reduced-motion` — Add the following to `css/styles.css` to respect system preference:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 📧 Support

For customisation queries or technical support, contact:
**sourcing@freshcraft.in**

---

*Built with GSAP 3.12, Google Fonts (Montserrat + Open Sans), and pure HTML/CSS/JS.*
*© 2024 Fresh‑Craft, Mumbai, India. All rights reserved.*
