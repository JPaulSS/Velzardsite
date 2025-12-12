document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('.main-nav a'));

  const sections = navLinks
    .map(a => {
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('#')) return null;
      return document.querySelector(href);
    })
    .filter(Boolean);

  if ('IntersectionObserver' in window && sections.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { root: null, rootMargin: '0px 0px -40% 0px', threshold: 0.15 });

    sections.forEach(s => obs.observe(s));
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href) return;
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          const offset = 70; // altura del navbar
          const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
          window.scrollTo({ top, behavior: 'smooth' });
          // actualizar hash sin forzar salto instantáneo
          history.replaceState(null, '', href);
        }
      } else {
        if (!href.startsWith('http') && !href.includes('.html')) {
          const id = '#' + href.replace(/^\/|\/$/g,'');
          const target = document.querySelector(id);
          if (target) {
            e.preventDefault();
            const offset = 70;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
            history.replaceState(null, '', id);
          }
        }
      }
    });
  });
});

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navLinks.classList.toggle("active");
    });

document.addEventListener('DOMContentLoaded', () => {
    const icon = document.getElementById('assistant-icon');
    const bubble = document.getElementById('assistant-bubble');
    const textElement = document.getElementById('assistant-text');

    const whatsappNumber = "3186244937";
    
    const prefilledMessage = "Hola Velzard, estoy interesado en sus servicios de desarrollo web y me gustaría obtener más información.";

    const encodedMessage = encodeURIComponent(prefilledMessage);
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    const messages = [
        "👋 Bienvenido, soy Velzard",
        "💡 ¿Tienes dudas? ¡Click aquí!",
        "💼 ¿Quieres trabajar con nosotros? ¡Click aquí!",
    ];

    let messageIndex = 0;

    function showNextMessage() {
        bubble.classList.add('hidden');

        setTimeout(() => {
            textElement.textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;

            bubble.classList.remove('hidden');
        }, 300); 
    }

    showNextMessage(); 

    setInterval(showNextMessage, 6000);

    icon.addEventListener('click', () => {
        window.open(whatsappLink, '_blank');
    });

    bubble.addEventListener('click', () => {
        window.open(whatsappLink, '_blank');
    });
});