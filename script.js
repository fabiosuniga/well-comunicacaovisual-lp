/* ==========================================================================
   SCRIPT.JS — Well Comunicação Visual 3D (Bragança Paulista - SP)
   Interatividade: Header Responsivo, Carrossel Hero, Orçamento 3D,
   Galeria Filtrável com Zoom (<dialog>) e Envio Rápido para WhatsApp
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inicializa Ícones Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Ano atual no rodapé
  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // WhatsApp Oficial da Well Comunicação Visual 3D — (19) 99650-1025
  const WHATSAPP_NUMBER = '5519996501025';

  /* ========================================================================
     2. Header Fixo e Menu Mobile Hambúrguer (Épico 1)
     ======================================================================== */
  const header = document.getElementById('header');
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  });

  mobileMenuBtn?.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    mobileMenuBtn.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mainNav?.classList.remove('open');
      mobileMenuBtn?.setAttribute('aria-expanded', 'false');
      navLinks.forEach((l) => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ========================================================================
     3. Carrossel de Destaques da Hero Section (Épico 2)
     ======================================================================== */
  const heroSlides = [
    {
      tag: 'FACHADAS & ACM',
      spec: 'Estrutura em Metalon + ACM',
      title: 'Fachadas Comerciais que Valorizam seu Negócio',
      desc: 'Revestimento em ACM, letras caixa e lonas com instalação própria e acabamento limpo.',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
      alt: 'Fachada comercial em ACM em Bragança Paulista'
    },
    {
      tag: 'PLACAS, LONAS & ADESIVOS',
      spec: 'Gráfica Rápida & Sinalização',
      title: 'Adesivos para Vitrines, Placas e Lonas Impressas',
      desc: 'Sinalização interna e externa, banners, adesivação de veículos e materiais para o seu comércio.',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
      alt: 'Adesivação de vitrine e placas comerciais'
    },
    {
      tag: 'IMPRESSÃO 3D',
      spec: 'Projetos Personalizados',
      title: 'Impressão 3D para Peças, Protótipos e Ideias',
      desc: 'Traga sua ideia ou arquivo 3D para produzirmos peças sob medida, suportes, gabaritos e brindes.',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
      alt: 'Serviço de Impressão 3D em Bragança Paulista'
    }
  ];

  let currentSlide = 0;
  const heroSlideTag = document.getElementById('heroSlideTag');
  const heroSlideSpec = document.getElementById('heroSlideSpec');
  const heroSlideImg = document.getElementById('heroSlideImg');
  const heroSlideTitle = document.getElementById('heroSlideTitle');
  const heroSlideDesc = document.getElementById('heroSlideDesc');
  const heroDots = document.querySelectorAll('.showcase-dot');
  const miniCards = document.querySelectorAll('.mini-card');

  function renderHeroSlide(index) {
    currentSlide = (index + heroSlides.length) % heroSlides.length;
    const item = heroSlides[currentSlide];

    if (heroSlideImg) {
      heroSlideImg.style.opacity = '0.35';
      setTimeout(() => {
        heroSlideImg.src = item.img;
        heroSlideImg.alt = item.alt;
        heroSlideImg.style.opacity = '1';
      }, 150);
    }
    if (heroSlideTag) heroSlideTag.textContent = item.tag;
    if (heroSlideSpec) heroSlideSpec.textContent = item.spec;
    if (heroSlideTitle) heroSlideTitle.textContent = item.title;
    if (heroSlideDesc) heroSlideDesc.textContent = item.desc;

    heroDots.forEach((dot, idx) => dot.classList.toggle('active', idx === currentSlide));
    miniCards.forEach((card, idx) => card.classList.toggle('active', idx === currentSlide));
  }

  document.getElementById('heroPrevBtn')?.addEventListener('click', () => {
    renderHeroSlide(currentSlide - 1);
  });

  document.getElementById('heroNextBtn')?.addEventListener('click', () => {
    renderHeroSlide(currentSlide + 1);
  });

  heroDots.forEach((dot) => {
    dot.addEventListener('click', () => renderHeroSlide(Number(dot.dataset.slide)));
  });

  miniCards.forEach((card) => {
    card.addEventListener('click', () => renderHeroSlide(Number(card.dataset.slide)));
  });

  setInterval(() => {
    renderHeroSlide(currentSlide + 1);
  }, 6500);

  /* ========================================================================
     4. Seção de Impressão 3D — Envio Prático para WhatsApp (Épico 4.4)
     ======================================================================== */
  const dropzone3d = document.getElementById('dropzone3d');
  const quick3dInput = document.getElementById('quick3dInput');
  const quick3dPreview = document.getElementById('quick3dPreview');
  const quick3dFileName = document.getElementById('quick3dFileName');
  const quick3dFileSize = document.getElementById('quick3dFileSize');
  const removeQuick3dBtn = document.getElementById('removeQuick3dBtn');
  const send3dToWhatsappBtn = document.getElementById('send3dToWhatsappBtn');
  const tech3dNote = document.getElementById('tech3dNote');

  let selected3dFile = null;

  function formatBytes(bytes) {
    if (!bytes) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
  }

  function handle3dFileSelect(file) {
    if (!file) return;
    selected3dFile = file;
    if (quick3dFileName) quick3dFileName.textContent = file.name;
    if (quick3dFileSize) {
      quick3dFileSize.textContent = `${formatBytes(file.size)} • Pronto para enviar no WhatsApp`;
    }
    if (quick3dPreview) quick3dPreview.hidden = false;
  }

  quick3dInput?.addEventListener('change', (e) => {
    const file = e.target.files?.[0];
    if (file) handle3dFileSelect(file);
  });

  if (dropzone3d) {
    ['dragenter', 'dragover'].forEach((evtName) => {
      dropzone3d.addEventListener(evtName, (e) => {
        e.preventDefault();
        dropzone3d.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach((evtName) => {
      dropzone3d.addEventListener(evtName, (e) => {
        e.preventDefault();
        dropzone3d.classList.remove('dragover');
      });
    });

    dropzone3d.addEventListener('drop', (e) => {
      const file = e.dataTransfer?.files?.[0];
      if (file) handle3dFileSelect(file);
    });
  }

  removeQuick3dBtn?.addEventListener('click', () => {
    selected3dFile = null;
    if (quick3dInput) quick3dInput.value = '';
    if (quick3dPreview) quick3dPreview.hidden = true;
  });

  send3dToWhatsappBtn?.addEventListener('click', () => {
    const note = tech3dNote?.value.trim();
    const parts = ['Olá! Gostaria de um orçamento para Impressão 3D.'];

    if (selected3dFile) {
      parts.push(`Tenho o arquivo/referência: ${selected3dFile.name} (${formatBytes(selected3dFile.size)}).`);
    }
    if (note) {
      parts.push(`Detalhes: ${note}`);
    }

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(parts.join(' '))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });

  /* ========================================================================
     5. Galeria Filtrável + Modal / Zoom de Fotos (Épico 6)
     ======================================================================== */
  const portfolioData = {
    1: {
      category: 'FACHADAS & ACM',
      title: 'Fachada Comercial em ACM',
      description:
        'Revestimento de fachada comercial em chapas de ACM com subestrutura em metalon reforçado, letras caixa em relevo e excelente durabilidade para ambientes externos.',
      service: 'Fachadas & Revestimentos em ACM',
      materials: 'ACM (Alumínio Composto), Estrutura em Metalon e Letra Caixa',
      img: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=85',
      whatsappText: 'Olá! Vi na galeria do site e gostaria de um orçamento para Fachada em ACM.'
    },
    2: {
      category: 'ADESIVOS & VITRINES',
      title: 'Adesivação de Vitrine Comercial',
      description:
        'Aplicação de adesivos personalizados em vinil de corte e impressão digital para vitrines de lojas, portas de vidro e divulgação de promoções.',
      service: 'Adesivos & Aplicação',
      materials: 'Vinil Adesivo Impresso e Recorte Eletrônico',
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=85',
      whatsappText: 'Olá! Gostaria de um orçamento para Adesivos de Vitrine.'
    },
    3: {
      category: 'PLACAS & LONAS',
      title: 'Placas de Identificação em Acrílico e PVC',
      description:
        'Confecção de placas de sinalização interna e externa para identificar salas, consultórios, clínicas e comércios em geral com acabamento limpo.',
      service: 'Placas & Sinalização',
      materials: 'Acrílico, PVC, PS ou Alumínio com Adesivo Vinil',
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=85',
      whatsappText: 'Olá! Gostaria de um orçamento para Placas de Identificação/Sinalização.'
    },
    4: {
      category: 'IMPRESSÃO 3D',
      title: 'Protótipos & Peças Sob Medida em Impressão 3D',
      description:
        'Produção de peças personalizadas, protótipos, gabaritos, suportes, chaveiros e itens sob medida a partir do seu arquivo 3D ou da sua ideia.',
      service: 'Impressão 3D',
      materials: 'Impressão 3D de Alta Precisão',
      img: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=85',
      whatsappText: 'Olá! Gostaria de um orçamento para Impressão 3D.'
    },
    5: {
      category: 'ADESIVOS & VITRINES',
      title: 'Identificação de Veículos e Frota',
      description:
        'Adesivação de carros, utilitários e veículos comerciais com a marca e o telefone da sua empresa, utilizando vinil resistente ao sol e à chuva.',
      service: 'Adesivação de Veículos',
      materials: 'Vinil Automotivo de Alta Fixação',
      img: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1000&q=85',
      whatsappText: 'Olá! Gostaria de um orçamento para Adesivação de Veículo.'
    },
    6: {
      category: 'PLACAS & LONAS',
      title: 'Lonas Impressas, Faixas e Banners',
      description:
        'Impressão de lonas para fachadas esticadas em quadro de metalon, faixas comerciais, banners com bastão e corda ou acabamento com ilhós.',
      service: 'Placas & Lonas (Gráfica & Sinalização)',
      materials: 'Lona Impressa de Alta Resistência, Ilhós e Estrutura em Metalon',
      img: 'https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=1000&q=85',
      whatsappText: 'Olá! Gostaria de um orçamento para Lonas ou Banners.'
    }
  };

  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterButtons.forEach((b) => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      portfolioItems.forEach((item) => {
        const category = item.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // Modal Lightbox (<dialog>)
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  portfolioItems.forEach((item) => {
    item.addEventListener('click', () => {
      const id = item.getAttribute('data-project-id');
      const data = portfolioData[id];
      if (!data || !projectModal) return;

      document.getElementById('modalProjectImg').src = data.img;
      document.getElementById('modalProjectImg').alt = data.title;
      document.getElementById('modalProjectCategory').textContent = data.category;
      document.getElementById('modalProjectTitle').textContent = data.title;
      document.getElementById('modalProjectDescription').textContent = data.description;
      document.getElementById('modalProjectService').textContent = data.service;
      document.getElementById('modalProjectMaterials').textContent = data.materials;

      if (modalWhatsappBtn) {
        modalWhatsappBtn.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(data.whatsappText)}`;
      }

      projectModal.showModal();
    });
  });

  closeModalBtn?.addEventListener('click', () => projectModal?.close());

  projectModal?.addEventListener('click', (e) => {
    const rect = projectModal.getBoundingClientRect();
    const clickedOutside =
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom;
    if (clickedOutside) projectModal.close();
  });

  /* ========================================================================
     6. Formulário de Contato & Orçamento por E-mail (welltoldosefachadas@gmail.com)
     ======================================================================== */
  const emailQuoteForm = document.getElementById('emailQuoteForm');
  const clientPhoneInput = document.getElementById('clientPhone');
  const RECIPIENT_EMAIL = 'welltoldosefachadas@gmail.com';

  // Máscara leve de Telefone
  clientPhoneInput?.addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '').slice(0, 11);
    if (v.length > 2) v = `(${v.slice(0, 2)}) ${v.slice(2)}`;
    if (v.length > 10) v = `${v.slice(0, 10)}-${v.slice(10)}`;
    e.target.value = v;
  });

  emailQuoteForm?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('clientName')?.value.trim();
    const email = document.getElementById('clientEmail')?.value.trim();
    const phone = document.getElementById('clientPhone')?.value.trim();
    const service = document.getElementById('serviceType')?.value;
    const message = document.getElementById('serviceMessage')?.value.trim();
    const accessKey = document.getElementById('webformsAccessKey')?.value.trim();
    const errorEl = document.getElementById('quoteFormError');
    const successEl = document.getElementById('quoteFormSuccess');
    const submitBtn = document.getElementById('submitQuoteBtn');

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');

    if (!name || !emailValid || !phone || !message) {
      if (errorEl) errorEl.hidden = false;
      if (successEl) successEl.hidden = true;
      return;
    }
    if (errorEl) errorEl.hidden = true;

    // Se a chave do Web3Forms já estiver preenchida, envia via API Web3Forms
    if (accessKey) {
      try {
        if (submitBtn) submitBtn.disabled = true;
        const formData = new FormData(emailQuoteForm);
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        if (res.ok) {
          if (successEl) {
            successEl.textContent = 'Orçamento enviado com sucesso! Responderemos em breve.';
            successEl.hidden = false;
          }
          emailQuoteForm.reset();
          return;
        }
      } catch {
        // Fallback para mailto abaixo caso ocorra erro de rede
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    }

    // Envio direto para welltoldosefachadas@gmail.com (pronto para Web Forms)
    const subject = `Orçamento - ${service} (${name})`;
    const body = [
      'Olá, equipe Well Comunicação Visual 3D!',
      '',
      `Nome / Comércio: ${name}`,
      `E-mail: ${email}`,
      `Telefone / WhatsApp: ${phone}`,
      `Serviço Procurado: ${service}`,
      '',
      'Detalhes do Pedido:',
      message
    ].join('\n');

    if (successEl) {
      successEl.textContent = 'Abrindo seu aplicativo de e-mail para envio a welltoldosefachadas@gmail.com...';
      successEl.hidden = false;
    }

    window.location.href = `mailto:${RECIPIENT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ========================================================================
     7. Efeito Scroll Reveal (Elementos Aparecendo ao Rolar a Página)
     ======================================================================== */
  const revealGroups = [
    { selector: '.hero-content', variant: 'reveal-left', stagger: 0 },
    { selector: '.hero-showcase', variant: 'reveal-right', stagger: 120 },
    { selector: '.section-header', variant: '', stagger: 0 },
    { selector: '.solution-card', variant: '', stagger: 130 },
    { selector: '.tech-3d-content', variant: 'reveal-left', stagger: 0 },
    { selector: '.tech-3d-uploader-card', variant: 'reveal-right', stagger: 140 },
    { selector: '.portfolio-filters', variant: '', stagger: 0 },
    { selector: '.portfolio-item', variant: '', stagger: 90 },
    { selector: '.loc-card', variant: 'reveal-left', stagger: 110 },
    { selector: '.location-map-wrap', variant: 'reveal-left', stagger: 200 },
    { selector: '.quick-quote-card', variant: 'reveal-right', stagger: 140 },
    { selector: '.footer-grid > div', variant: '', stagger: 100 }
  ];

  const allRevealElements = [];

  revealGroups.forEach(({ selector, variant, stagger }) => {
    const elements = document.querySelectorAll(selector);
    elements.forEach((el, index) => {
      el.classList.add('reveal-on-scroll');
      if (variant) el.classList.add(variant);
      if (stagger > 0) {
        el.style.setProperty('--reveal-delay', `${index * stagger}ms`);
      }
      allRevealElements.push(el);
    });
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add('reveal-visible');
            setTimeout(() => {
              el.style.removeProperty('--reveal-delay');
            }, 900);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -45px 0px'
      }
    );

    allRevealElements.forEach((el) => revealObserver.observe(el));
  } else {
    allRevealElements.forEach((el) => el.classList.add('reveal-visible'));
  }
});
