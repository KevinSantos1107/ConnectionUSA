/* ══════════════════════════════════════════════════════════════
   CONNECTION USA — SCRIPTS
   Inclui: scroll reveal · FAQ · navbar · mobile menu ·
           smooth scroll · sistema de tradução i18n
══════════════════════════════════════════════════════════════ */

/* ══════════════════════════════════════════════════════════════
   ► CONFIGURAÇÃO DOS VÍDEOS — edite aqui para adicionar mais
══════════════════════════════════════════════════════════════ */
const VIDEOS = [
  {
    src:      'video1.mp4',       // nome do arquivo na mesma pasta do index.html
    name:     'Germán',
    initials: 'GE',
    detail:   'Green Card Petition',
    badge:    '✅ Aprovado',
  },
  {
    src:      'video2.mp4',
    name:     'Marina.',
    initials: 'MA',
    detail:   'Green Card Petition',
    badge:    '✅ Aprovado',
  },
  {
    src:      'video3.mp4',
    name:     'Larissa & Ludmila',
    initials: 'LA',
    detail:   'Extension of Status',
    badge:    '✅ Aprovado',
  },
  // Para adicionar mais: copie um bloco acima e cole aqui ↑
];

document.addEventListener('DOMContentLoaded', () => {

  /* ══════════════════════════════════════════════════════════
     i18n — SISTEMA DE TRADUÇÃO
  ══════════════════════════════════════════════════════════ */

  const SUPPORTED_LANGS = ['pt', 'en', 'es'];
  const LANG_NAMES = { pt: 'Português', en: 'English', es: 'Español' };
  const LANG_FLAGS = { pt: '🇧🇷', en: '🇺🇸', es: '🇪🇸' };

  // Detecta o idioma do navegador
  function detectBrowserLang() {
    const browserLang = (navigator.language || navigator.userLanguage || 'pt').toLowerCase();
    if (browserLang.startsWith('pt')) return 'pt';
    if (browserLang.startsWith('es')) return 'es';
    if (browserLang.startsWith('en')) return 'en';
    return null; // desconhecido → mostra o modal
  }

  // Lê o idioma salvo
  function getSavedLang() {
    return localStorage.getItem('connectionusa_lang');
  }

  // Salva o idioma
  function saveLang(lang) {
    localStorage.setItem('connectionusa_lang', lang);
  }

  // Aplica as traduções ao DOM
  function applyTranslations(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;

    document.documentElement.lang = lang;

    // Mapeia keys de tradução → seletores CSS
    const map = [
      // NAVBAR
      ['nav_why',       '[data-i18n="nav_why"]'],
      ['nav_services',  '[data-i18n="nav_services"]'],
      ['nav_team',      '[data-i18n="nav_team"]'],
      ['nav_results',   '[data-i18n="nav_results"]'],
      ['nav_faq',       '[data-i18n="nav_faq"]'],
      ['nav_cta',       '[data-i18n="nav_cta"]'],
      // HERO
      ['hero_badge',        '[data-i18n="hero_badge"]'],
      ['hero_title_line1',  '[data-i18n="hero_title_line1"]'],
      ['hero_title_em',     '[data-i18n="hero_title_em"]'],
      ['hero_title_line2',  '[data-i18n="hero_title_line2"]'],
      ['hero_title_highlight', '[data-i18n="hero_title_highlight"]'],
      ['hero_title_end',    '[data-i18n="hero_title_end"]'],
      ['hero_sub',          '[data-i18n="hero_sub"]'],
      ['hero_cta_primary',  '[data-i18n="hero_cta_primary"]'],
      ['hero_cta_secondary','[data-i18n="hero_cta_secondary"]'],
      ['hero_trust_1',  '[data-i18n="hero_trust_1"]'],
      ['hero_trust_2',  '[data-i18n="hero_trust_2"]'],
      ['hero_trust_3',  '[data-i18n="hero_trust_3"]'],
      // PROBLEMA
      ['problem_tag',   '[data-i18n="problem_tag"]'],
      ['problem_sub',   '[data-i18n="problem_sub"]'],
      ['problem_1_title','[data-i18n="problem_1_title"]'],
      ['problem_1_desc', '[data-i18n="problem_1_desc"]'],
      ['problem_2_title','[data-i18n="problem_2_title"]'],
      ['problem_2_desc', '[data-i18n="problem_2_desc"]'],
      ['problem_3_title','[data-i18n="problem_3_title"]'],
      ['problem_3_desc', '[data-i18n="problem_3_desc"]'],
      // SERVIÇOS
      ['services_tag',  '[data-i18n="services_tag"]'],
      ['services_sub',  '[data-i18n="services_sub"]'],
      ['svc_1_title',   '[data-i18n="svc_1_title"]'],
      ['svc_1_desc',    '[data-i18n="svc_1_desc"]'],
      ['svc_1_tag1',    '[data-i18n="svc_1_tag1"]'],
      ['svc_1_tag2',    '[data-i18n="svc_1_tag2"]'],
      ['svc_2_title',   '[data-i18n="svc_2_title"]'],
      ['svc_2_desc',    '[data-i18n="svc_2_desc"]'],
      ['svc_2_tag1',    '[data-i18n="svc_2_tag1"]'],
      ['svc_2_tag2',    '[data-i18n="svc_2_tag2"]'],
      ['svc_3_title',   '[data-i18n="svc_3_title"]'],
      ['svc_3_desc',    '[data-i18n="svc_3_desc"]'],
      ['svc_3_tag1',    '[data-i18n="svc_3_tag1"]'],
      ['svc_3_tag2',    '[data-i18n="svc_3_tag2"]'],
      ['svc_4_title',   '[data-i18n="svc_4_title"]'],
      ['svc_4_desc',    '[data-i18n="svc_4_desc"]'],
      ['svc_4_tag1',    '[data-i18n="svc_4_tag1"]'],
      ['svc_4_tag2',    '[data-i18n="svc_4_tag2"]'],
      ['svc_5_title',   '[data-i18n="svc_5_title"]'],
      ['svc_5_desc',    '[data-i18n="svc_5_desc"]'],
      ['svc_5_tag1',    '[data-i18n="svc_5_tag1"]'],
      ['svc_5_tag2',    '[data-i18n="svc_5_tag2"]'],
      ['svc_6_title',   '[data-i18n="svc_6_title"]'],
      ['svc_6_desc',    '[data-i18n="svc_6_desc"]'],
      ['svc_6_tag1',    '[data-i18n="svc_6_tag1"]'],
      ['svc_6_tag2',    '[data-i18n="svc_6_tag2"]'],
      // AUTORIDADE
      ['authority_tag',          '[data-i18n="authority_tag"]'],
      ['authority_role',         '[data-i18n="authority_role"]'],
      ['authority_desc',         '[data-i18n="authority_desc"]'],
      ['authority_badge1_title', '[data-i18n="authority_badge1_title"]'],
      ['authority_badge1_desc',  '[data-i18n="authority_badge1_desc"]'],
      ['authority_badge2_title', '[data-i18n="authority_badge2_title"]'],
      ['authority_badge2_desc',  '[data-i18n="authority_badge2_desc"]'],
      ['authority_badge3_title', '[data-i18n="authority_badge3_title"]'],
      ['authority_badge3_desc',  '[data-i18n="authority_badge3_desc"]'],
      ['stat_cases',  '[data-i18n="stat_cases"]'],
      ['stat_rate',   '[data-i18n="stat_rate"]'],
      ['stat_years',  '[data-i18n="stat_years"]'],
      // DEPOIMENTOS
      ['testimonials_tag',   '[data-i18n="testimonials_tag"]'],
      ['t1_badge', '[data-i18n="t1_badge"]'], ['t1_text', '[data-i18n="t1_text"]'],
      ['t1_name',  '[data-i18n="t1_name"]'],  ['t1_detail','[data-i18n="t1_detail"]'],
      ['t2_badge', '[data-i18n="t2_badge"]'], ['t2_text', '[data-i18n="t2_text"]'],
      ['t2_name',  '[data-i18n="t2_name"]'],  ['t2_detail','[data-i18n="t2_detail"]'],
      ['t3_badge', '[data-i18n="t3_badge"]'], ['t3_text', '[data-i18n="t3_text"]'],
      ['t3_name',  '[data-i18n="t3_name"]'],  ['t3_detail','[data-i18n="t3_detail"]'],
      ['t4_badge', '[data-i18n="t4_badge"]'], ['t4_text', '[data-i18n="t4_text"]'],
      ['t4_name',  '[data-i18n="t4_name"]'],  ['t4_detail','[data-i18n="t4_detail"]'],
      ['t5_badge', '[data-i18n="t5_badge"]'], ['t5_text', '[data-i18n="t5_text"]'],
      ['t5_name',  '[data-i18n="t5_name"]'],  ['t5_detail','[data-i18n="t5_detail"]'],
      ['t6_badge', '[data-i18n="t6_badge"]'], ['t6_text', '[data-i18n="t6_text"]'],
      ['t6_name',  '[data-i18n="t6_name"]'],  ['t6_detail','[data-i18n="t6_detail"]'],
      // IDIOMAS
      ['lang_title',   '[data-i18n="lang_title"]'],
      ['lang_pt_sub',  '[data-i18n="lang_pt_sub"]'],
      ['lang_en_sub',  '[data-i18n="lang_en_sub"]'],
      ['lang_es_sub',  '[data-i18n="lang_es_sub"]'],
      // CTA
      ['cta_tag',  '[data-i18n="cta_tag"]'],
      ['cta_desc', '[data-i18n="cta_desc"]'],
      ['cta_btn',  '[data-i18n="cta_btn"]'],
      ['cta_t1',   '[data-i18n="cta_t1"]'],
      ['cta_t2',   '[data-i18n="cta_t2"]'],
      ['cta_t3',   '[data-i18n="cta_t3"]'],
      // FAQ
      ['faq_tag',   '[data-i18n="faq_tag"]'],
      ['faq_title', '[data-i18n="faq_title"]'],
      ['faq_1_q',   '[data-i18n="faq_1_q"]'], ['faq_1_a', '[data-i18n="faq_1_a"]'],
      ['faq_2_q',   '[data-i18n="faq_2_q"]'], ['faq_2_a', '[data-i18n="faq_2_a"]'],
      ['faq_3_q',   '[data-i18n="faq_3_q"]'], ['faq_3_a', '[data-i18n="faq_3_a"]'],
      ['faq_4_q',   '[data-i18n="faq_4_q"]'], ['faq_4_a', '[data-i18n="faq_4_a"]'],
      ['faq_5_q',   '[data-i18n="faq_5_q"]'], ['faq_5_a', '[data-i18n="faq_5_a"]'],
      ['faq_6_q',   '[data-i18n="faq_6_q"]'], ['faq_6_a', '[data-i18n="faq_6_a"]'],
      ['faq_7_q',   '[data-i18n="faq_7_q"]'], ['faq_7_a', '[data-i18n="faq_7_a"]'],
      // FOOTER
      ['footer_desc',      '[data-i18n="footer_desc"]'],
      ['footer_services',  '[data-i18n="footer_services"]'],
      ['footer_company',   '[data-i18n="footer_company"]'],
      ['footer_about',     '[data-i18n="footer_about"]'],
      ['footer_results',   '[data-i18n="footer_results"]'],
      ['footer_contact',   '[data-i18n="footer_contact"]'],
      ['footer_languages', '[data-i18n="footer_languages"]'],
      ['footer_copy',      '[data-i18n="footer_copy"]'],
      ['footer_disclaimer','[data-i18n="footer_disclaimer"]'],
      ['mobile_cta',       '[data-i18n="mobile_cta"]'],
    ];

    // Itens com innerHTML (suportam HTML bold/italic)
    const htmlKeys = new Set([
      'problem_title', 'services_title', 'testimonials_title',
      'cta_title', 'problem_transition', 'footer_copy', 'footer_disclaimer'
    ]);

    map.forEach(([key, selector]) => {
      const els = document.querySelectorAll(selector);
      els.forEach(el => {
        if (htmlKeys.has(key)) {
          el.innerHTML = t[key] || '';
        } else {
          el.textContent = t[key] || '';
        }
      });
    });

    // Especiais com innerHTML
    const htmlMap = [
      ['problem_title',    '[data-i18n="problem_title"]'],
      ['services_title',   '[data-i18n="services_title"]'],
      ['testimonials_title','[data-i18n="testimonials_title"]'],
      ['cta_title',        '[data-i18n="cta_title"]'],
      ['problem_transition','[data-i18n="problem_transition"]'],
    ];
    htmlMap.forEach(([key, selector]) => {
      const els = document.querySelectorAll(selector);
      els.forEach(el => { el.innerHTML = t[key] || ''; });
    });

    // Atualiza o switcher de idioma no navbar
    updateLangSwitcher(lang);
  }

  /* ── LANG SWITCHER no navbar ── */
  function buildLangSwitcher() {
    const switcher = document.createElement('div');
    switcher.className = 'lang-switcher';
    switcher.innerHTML = `
      <button class="lang-switcher-btn" aria-haspopup="listbox" aria-expanded="false">
        <span class="lang-switcher-flag"></span>
        <span class="lang-switcher-name"></span>
        <svg class="lang-switcher-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
          <path d="M2 4l4 4 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <ul class="lang-switcher-dropdown" role="listbox">
        ${SUPPORTED_LANGS.map(l => `
          <li class="lang-option" data-lang="${l}" role="option">
            <span>${LANG_FLAGS[l]}</span>
            <span>${LANG_NAMES[l]}</span>
          </li>
        `).join('')}
      </ul>
    `;

    // Insere antes do hamburger
    const hamburger = document.getElementById('hamburger');
    hamburger.parentNode.insertBefore(switcher, hamburger);

    // Toggle dropdown
    const btn = switcher.querySelector('.lang-switcher-btn');
    const dropdown = switcher.querySelector('.lang-switcher-dropdown');

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = dropdown.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen);
    });

    // Fecha ao clicar fora
    document.addEventListener('click', () => {
      dropdown.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    });

    // Seleciona idioma
    switcher.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', (e) => {
        e.stopPropagation();
        const lang = opt.dataset.lang;
        saveLang(lang);
        applyTranslations(lang);
        dropdown.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      });
    });
  }

  function updateLangSwitcher(lang) {
    const flag = document.querySelector('.lang-switcher-flag');
    const name = document.querySelector('.lang-switcher-name');
    if (flag) flag.textContent = LANG_FLAGS[lang];
    if (name) name.textContent = LANG_NAMES[lang];

    // Marca a opção ativa
    document.querySelectorAll('.lang-option').forEach(opt => {
      opt.classList.toggle('active', opt.dataset.lang === lang);
    });
  }

  /* ── MODAL de boas-vindas (primeira visita ou idioma não detectado) ── */
  function buildWelcomeModal() {
    const overlay = document.createElement('div');
    overlay.id = 'lang-modal-overlay';
    overlay.innerHTML = `
      <div class="lang-modal" role="dialog" aria-modal="true" aria-label="Select your language">
        <div class="lang-modal-logo">
          <img src="logo.png" alt="Connection USA">
          <span>Connection<span class="blue">USA</span></span>
        </div>
        <h2 class="lang-modal-title">Choose your language</h2>
        <p class="lang-modal-sub">Selecione · Select · Selecciona</p>
        <div class="lang-modal-options">
          ${SUPPORTED_LANGS.map(l => `
            <button class="lang-modal-btn" data-lang="${l}">
              <span class="modal-flag">${LANG_FLAGS[l]}</span>
              <span class="modal-lang-name">${LANG_NAMES[l]}</span>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(overlay);
    // Força reflow antes de animar
    requestAnimationFrame(() => overlay.classList.add('visible'));

    overlay.querySelectorAll('.lang-modal-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        saveLang(lang);
        applyTranslations(lang);
        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 400);
      });
    });
  }

  /* ── INICIALIZAÇÃO do sistema de idiomas ── */
  function initI18n() {
    buildLangSwitcher();

    const saved = getSavedLang();
    if (saved && SUPPORTED_LANGS.includes(saved)) {
      // Retorno: aplica direto
      applyTranslations(saved);
    } else {
      // Primeira visita: detecta ou mostra modal
      const detected = detectBrowserLang();
      if (detected) {
        // Idioma reconhecido: aplica automaticamente + mostra aviso suave
        applyTranslations(detected);
        saveLang(detected);
      } else {
        // Idioma desconhecido: mostra o modal de seleção
        applyTranslations('pt'); // fallback enquanto modal não fecha
        buildWelcomeModal();
      }
    }
  }

  initI18n();

