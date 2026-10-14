const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');

if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    nav.classList.toggle('open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuButton.setAttribute('aria-expanded', 'false');
    });
  });
}

// Revela os elementos suavemente conforme entram na tela.
const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// Atualiza o ano automaticamente.
const yearElement = document.querySelector('#year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Copia o e-mail
const copyButton = document.querySelector('.copy-email');
const emailFeedback = document.querySelector('.email-feedback');
if (copyButton && emailFeedback) {
  copyButton.addEventListener('click', async () => {
    const email = copyButton.dataset.email;
    if (!email) {
      emailFeedback.textContent = 'giovanimouradev@gmail.com';
      return;
    }
    try {
      await navigator.clipboard.writeText(email);
      emailFeedback.textContent = 'E-mail copiado!';
    } catch {
      emailFeedback.textContent = `Seu e-mail: ${email}`;
    }
  });
}

// Movimento sutil do emblema com o mouse, desativado em telas touch.
const art = document.querySelector('.hero-art');
if (art && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  art.addEventListener('mousemove', (event) => {
    const rect = art.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    const emblem = art.querySelector('.hero-emblem');
    if (emblem) {
      emblem.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 18}deg)`;
    }
  });
  art.addEventListener('mouseleave', () => {
    const emblem = art.querySelector('.hero-emblem');
    if (emblem) {
      emblem.style.transform = '';
    }
  });
}

// --- SISTEMA DE FILTROS DAS TECNOLOGIAS ---
const filterButtons = document.querySelectorAll('.filter-btn');
const techCards = document.querySelectorAll('.tech-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    techCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.classList.remove('hidden');
        card.style.display = '';
      } else {
        card.classList.add('hidden');
        setTimeout(() => {
          if (card.classList.contains('hidden')) {
            card.style.display = 'none';
          }
        }, 400);
      }
    });
  });
});

// --- EFEITO TILT 3D HOLOGRÁFICO NAS CARTAS ---
techCards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 8;
    const rotateY = (centerX - x) / 8;
    
    card.style.transform = `perspective(1000px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  });
});