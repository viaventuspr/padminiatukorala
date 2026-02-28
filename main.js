// ===== NAVIGATION =====
const navbar = document.querySelector('.navbar');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = mobileMenu.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
    spans[1].style.opacity = mobileMenu.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = mobileMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
  });
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
  if (a.getAttribute('href') === currentPage || (currentPage === '' && a.getAttribute('href') === 'index.html')) {
    a.classList.add('active');
  }
});

// ===== SCROLL ANIMATIONS =====
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

// ===== COUNTER ANIMATION =====
function animateCounter(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current) + (el.dataset.suffix || '');
  }, 16);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting && !e.target.dataset.counted) {
      e.target.dataset.counted = 'true';
      animateCounter(e.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.counter').forEach(el => counterObserver.observe(el));

// ===== WHATSAPP FLOAT =====
const waFloat = document.querySelector('.whatsapp-float');
if (waFloat) {
  waFloat.addEventListener('click', () => {
    window.open('https://wa.me/94771234567?text=ආයුබෝවන්%21%20Padmini%20ගුරුතුමිය%20ගේ%20classes%20ගැන%20දැනගන්න%20කැමතියි.', '_blank');
  });
}

// ===== VIDEO MODAL =====
function openVideoModal(videoId) {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoFrame');
  if (modal && iframe) {
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
}

function closeVideoModal() {
  const modal = document.getElementById('videoModal');
  const iframe = document.getElementById('videoFrame');
  if (modal && iframe) {
    modal.classList.remove('open');
    iframe.src = '';
    document.body.style.overflow = '';
  }
}

document.addEventListener('click', (e) => {
  if (e.target.id === 'videoModal') closeVideoModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeVideoModal();
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '✅ Sent!';
    btn.disabled = true;
    btn.style.background = 'linear-gradient(135deg, #0d8a62, #14b87f)';
    
    // WhatsApp redirect with form data
    const name = document.getElementById('name')?.value;
    const grade = document.getElementById('grade')?.value;
    const phone = document.getElementById('phone')?.value;
    const msg = `ආයුබෝවන්! 🙏\nName: ${name}\nGrade: ${grade}\nPhone: ${phone}\n\nClasses ගැන දැනගන්න කැමතියි.`;
    window.open(`https://wa.me/94771234567?text=${encodeURIComponent(msg)}`, '_blank');

    setTimeout(() => {
      btn.innerHTML = original;
      btn.disabled = false;
      btn.style.background = '';
      contactForm.reset();
    }, 3000);
  });
}