/* ══════════════════════════════════════════════════════════════
   VIDEO CAROUSEL
══════════════════════════════════════════════════════════════ */
function initVideoCarousel() {
  const track    = document.getElementById('vcTrack');
  const dotsWrap = document.getElementById('vcDots');
  const prevBtn  = document.getElementById('vcPrev');
  const nextBtn  = document.getElementById('vcNext');
  const viewport = document.getElementById('vcViewport');
  if (!track) return;

  let current = 0;
  const total = VIDEOS.length;

  // Cria os slides
  VIDEOS.forEach((v, i) => {
    const slide = document.createElement('div');
    slide.className = 'vc-slide';
    slide.innerHTML = `
      <div class="vc-video-card">
        <div class="vc-video-wrap">
          <video src="${v.src}" controls playsinline preload="metadata"></video>
          <div class="vc-counter">${i + 1} / ${total}</div>
        </div>
        <div class="vc-info">
          <div class="vc-person">
            <div class="vc-avatar">${v.initials}</div>
            <div>
              <div class="vc-name">${v.name}</div>
              <div class="vc-detail">${v.detail}</div>
            </div>
          </div>
          <div class="vc-badge">${v.badge}</div>
        </div>
      </div>`;
    track.appendChild(slide);
  });

  // Cria os dots
  VIDEOS.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'vc-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Depoimento ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsWrap.appendChild(dot);
  });

  function goTo(index) {
    // Pausa o vídeo atual antes de trocar
    const videos = track.querySelectorAll('video');
    videos.forEach(v => v.pause());

    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;

    dotsWrap.querySelectorAll('.vc-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
  }

  prevBtn.addEventListener('click', () => { if (current > 0) goTo(current - 1); });
  nextBtn.addEventListener('click', () => { if (current < total - 1) goTo(current + 1); });

  // Suporte a swipe no mobile
  let touchX = 0;
  viewport.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
  viewport.addEventListener('touchend', e => {
    const diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 48) {
      if (diff > 0 && current < total - 1) goTo(current + 1);
      else if (diff < 0 && current > 0) goTo(current - 1);
    }
  });

  // Teclado (← →)
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft'  && current > 0)         goTo(current - 1);
    if (e.key === 'ArrowRight' && current < total - 1) goTo(current + 1);
  });

  goTo(0);
}

