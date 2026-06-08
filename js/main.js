/* ================================================
   FRESH-CRAFT WEBSITE — MAIN JAVASCRIPT
   Navbar locked via flex layout (#site shell).
   All scrolling happens inside #scrollArea.
   GSAP + ScrollTrigger scoped to #scrollArea.
================================================ */

/* ─────────────────────────────────
   SMOOTH NAV SCROLL
   Scrolls #scrollArea to the target
   section, accounting for no offset
   (nav is outside the scroll container)
───────────────────────────────── */
function navTo(id) {
  const SA  = document.getElementById('scrollArea');
  const el  = document.getElementById(id);
  if (!SA || !el) return;
  SA.scrollTo({ top: el.offsetTop, behavior: 'smooth' });
}

/* ─────────────────────────────────
   RESET FORM (called from success)
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
  gsap.fromTo(form, { opacity:0, y:16 }, { opacity:1, y:0, duration:0.45, ease:'power3.out' });
  form.querySelectorAll('input,textarea,select').forEach(f => f.value = '');
  if (submitText)   submitText.style.display   = 'inline';
  if (submitLoader) submitLoader.style.display = 'none';
  if (formSubmit)   formSubmit.disabled = false;
}

document.addEventListener('DOMContentLoaded', () => {

  gsap.registerPlugin(ScrollTrigger);

  const SA = document.getElementById('scrollArea');

  /* ─────────────────────────────────
     ScrollTrigger: use #scrollArea
     as the scroll container
  ───────────────────────────────── */
  ScrollTrigger.defaults({ scroller: SA });
  ScrollTrigger.scrollerProxy(SA, {
    scrollTop(value) {
      if (arguments.length) SA.scrollTop = value;
      return SA.scrollTop;
    },
    getBoundingClientRect() {
      return { top:0, left:0, width:SA.clientWidth, height:SA.clientHeight };
    },
    pinType: SA.style.transform ? 'transform' : 'fixed'
  });
  SA.addEventListener('scroll', ScrollTrigger.update, { passive: true });

  /* ─────────────────────────────────
     PROGRESS BAR
  ───────────────────────────────── */
  const prog = document.getElementById('scrollProgress');
  SA.addEventListener('scroll', () => {
    const pct = (SA.scrollTop / (SA.scrollHeight - SA.clientHeight)) * 100;
    if (prog) prog.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ─────────────────────────────────
     NAV ANCHOR LINKS
     (a[href="#section"] clicks)
  ───────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') { navTo('hero'); e.preventDefault(); return; }
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      SA.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
      // Close mobile menu
      document.getElementById('hamburger')?.classList.remove('active');
      document.getElementById('navLinks')?.classList.remove('open');
    });
  });

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
  }

  /* ─────────────────────────────────
     HERO ENTRANCE TIMELINE
  ───────────────────────────────── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('#heroBadge',        { opacity:0, y:-24, duration:0.6 })
    .from('.hero-headline',    { opacity:0, y:48,  duration:0.85 }, '-=0.35')
    .from('.hero-subheading',  { opacity:0, y:32,  duration:0.65 }, '-=0.45')
    .from('.hero-ctas',        { opacity:0, y:24,  duration:0.55 }, '-=0.4')
    .from('.hero-stats',       { opacity:0, y:20,  duration:0.5  }, '-=0.35')
    .from('#heroIllustration', { opacity:0, x:60,  duration:0.9  }, '-=0.7')
    .from('#deco1,#deco2,#deco3,#deco4', {
        opacity:0, scale:0, duration:0.5, stagger:0.12, transformOrigin:'center'
      }, '-=0.5')
    .from('#child1', { opacity:0, y:40, duration:0.7 }, '-=0.7')
    .from('#child2', { opacity:0, y:40, duration:0.7 }, '-=0.55')
    .from('#child3', { opacity:0, y:40, duration:0.7 }, '-=0.55')
    .from('.hero-float-shape', { opacity:0, scale:0, duration:0.6, stagger:0.15 }, '-=0.4');

  /* ─────────────────────────────────
     CHILDREN IDLE BOUNCE
  ───────────────────────────────── */
  gsap.to('#child1', { y:-10, duration:3.2, yoyo:true, repeat:-1, ease:'sine.inOut', delay:0.5 });
  gsap.to('#child2', { y:-14, duration:2.8, yoyo:true, repeat:-1, ease:'sine.inOut', delay:1.0 });
  gsap.to('#child3', { y:-8,  duration:3.6, yoyo:true, repeat:-1, ease:'sine.inOut', delay:0.2 });

  /* ─────────────────────────────────
     HERO STAT COUNTERS
  ───────────────────────────────── */
  const counterData = [
    { sel: '.hero-stat-value:nth-child(1)', target: 15 },
    { sel: '.hero-stat-value:nth-child(3)', target: 50 },
    { sel: '.hero-stat-value:nth-child(5)', target: 30 }
  ];
  document.querySelectorAll('.hero-stat-value').forEach((el, i) => {
    const target = [15, 50, 30][i];
    if (target === undefined) return;
    const suf = el.querySelector('span') ? el.querySelector('span').outerHTML : '';
    gsap.from({ val: 0 }, {
      val: target, duration: 2.2, delay: 1.4 + i * 0.2, ease: 'power2.out',
      onUpdate: function() {
        el.innerHTML = Math.round(this.targets()[0].val) + suf;
      }
    });
  });

  /* ─────────────────────────────────
     SCROLL REVEAL — fade up
  ───────────────────────────────── */
  document.querySelectorAll('.gsap-fade-up').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--delay') || '0');
    gsap.to(el, {
      opacity:1, y:0, duration:0.85, delay, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 85%', once:true }
    });
  });

  /* fade left */
  document.querySelectorAll('.gsap-fade-left').forEach(el => {
    gsap.to(el, {
      opacity:1, x:0, duration:0.9, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 82%', once:true }
    });
  });

  /* fade right */
  document.querySelectorAll('.gsap-fade-right').forEach(el => {
    gsap.to(el, {
      opacity:1, x:0, duration:0.9, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 82%', once:true }
    });
  });

  /* scale */
  document.querySelectorAll('.gsap-scale').forEach(el => {
    const delay = parseFloat(el.style.getPropertyValue('--delay') || '0');
    gsap.to(el, {
      opacity:1, scale:1, y:0, duration:0.7, delay, ease:'power3.out',
      scrollTrigger: { trigger:el, start:'top 86%', once:true }
    });
  });

  /* ─────────────────────────────────
     RED DIVIDER BARS — scale in
  ───────────────────────────────── */
  document.querySelectorAll('.divider').forEach(line => {
    gsap.from(line, {
      scaleX:0, transformOrigin:'left center', duration:0.7, ease:'power3.out',
      scrollTrigger: { trigger:line, start:'top 87%', once:true }
    });
  });

  /* ─────────────────────────────────
     EXPERTISE CARD — icon hover
  ───────────────────────────────── */
  document.querySelectorAll('.expertise-card').forEach(card => {
    const icon = card.querySelector('.expertise-icon-wrap');
    card.addEventListener('mouseenter', () =>
      gsap.to(icon, { scale:1.12, duration:0.22, yoyo:true, repeat:1 }));
  });

  /* ─────────────────────────────────
     PRODUCT CARD — ripple on click
  ───────────────────────────────── */
  document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      const rect   = card.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.4);
        width:10px; height:10px;
        left:${e.clientX - rect.left - 5}px;
        top:${e.clientY - rect.top - 5}px;
        pointer-events:none; z-index:10;
      `;
      card.appendChild(ripple);
      gsap.to(ripple, {
        width:300, height:300, x:'-50%', y:'-50%', opacity:0, duration:0.7, ease:'power2.out',
        onComplete: () => ripple.remove()
      });
    });
  });

  /* ─────────────────────────────────
     SUSTAINABILITY BADGE — spin
  ───────────────────────────────── */
  document.querySelectorAll('.sustain-badge').forEach(badge => {
    const icon = badge.querySelector('.sustain-badge-icon');
    badge.addEventListener('mouseenter', () =>
      gsap.to(icon, { rotation:360, duration:0.6, ease:'power2.inOut' }));
    badge.addEventListener('mouseleave', () =>
      gsap.to(icon, { rotation:0,   duration:0.4, ease:'power2.out' }));
  });

  /* ─────────────────────────────────
     WORLD MAP PARALLAX
  ───────────────────────────────── */
  gsap.to('#worldMap', {
    y: -28, ease:'none',
    scrollTrigger: {
      trigger:'#about', start:'top bottom', end:'bottom top', scrub:1.5
    }
  });

  /* ─────────────────────────────────
     FACTORY CARDS — staggered reveal
  ───────────────────────────────── */
  gsap.utils.toArray('.factory-card').forEach((card, i) => {
    gsap.from(card, {
      opacity:0, y:60, duration:0.8, delay: i * 0.15, ease:'power3.out',
      scrollTrigger: { trigger:'#factories', start:'top 72%', once:true }
    });
  });

  /* ─────────────────────────────────
     FACTORY CAPACITY COUNTERS
  ───────────────────────────────── */
  ScrollTrigger.create({
    trigger: '#factories', start:'top 72%', once:true,
    onEnter: () => {
      document.querySelectorAll('.factory-cap-num').forEach(el => {
        const raw    = el.textContent;
        const num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
        const suffix = raw.replace(/[0-9.]/g, '');
        gsap.from({ v:0 }, {
          v: num, duration:2, delay:0.6, ease:'power2.out',
          onUpdate: function() {
            const v = this.targets()[0].v;
            el.textContent = (v >= 1 ? v.toFixed(0) : v.toFixed(1)) + suffix;
          }
        });
      });
    }
  });

  /* ─────────────────────────────────
     SUSTAIN CALLOUT SLIDE
  ───────────────────────────────── */
  gsap.from('.sustain-callout', {
    opacity:0, x:-60, duration:0.9, ease:'power3.out',
    scrollTrigger: { trigger:'.sustain-callout', start:'top 87%', once:true }
  });

  /* ─────────────────────────────────
     TICKER — pause on hover
  ───────────────────────────────── */
  const ticker     = document.querySelector('.ticker-track');
  const tickerWrap = document.querySelector('.ticker-wrap');
  if (ticker && tickerWrap) {
    tickerWrap.addEventListener('mouseenter', () => ticker.style.animationPlayState = 'paused');
    tickerWrap.addEventListener('mouseleave', () => ticker.style.animationPlayState = 'running');
  }

  /* ─────────────────────────────────
     CTA BUTTON RIPPLE
  ───────────────────────────────── */
  document.querySelectorAll('.btn-primary').forEach(btn => {
    btn.addEventListener('click', function(e) {
      if (this.id === 'formSubmit') return;
      const rect   = btn.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position:absolute; border-radius:50%;
        background:rgba(255,255,255,0.3);
        width:6px; height:6px;
        left:${e.clientX - rect.left - 3}px;
        top:${e.clientY - rect.top - 3}px;
        pointer-events:none; z-index:10;
      `;
      btn.appendChild(ripple);
      gsap.to(ripple, {
        width:200, height:200, x:'-50%', y:'-50%', opacity:0, duration:0.65, ease:'power2.out',
        onComplete: () => ripple.remove()
      });
    });
  });

  /* ─────────────────────────────────
     FORM SUBMIT + CONFETTI
  ───────────────────────────────── */
  const formSubmit = document.getElementById('formSubmit');
  if (formSubmit) formSubmit.addEventListener('click', handleFormSubmit);

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
          onComplete: () => field.style.borderColor = '#E8E8E8' });
        valid = false;
      } else {
        field.style.borderColor = '#E8E8E8';
      }
    });
    if (!valid) return;

    const submitText   = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    if (submitText)   submitText.style.display   = 'none';
    if (submitLoader) submitLoader.style.display = 'inline';
    formSubmit.disabled = true;
    gsap.to(formSubmit, { scale:0.97, duration:0.15, yoyo:true, repeat:1 });

    setTimeout(() => {
      const form    = document.getElementById('contactForm');
      const success = document.getElementById('formSuccess');
      if (!form || !success) return;
      gsap.to(form, { opacity:0, y:-20, duration:0.4, ease:'power2.in', onComplete:() => {
        form.style.display = 'none';
        success.classList.add('show');
        gsap.from('.success-icon',  { scale:0,    duration:0.5, ease:'back.out(1.8)', delay:0.1 });
        gsap.from('.success-title', { opacity:0, y:20, duration:0.5, delay:0.3 });
        gsap.from('.success-text',  { opacity:0, y:15, duration:0.5, delay:0.45 });
      }});
      launchConfetti();
    }, 1200);
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
    for (let i = 0; i < 180; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -20 - Math.random() * 200,
        r: 4 + Math.random() * 7,
        d: 2 + Math.random() * 4,
        color: COLOURS[Math.floor(Math.random() * COLOURS.length)],
        tilt: (Math.random() * 20) - 10,
        tiltAngle: 0,
        tiltDelta: Math.random() * 0.2,
        vx: (Math.random() - 0.5) * 4,
        shape: Math.random() > 0.5 ? 'rect' : 'circle'
      });
    }
    let frame = 0;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pieces.forEach(p => {
        ctx.save();
        ctx.translate(p.x + p.tilt, p.y);
        ctx.rotate(p.tiltAngle * Math.PI / 180);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r * 1.8);
        else { ctx.beginPath(); ctx.arc(0, 0, p.r, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
        p.y          += p.d;
        p.x          += p.vx;
        p.tiltAngle  += p.tiltDelta;
        p.d          += 0.05;
        if (p.y > canvas.height + 20) {
          p.y = -20; p.x = Math.random() * canvas.width; p.d = 2 + Math.random() * 3;
        }
      });
      frame++;
      if (frame < 220) requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    draw();
  }

  /* ─────────────────────────────────
     FORM FIELD FOCUS HIGHLIGHT
  ───────────────────────────────── */
  document.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('focus', () =>
      gsap.to(field, { borderColor:'#E30613', duration:0.2 }));
    field.addEventListener('blur', () => {
      if (!field.value.trim())
        gsap.to(field, { borderColor:'#E8E8E8', duration:0.2 });
    });
  });

  console.log('%c FRESH‑CRAFT © 2024 — Mumbai, India ', 'background:#E30613;color:#fff;font-weight:bold;padding:6px 12px;font-size:13px;font-family:Montserrat,sans-serif;');
});
