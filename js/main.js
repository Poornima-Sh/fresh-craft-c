/* ================================================
   FRESH-CRAFT WEBSITE — MAIN JAVASCRIPT
   GSAP + ScrollTrigger animations, form logic,
   confetti, and UI interactions
================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─────────────────────────────────
     GSAP + ScrollTrigger Registration
  ───────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger);

  /* ─────────────────────────────────
     NAVBAR scroll behaviour
  ───────────────────────────────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  /* ─────────────────────────────────
     HAMBURGER MENU
  ───────────────────────────────── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* ─────────────────────────────────
     HERO — PAGE LOAD TIMELINE
  ───────────────────────────────── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('#heroBadge',          { opacity:0, y:-24, duration:0.6 })
    .from('.hero-headline',      { opacity:0, y:48, duration:0.85 }, '-=0.35')
    .from('.hero-subheading',    { opacity:0, y:32, duration:0.65 }, '-=0.45')
    .from('.hero-ctas',          { opacity:0, y:24, duration:0.55 }, '-=0.4')
    .from('.hero-stats',         { opacity:0, y:20, duration:0.5  }, '-=0.35')
    .from('#heroIllustration',   { opacity:0, x:60, duration:0.9  }, '-=0.7')
    .from('#deco1,#deco2,#deco3,#deco4', {
        opacity:0, scale:0, duration:0.5, stagger:0.12
      }, '-=0.5')
    .from('#child1',             { opacity:0, y:40, duration:0.7  }, '-=0.7')
    .from('#child2',             { opacity:0, y:40, duration:0.7  }, '-=0.55')
    .from('#child3',             { opacity:0, y:40, duration:0.7  }, '-=0.55')
    .from('.hero-float-shape',   { opacity:0, scale:0, duration:0.6, stagger:0.15 }, '-=0.4');

  /* ─────────────────────────────────
     HERO CHILDREN — subtle idle anim
  ───────────────────────────────── */
  gsap.to('#child1', { y:-10, duration:3.2, yoyo:true, repeat:-1, ease:'sine.inOut', delay:0.5 });
  gsap.to('#child2', { y:-14, duration:2.8, yoyo:true, repeat:-1, ease:'sine.inOut', delay:1.0 });
  gsap.to('#child3', { y:-8,  duration:3.6, yoyo:true, repeat:-1, ease:'sine.inOut', delay:0.2 });

  /* ─────────────────────────────────
     COUNTER ANIMATION (hero stats)
  ───────────────────────────────── */
  const counterEls = document.querySelectorAll('.hero-stat-value');
  const targets = [15, 50, 30];
  counterEls.forEach((el, i) => {
    const suffix = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
    const txt = el.textContent.replace('+','').trim();
    const target = targets[i];
    gsap.from({ val: 0 }, {
      val: target,
      duration: 2.2,
      delay: 1.4 + i * 0.2,
      ease: 'power2.out',
      onUpdate: function() {
        el.innerHTML = Math.round(this.targets()[0].val) + suffix;
      }
    });
  });

  /* ─────────────────────────────────
     WORLD MAP PIN PULSE (CSS handles
     the animation; we add stagger on
     scroll reveal)
  ───────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#about',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.from('#pinMumbai,#pinBangladesh,#pinSEAsia,#pinIndia', {
        opacity:0, scale:0, duration:0.5, stagger:0.2,
        ease:'back.out(1.7)', transformOrigin:'center'
      });
    }
  });

  /* ─────────────────────────────────
     SCROLL-TRIGGERED REVEALS
  ───────────────────────────────── */

  // Generic fade-up
  gsap.utils.toArray('.gsap-fade-up').forEach(el => {
    gsap.to(el, {
      opacity: 1, y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 82%',
        once: true
      }
    });
  });

  // Fade left
  gsap.utils.toArray('.gsap-fade-left').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    });
  });

  // Fade right
  gsap.utils.toArray('.gsap-fade-right').forEach(el => {
    gsap.to(el, {
      opacity: 1, x: 0,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 80%', once: true }
    });
  });

  // Scale cards (expertise + products + sustain)
  gsap.utils.toArray('.gsap-scale').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--delay') || '0');
    gsap.to(el, {
      opacity: 1, scale: 1, y: 0,
      duration: 0.7,
      delay: delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 84%', once: true }
    });
  });

  /* ─────────────────────────────────
     FACTORY CARDS staggered reveal
  ───────────────────────────────── */
  gsap.utils.toArray('.factory-card').forEach((card, i) => {
    gsap.from(card, {
      opacity: 0,
      y: 60,
      duration: 0.8,
      delay: i * 0.15,
      ease: 'power3.out',
      scrollTrigger: { trigger: '#factories', start: 'top 70%', once: true }
    });
  });

  /* ─────────────────────────────────
     EXPERTISE ICON MORPH hover
     (scale bounce on hover)
  ───────────────────────────────── */
  document.querySelectorAll('.expertise-card').forEach(card => {
    const icon = card.querySelector('.expertise-icon-wrap');
    card.addEventListener('mouseenter', () => {
      gsap.to(icon, { scale:1.12, duration:0.25, ease:'power2.out', yoyo:true, repeat:1 });
    });
  });

  /* ─────────────────────────────────
     PRODUCT CARDS — ripple on click
  ───────────────────────────────── */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', function(e) {
      const rect = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(255,255,255,0.4);
        width:10px; height:10px;
        left:${e.clientX - rect.left - 5}px;
        top:${e.clientY - rect.top - 5}px;
        pointer-events:none;
        z-index:10;
      `;
      card.style.position = 'relative';
      card.appendChild(ripple);
      gsap.to(ripple, {
        width:300, height:300,
        x:'-50%', y:'-50%',
        opacity:0,
        duration:0.7,
        ease:'power2.out',
        onComplete: () => ripple.remove()
      });
    });
  });

  /* ─────────────────────────────────
     SUSTAINABILITY BADGE spin anim
  ───────────────────────────────── */
  document.querySelectorAll('.sustain-badge').forEach(badge => {
    const icon = badge.querySelector('.sustain-badge-icon');
    badge.addEventListener('mouseenter', () => {
      gsap.to(icon, { rotation:360, duration:0.6, ease:'power2.inOut' });
    });
    badge.addEventListener('mouseleave', () => {
      gsap.to(icon, { rotation:0, duration:0.4, ease:'power2.out' });
    });
  });

  /* ─────────────────────────────────
     PARALLAX on world map
  ───────────────────────────────── */
  gsap.to('#worldMap', {
    y: -30,
    ease: 'none',
    scrollTrigger: {
      trigger: '#about',
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1.5
    }
  });

  /* ─────────────────────────────────
     RED CALLOUT STRIPE animate
  ───────────────────────────────── */
  gsap.from('.sustain-callout', {
    opacity: 0,
    x: -60,
    duration: 0.9,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.sustain-callout', start: 'top 85%', once: true }
  });

  /* ─────────────────────────────────
     CTA BUTTON — ripple on click
  ───────────────────────────────── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.id === 'formSubmit') return; // handled separately
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.3);
        width:6px; height:6px;
        left:${x - 3}px; top:${y - 3}px;
        pointer-events:none; z-index:10;
      `;
      btn.appendChild(ripple);
      gsap.to(ripple, {
        width:200, height:200,
        x:'-50%', y:'-50%',
        opacity:0, duration:0.65,
        ease:'power2.out',
        onComplete: () => ripple.remove()
      });
    });
  });

  /* ─────────────────────────────────
     FORM SUBMISSION + CONFETTI
  ───────────────────────────────── */
  const formSubmit = document.getElementById('formSubmit');
  if (formSubmit) {
    formSubmit.addEventListener('click', handleFormSubmit);
  }

  function handleFormSubmit() {
    const firstName = document.getElementById('firstName');
    const email     = document.getElementById('email');
    const message   = document.getElementById('message');
    let valid = true;

    [firstName, email, message].forEach(field => {
      if (!field) return;
      if (!field.value.trim()) {
        field.style.borderColor = '#E30613';
        gsap.to(field, { x:-6, duration:0.08, yoyo:true, repeat:5, ease:'power2.inOut',
          onComplete: () => { field.style.borderColor = '#E8E8E8'; } });
        valid = false;
      } else {
        field.style.borderColor = '#E8E8E8';
      }
    });
    if (!valid) return;

    // Animate button
    const submitText   = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    if (submitText) submitText.style.display = 'none';
    if (submitLoader) submitLoader.style.display = 'inline';
    formSubmit.disabled = true;

    gsap.to(formSubmit, { scale:0.97, duration:0.15, yoyo:true, repeat:1 });

    setTimeout(() => {
      showSuccess();
      launchConfetti();
    }, 1200);
  }

  function showSuccess() {
    const form    = document.getElementById('contactForm');
    const success = document.getElementById('formSuccess');
    if (!form || !success) return;
    gsap.to(form, { opacity:0, y:-20, duration:0.4, ease:'power2.in',
      onComplete: () => {
        form.style.display = 'none';
        success.classList.add('show');
        gsap.from('.success-icon',  { scale:0, duration:0.5, ease:'back.out(1.8)', delay:0.1 });
        gsap.from('.success-title', { opacity:0, y:20, duration:0.5, delay:0.3 });
        gsap.from('.success-text',  { opacity:0, y:15, duration:0.5, delay:0.45 });
      }
    });
  }

  /* ─────────────────────────────────
     CONFETTI CANNON
  ───────────────────────────────── */
  function launchConfetti() {
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    const COLOURS = ['#E30613','#ffffff','#B8000F','#ffcc00','#2B3D8F','#27ae60','#e67e22'];
    const pieces  = [];
    const TOTAL   = 180;

    for (let i = 0; i < TOTAL; i++) {
      pieces.push({
        x:     Math.random() * canvas.width,
        y:     -20 - Math.random() * 200,
        r:     4 + Math.random() * 7,
        d:     2 + Math.random() * 4,
        color: COLOURS[Math.floor(Math.random() * COLOURS.length)],
        tilt:  (Math.random() * 20) - 10,
        tiltA: Math.random() * 0.2,
        tiltD: 0,
        shape: Math.random() > 0.5 ? 'rect' : 'circle',
        vx:    (Math.random() - 0.5) * 4
      });
    }

    let frame = 0;
    const MAX_FRAMES = 220;

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.beginPath();
        ctx.save();
        ctx.translate(p.x + p.tilt, p.y);
        ctx.rotate(p.tiltD * Math.PI / 180);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') {
          ctx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.8);
        } else {
          ctx.arc(0, 0, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();

        p.y    += p.d;
        p.x    += p.vx;
        p.tiltD += p.tiltA;
        p.d    += 0.05;

        if (p.y > canvas.height + 20) {
          p.y  = -20;
          p.x  = Math.random() * canvas.width;
          p.d  = 2 + Math.random() * 3;
        }
      });
      frame++;
      if (frame < MAX_FRAMES) {
        requestAnimationFrame(draw);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    draw();
  }

  /* ─────────────────────────────────
     SMOOTH ANCHOR SCROLL
  ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = 72; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      gsap.to(window, { scrollTo: { y: top, autoKill: false }, duration: 1, ease: 'power3.inOut' });
    });
  });

  /* ─────────────────────────────────
     MAP PINS — interactive tooltip
  ───────────────────────────────── */
  const pins = [
    { id:'pinMumbai',     tip:'Mumbai HQ — Our headquarters & sourcing hub' },
    { id:'pinBangladesh', tip:'Bangladesh — 2M+ units/month knitwear & woven' },
    { id:'pinSEAsia',     tip:'South East Asia — AOP printing & embroidery' },
    { id:'pinIndia',      tip:'India — Premium cotton & artisan garments' }
  ];
  pins.forEach(({ id, tip }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.style.cursor = 'pointer';
    el.addEventListener('mouseenter', () => {
      gsap.to(el, { scale:1.15, duration:0.25, ease:'power2.out', transformOrigin:'center' });
    });
    el.addEventListener('mouseleave', () => {
      gsap.to(el, { scale:1, duration:0.2, ease:'power2.in', transformOrigin:'center' });
    });
  });

  /* ─────────────────────────────────
     FACTORY CARDS — number animation
  ───────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#factories',
    start: 'top 70%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.factory-cap-num').forEach(el => {
        const txt = el.textContent;
        const num = parseFloat(txt.replace(/[^0-9.]/g,''));
        const suffix = txt.replace(/[0-9.]/g,'');
        gsap.from({ v:0 }, {
          v: num,
          duration: 2,
          delay: 0.6,
          ease: 'power2.out',
          onUpdate: function() {
            const val = this.targets()[0].v;
            el.textContent = (val >= 1 ? val.toFixed(0) : val.toFixed(1)) + suffix;
          }
        });
      });
    }
  });

  /* ─────────────────────────────────
     SECTION ENTRANCE — red lines
  ───────────────────────────────── */
  gsap.utils.toArray('.red-line').forEach(line => {
    gsap.from(line, {
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: line, start: 'top 85%', once: true }
    });
  });

  /* ─────────────────────────────────
     TICKER — pause on hover
  ───────────────────────────────── */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    const tickerWrap = document.querySelector('.ticker-wrap');
    tickerWrap.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    tickerWrap.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  }

  /* ─────────────────────────────────
     SCROLL PROGRESS indicator (thin
     red bar at top of page)
  ───────────────────────────────── */
  const progressBar = document.createElement('div');
  progressBar.style.cssText = `
    position:fixed; top:0; left:0; height:3px;
    background:#E30613; z-index:9999;
    width:0%; transition:width 0.1s linear;
    pointer-events:none;
  `;
  document.body.appendChild(progressBar);
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ─────────────────────────────────
     EXPERTISE CARDS — stagger on
     section enter (additional pop)
  ───────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#expertise',
    start: 'top 65%',
    once: true,
    onEnter: () => {
      gsap.from('.expertise-number', {
        opacity: 0, scale: 0.5,
        duration: 0.5, stagger: 0.1,
        ease: 'back.out(1.5)', delay: 0.3
      });
    }
  });

  /* ─────────────────────────────────
     FORM FIELDS — focus highlight
  ───────────────────────────────── */
  document.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('focus', () => {
      gsap.to(field, { borderColor:'#E30613', duration:0.2 });
    });
    field.addEventListener('blur', () => {
      if (!field.value.trim()) {
        gsap.to(field, { borderColor:'#E8E8E8', duration:0.2 });
      }
    });
  });

  console.log('%c FRESH‑CRAFT © 2024 — Mumbai, India ', 'background:#E30613;color:#fff;font-weight:bold;padding:6px 12px;font-size:13px;font-family:Montserrat,sans-serif;');
});

/* ─────────────────────────────────
   GLOBAL: Reset form (called from
   success state button)
───────────────────────────────── */
function resetForm() {
  const form    = document.getElementById('contactForm');
  const success = document.getElementById('formSuccess');
  const submitText   = document.getElementById('submitText');
  const submitLoader = document.getElementById('submitLoader');
  const formSubmit   = document.getElementById('formSubmit');
  if (!form || !success) return;
  success.classList.remove('show');
  form.style.display = '';
  gsap.fromTo(form, { opacity:0, y:20 }, { opacity:1, y:0, duration:0.5, ease:'power3.out' });
  form.querySelectorAll('input,textarea,select').forEach(f => { f.value = ''; });
  if (submitText)   submitText.style.display   = 'inline';
  if (submitLoader) submitLoader.style.display = 'none';
  if (formSubmit)   formSubmit.disabled = false;
}