initVideoCarousel();

  /* ══════════════════════════════════════════════════════════
     SCROLL REVEAL
  ══════════════════════════════════════════════════════════ */
  const reveals = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => revealObserver.observe(el));


  /* ══════════════════════════════════════════════════════════
     FAQ ACCORDION
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isActive = item.classList.contains('active');
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });


  /* ══════════════════════════════════════════════════════════
     NAVBAR — efeito ao rolar
  ══════════════════════════════════════════════════════════ */
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


  /* ══════════════════════════════════════════════════════════
     MENU MOBILE (hamburger)
  ══════════════════════════════════════════════════════════ */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }


  /* ══════════════════════════════════════════════════════════
     SMOOTH SCROLL em âncoras
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

});


/* ══════════════════════════════════════════════════════════════
   ESTILOS INJETADOS — Menu mobile + Lang Switcher + Modal
══════════════════════════════════════════════════════════════ */
const injectedStyles = document.createElement('style');
injectedStyles.textContent = `

  /* ── MENU MOBILE ── */
  @media (max-width: 768px) {
    .nav-links.mobile-open {
      display: flex !important;
      flex-direction: column;
      position: fixed;
      top: 73px; left: 0; right: 0;
      background: rgba(10,15,20,0.98);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid rgba(59,130,246,0.15);
      padding: 24px 5% 32px;
      gap: 20px;
      z-index: 99;
    }
    .nav-links.mobile-open a { font-size: 1rem; padding: 4px 0; }
    .nav-links.mobile-open .nav-cta { align-self: flex-start; margin-top: 8px; }
  }

  /* ── LANG SWITCHER (navbar) ── */
  .lang-switcher {
    position: relative;
    margin-right: 8px;
  }

  .lang-switcher-btn {
    display: flex;
    align-items: center;
    gap: 6px;
    background: rgba(29,78,216,0.1);
    border: 1px solid rgba(59,130,246,0.28);
    border-radius: 8px;
    padding: 7px 12px;
    color: #CBD5E1;
    font-family: 'Figtree', system-ui, sans-serif;
    font-size: 0.82rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
    white-space: nowrap;
  }
  .lang-switcher-btn:hover {
    background: rgba(29,78,216,0.2);
    border-color: rgba(59,130,246,0.5);
    color: #fff;
  }
  .lang-switcher-flag { font-size: 1rem; line-height: 1; }
  .lang-switcher-arrow {
    color: #94A3B8;
    transition: transform 0.25s;
    flex-shrink: 0;
  }
  .lang-switcher-btn[aria-expanded="true"] .lang-switcher-arrow {
    transform: rotate(180deg);
  }

  .lang-switcher-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background: #0F172A;
    border: 1px solid rgba(59,130,246,0.22);
    border-radius: 10px;
    list-style: none;
    padding: 6px;
    min-width: 148px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.5);
    opacity: 0;
    transform: translateY(-6px) scale(0.97);
    pointer-events: none;
    transition: opacity 0.2s, transform 0.2s;
    z-index: 200;
  }
  .lang-switcher-dropdown.open {
    opacity: 1;
    transform: translateY(0) scale(1);
    pointer-events: auto;
  }

  .lang-option {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border-radius: 7px;
    cursor: pointer;
    font-family: 'Figtree', system-ui, sans-serif;
    font-size: 0.86rem;
    font-weight: 500;
    color: #CBD5E1;
    transition: background 0.15s, color 0.15s;
  }
  .lang-option:hover {
    background: rgba(29,78,216,0.18);
    color: #fff;
  }
  .lang-option.active {
    background: rgba(250,204,21,0.1);
    color: #FACC15;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .lang-switcher-name { display: none; }
    .lang-switcher-btn { padding: 7px 9px; gap: 4px; }
    .lang-switcher-dropdown { right: 0; }
  }

  /* ── MODAL DE IDIOMA (boas-vindas) ── */
  #lang-modal-overlay {
    position: fixed;
    inset: 0;
    z-index: 1000;
    background: rgba(5,10,18,0.88);
    backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
    opacity: 0;
    transition: opacity 0.35s;
  }
  #lang-modal-overlay.visible { opacity: 1; }

  .lang-modal {
    background: #0F172A;
    border: 1px solid rgba(59,130,246,0.22);
    border-radius: 20px;
    padding: 48px 40px 40px;
    max-width: 420px;
    width: 100%;
    text-align: center;
    box-shadow: 0 40px 100px rgba(0,0,0,0.6), 0 0 60px rgba(29,78,216,0.14);
    transform: translateY(16px);
    transition: transform 0.35s;
  }
  #lang-modal-overlay.visible .lang-modal { transform: translateY(0); }

  .lang-modal-logo {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 28px;
  }
  .lang-modal-logo img { width: 36px; height: 36px; object-fit: contain; }
  .lang-modal-logo span {
    font-family: 'Fraunces', Georgia, serif;
    font-weight: 800;
    font-size: 1.3rem;
    color: #fff;
  }
  .lang-modal-logo .blue { color: #3B82F6; }

  .lang-modal-title {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.5rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.03em;
    margin-bottom: 8px;
  }
  .lang-modal-sub {
    font-family: 'Figtree', system-ui, sans-serif;
    font-size: 0.82rem;
    color: #64748B;
    letter-spacing: 0.08em;
    margin-bottom: 32px;
  }

  .lang-modal-options {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .lang-modal-btn {
    display: flex;
    align-items: center;
    gap: 16px;
    background: rgba(29,78,216,0.07);
    border: 1px solid rgba(59,130,246,0.18);
    border-radius: 12px;
    padding: 16px 20px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: left;
    width: 100%;
  }
  .lang-modal-btn:hover {
    background: rgba(250,204,21,0.08);
    border-color: rgba(250,204,21,0.38);
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  }
  .modal-flag { font-size: 1.8rem; line-height: 1; }
  .modal-lang-name {
    font-family: 'Fraunces', Georgia, serif;
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
  }

  @media (max-width: 480px) {
    .lang-modal { padding: 36px 24px 32px; }
    .lang-modal-title { font-size: 1.3rem; }
  }
`;
document.head.appendChild(injectedStyles);