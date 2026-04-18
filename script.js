/* ══════════════════════════════════════════════════════════════
   CONNECTION USA — SCRIPTS
══════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── SCROLL REVEAL ─── */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });
  reveals.forEach(el => revealObserver.observe(el));


  /* ─── FAQ ACCORDION ─── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');

      // Fecha todos
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Abre o clicado (se não estava aberto)
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ─── NAVBAR — efeito ao rolar ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(10, 15, 20, 0.97)';
      navbar.style.borderBottomColor = 'rgba(59, 130, 246, 0.18)';
    } else {
      navbar.style.background = 'rgba(10, 15, 20, 0.85)';
      navbar.style.borderBottomColor = 'rgba(59, 130, 246, 0.10)';
    }
  });


  /* ─── MENU MOBILE (hamburger) ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Fecha ao clicar em um link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ─── SMOOTH SCROLL em âncoras ─── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80; // altura da navbar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});


/* ─── ESTILOS DO MENU MOBILE (injetado via JS para não poluir o CSS) ─── */
const mobileMenuStyle = document.createElement('style');
mobileMenuStyle.textContent = `
  @media (max-width: 768px) {
    .nav-links.mobile-open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 73px;
      left: 0;
      right: 0;
      background: rgba(10, 15, 20, 0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(59,130,246,0.15);
      padding: 24px 5% 32px;
      gap: 20px;
      z-index: 99;
    }
    .nav-links.mobile-open a {
      font-size: 1rem;
      padding: 4px 0;
    }
    .nav-links.mobile-open .nav-cta {
      align-self: flex-start;
      margin-top: 8px;
    }
  }
`;
document.head.appendChild(mobileMenuStyle);