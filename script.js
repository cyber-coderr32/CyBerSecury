// Small interactive behaviors: mobile nav toggle, form faux-submit and year
document.addEventListener('DOMContentLoaded', function () {
  // Set year
  const y = new Date().getFullYear();
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = y;

  // Mobile nav
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      if (!expanded) {
        mainNav.style.display = 'block';
        this.setAttribute('aria-label', 'Fechar menu');
      } else {
        mainNav.style.display = '';
        this.setAttribute('aria-label', 'Abrir menu');
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
});

// Simple contact form handler (demo). Replace with real backend call as needed.
function contactFormSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    alert('Por favor preencha todos os campos.');
    return false;
  }

  // For this demo we just open WhatsApp draft with the message and also show a friendly note.
  const waNumber = '244926815124';
  const text = `Olá, sou ${encodeURIComponent(name)} (${encodeURIComponent(email)}). ${encodeURIComponent(message)}`;
  const waUrl = `https://wa.me/${waNumber}?text=${text}`;

  const openWhatsApp = confirm('Deseja enviar esta mensagem via WhatsApp? (Recomendado para resposta mais rápida)');
  if (openWhatsApp) {
    window.open(waUrl, '_blank', 'noopener');
  } else {
    alert('Obrigado! Iremos responder por email em breve.');
  }

  // Reset form
  e.target.reset?.();
  return false;
}