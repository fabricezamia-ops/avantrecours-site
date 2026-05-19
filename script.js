/* ============================================================
   AVANT RECOURS — script.js
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- ANNÉE FOOTER ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- MENU MOBILE ---- */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');

  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('open');
      toggle.classList.toggle('open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen);
    });

    // Fermer au clic sur un lien
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Fermer au clic en dehors
    document.addEventListener('click', (e) => {
      if (!toggle.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.remove('open');
        toggle.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---- FORMULAIRE DE CONTACT (Formspree) ---- */
  // Remplace XXXXXXXX par ton ID Formspree
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/XXXXXXXX';

  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');

  if (submitBtn) {
    submitBtn.addEventListener('click', async () => {
      const form = document.getElementById('contactForm');
      const nom = form.querySelector('input[name="nom"]').value.trim();
      const email = form.querySelector('input[name="email"]').value.trim();
      const tel = form.querySelector('input[name="tel"]').value.trim();
      const message = form.querySelector('textarea[name="message"]').value.trim();

      // Validation
      if (!nom || !email || !message) {
        formSuccess.style.color = '#b0637a';
        formSuccess.textContent = 'Merci de renseigner votre nom, email et message.';
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        formSuccess.style.color = '#b0637a';
        formSuccess.textContent = 'Merci de renseigner un email valide.';
        return;
      }

      // Envoi
      submitBtn.disabled = true;
      submitBtn.textContent = 'Envoi en cours…';
      formSuccess.textContent = '';

      try {
        const response = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({ nom, email, tel, message })
        });

        if (response.ok) {
          formSuccess.style.color = '#2d7a5a';
          formSuccess.textContent = 'Votre message a bien été envoyé. Je vous recontacte dans les meilleurs délais.';
          submitBtn.textContent = 'Message envoyé ✓';
          form.querySelectorAll('input, textarea').forEach(el => el.value = '');
        } else {
          throw new Error('Erreur serveur');
        }
      } catch {
        formSuccess.style.color = '#b0637a';
        formSuccess.textContent = 'Une erreur est survenue. Merci de me contacter directement à contact@avantrecours.fr';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Envoyer ma demande';
      }
    });
  }

  /* ---- SCROLL REVEAL (léger, CSS-only fallback) ---- */
  if ('IntersectionObserver' in window) {
    const revealEls = document.querySelectorAll('.card, .step-card, .benefit, .scope-box, .faq-list details, .option-item');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
      el.style.transition = `opacity .5s ease ${i * 0.05}s, transform .5s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

});
