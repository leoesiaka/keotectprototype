(() => {
  'use strict';
  document.documentElement.classList.add('js');

  const menuToggle = document.querySelector('[data-menu-toggle]');
  const mobileNav = document.querySelector('[data-menu-panel]');

  const closeMenu = () => {
    if (!menuToggle || !mobileNav) return;
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('open');
    document.body.classList.remove('menu-open');
  };

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', () => {
      const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(willOpen));
      mobileNav.classList.toggle('open', willOpen);
      document.body.classList.toggle('menu-open', willOpen);
    });

    mobileNav.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Keep the current page visible in both desktop and mobile navigation.
  const page = document.body.dataset.page;
  if (page) {
    document.querySelectorAll(`[data-page-link="${page}"]`).forEach((link) => {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    });
  }

  // Subtle reveal motion, with a visible fallback when IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  // Project portfolio filters.
  const filterButtons = document.querySelectorAll('[data-filter]');
  const projectCards = document.querySelectorAll('[data-category]');
  if (filterButtons.length && projectCards.length) {
    filterButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        filterButtons.forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
        projectCards.forEach((card) => {
          const categories = (card.dataset.category || '').split(' ');
          card.hidden = filter !== 'all' && !categories.includes(filter);
        });
      });
    });
  }

  // Static-site contact form: prepare a complete email draft in the visitor's email app.
  // No message is claimed to be delivered; a backend can replace this handler later.
  document.querySelectorAll('[data-mailto-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const values = new FormData(form);
      const subject = `Project enquiry — ${values.get('projectType') || 'Kaotech website'}`;
      const lines = [
        `Name: ${values.get('name') || ''}`,
        `Company: ${values.get('company') || 'Not provided'}`,
        `Email: ${values.get('email') || ''}`,
        `Phone: ${values.get('phone') || 'Not provided'}`,
        `Project type: ${values.get('projectType') || 'Not specified'}`,
        `Location: ${values.get('location') || 'Not provided'}`,
        `Timeline: ${values.get('timeline') || 'Not specified'}`,
        `Current stage: ${values.get('stage') || 'Not specified'}`,
        '',
        'Project details:',
        values.get('message') || ''
      ];
      const mailto = `mailto:info@kaotechdesigns.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      const status = form.querySelector('[data-form-status]');
      if (status) {
        status.textContent = 'Your email app should open with the enquiry details ready to send. If it does not, email info@kaotechdesigns.com directly.';
      }
      window.location.href = mailto;
    });
  });

  // Back-to-top button.
  const backTop = document.querySelector('[data-back-top]');
  if (backTop) {
    const updateBackTop = () => backTop.classList.toggle('visible', window.scrollY > 480);
    window.addEventListener('scroll', updateBackTop, { passive: true });
    updateBackTop();
    backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
  // Service enquiry pop-ups. Each button opens the same form with its service preselected.
  const serviceDirectory = {
    fuel: {
      kicker: '01 / Downstream infrastructure',
      title: 'Fuel Station Design & Approval',
      formValue: 'Fuel station design & approval',
      intro: 'Develop a retail, mega or modular fuel station with a connected engineering scope covering site layout, technical design, documentation, approval coordination and construction support.'
    },
    'tank-farm': {
      kicker: '02 / Storage & midstream',
      title: 'Tank Farm Engineering',
      formValue: 'Tank farm engineering',
      intro: 'Plan, upgrade or improve petroleum storage facilities with engineering support for tanks, pipelines, process documentation, fire protection, containment, safety and automation.'
    },
    water: {
      kicker: '03 / Water & environment',
      title: 'Water Treatment Infrastructure',
      formValue: 'Water treatment infrastructure',
      intro: 'Design water and wastewater systems around process requirements, water quality, hydraulic performance, operating reliability and environmental considerations.'
    },
    energy: {
      kicker: '04 / Energy & utilities',
      title: 'Energy Infrastructure & Utilities',
      formValue: 'Energy infrastructure & utilities',
      intro: 'Connect electrical, instrumentation, control and automation disciplines to support safe, maintainable and visible industrial and energy assets.'
    },
    'project-management': {
      kicker: '05 / Project delivery',
      title: 'Project Management & Technical Supervision',
      formValue: 'Project management & technical supervision',
      intro: 'Keep design, procurement, construction and commissioning coordinated through clear planning, technical oversight and disciplined project controls.'
    },
    specialist: {
      kicker: '06 / Specialist advisory & digital',
      title: 'Engineering Intelligence & Digital Solutions',
      formValue: 'Engineering intelligence & digital solutions',
      intro: 'Make stronger investment decisions before capital is committed and gain clearer operational visibility through site assessment, digital monitoring and integrated data tools.'
    }
  };

  const serviceDialog = document.querySelector('[data-service-modal]');
  if (serviceDialog) {
    const kicker = serviceDialog.querySelector('[data-service-kicker]');
    const title = serviceDialog.querySelector('[data-service-title]');
    const intro = serviceDialog.querySelector('[data-service-intro]');
    const scopeSelect = serviceDialog.querySelector('[data-service-scope]');

    const updateServiceHeading = (service) => {
      kicker.textContent = service.kicker;
      title.textContent = service.title;
      intro.textContent = service.intro;
    };

    document.querySelectorAll('[data-service-open]').forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const service = serviceDirectory[trigger.dataset.serviceOpen];
        if (!service) return;
        updateServiceHeading(service);
        if (scopeSelect) scopeSelect.value = service.formValue;
        if (typeof serviceDialog.showModal === 'function') serviceDialog.showModal();
        else {
          serviceDialog.setAttribute('open', '');
          serviceDialog.classList.add('is-open');
        }
      });
    });

    if (scopeSelect) {
      scopeSelect.addEventListener('change', () => {
        const selectedService = Object.values(serviceDirectory).find((service) => service.formValue === scopeSelect.value);
        if (selectedService) updateServiceHeading(selectedService);
      });
    }

    serviceDialog.querySelectorAll('[data-service-close]').forEach((closeButton) => {
      closeButton.addEventListener('click', () => {
        if (typeof serviceDialog.close === 'function') serviceDialog.close();
        else {
          serviceDialog.removeAttribute('open');
          serviceDialog.classList.remove('is-open');
        }
      });
    });
    serviceDialog.addEventListener('click', (event) => {
      if (event.target === serviceDialog) {
        if (typeof serviceDialog.close === 'function') serviceDialog.close();
        else {
          serviceDialog.removeAttribute('open');
          serviceDialog.classList.remove('is-open');
        }
      }
    });
  }

  // Carry the selected service into the contact form when the visitor requests it.
  const serviceSelect = document.querySelector('[data-prefill-service]');
  if (serviceSelect) {
    const serviceNames = {
      fuel: 'Fuel station design & approval',
      'tank-farm': 'Tank farm engineering',
      water: 'Water treatment infrastructure',
      energy: 'Energy infrastructure & utilities',
      'project-management': 'Project management & technical supervision',
      specialist: 'FuelSync / digital solutions'
    };
    const requestedService = new URLSearchParams(window.location.search).get('service');
    const selectedName = serviceNames[requestedService];
    if (selectedName && Array.from(serviceSelect.options).some((option) => option.value === selectedName)) {
      serviceSelect.value = selectedName;
    }
  }

})();
