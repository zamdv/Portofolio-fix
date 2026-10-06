// ================= PRELOADER =================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');

    if (!preloader) return;

    setTimeout(() => {
        preloader.classList.add('hide');

        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 400);
});


// ================= ELEMENT =================
const mobileMenu = document.getElementById('mobile-menu');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');


// ================= MOBILE MENU =================
mobileMenu?.addEventListener('click', () => {
    const open = navbar?.classList.toggle('active');

    mobileMenu.classList.toggle('active', open);
    mobileMenu.setAttribute('aria-expanded', open);
});

document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        navbar?.classList.remove('active');
        mobileMenu?.classList.remove('active');
        mobileMenu?.setAttribute('aria-expanded', 'false');
    });
});


// ================= HEADER =================
function updateHeader() {
    header?.classList.toggle('scrolled', window.scrollY > 20);
}

window.addEventListener('scroll', updateHeader, { passive: true });


// ================= ACTIVE NAV =================
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.navbar a');

function updateActiveNav() {
    const position = window.scrollY + window.innerHeight * 0.35;
    let current = '';

    sections.forEach(section => {
        if (position >= section.offsetTop) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            'active',
            link.getAttribute('href') === `#${current}`
        );
    });
}

updateActiveNav();
window.addEventListener('scroll', updateActiveNav, { passive: true });


// ================= TYPING =================
const typingText = document.querySelector('.typing-text span');

const words = [
    'Backend Student',
    'PHP Learner',
    'Laravel Enthusiast',
    'API Developer'
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typingText) return;

    const word = words[wordIndex];
    typingText.textContent = word.slice(0, charIndex);

    if (!deleting) {
        charIndex++;
        if (charIndex > word.length) {
            deleting = true;
            setTimeout(typeEffect, 1500);
            return;
        }
    } else {
        charIndex--;
        if (charIndex < 0) {
            charIndex = 0;
            deleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(typeEffect, 350);
            return;
        }
    }

    setTimeout(typeEffect, deleting ? 45 : 80);
}

if (typingText) {
    typingText.textContent = '';
    typeEffect();
}


// ================= SMOOTH SCROLL =================
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        const id = link.getAttribute('href');

        if (!id || id === '#') return;

        const target = document.querySelector(id);

        if (!target) return;

        event.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});


// ================= REVEAL & SKILL =================
const revealItems = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add('visible');

        if (entry.target.classList.contains('skills-column')) {
            entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                const progress = Number(bar.dataset.progress) || 0;
                const safeProgress = Math.max(0, Math.min(progress, 100));

                bar.style.setProperty('--progress', `${safeProgress}%`);

                requestAnimationFrame(() => {
                    bar.classList.add('animate');
                });
            });
        }

        observer.unobserve(entry.target);
    });
}, {
    threshold: 0.15
});

revealItems.forEach(item => {
    revealObserver.observe(item);
});


// ================= CERTIFICATE LIGHTBOX =================
const modal = document.getElementById('certificateModal');
const modalImage = document.getElementById('certificateModalImage');
const modalClose = document.querySelector('.certificate-modal-close');

function openCertificate(image) {
    if (!modal || !modalImage) return;

    modalImage.src = image;
    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    document.body.classList.add('modal-open');
}

function closeCertificate() {
    if (!modal || !modalImage) return;

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');

    setTimeout(() => {
        modalImage.src = '';
    }, 250);
}

document.querySelectorAll('.certificate-image').forEach(button => {
    button.addEventListener('click', () => {
        openCertificate(button.dataset.certificate);
    });
});

modalClose?.addEventListener('click', closeCertificate);

modal?.addEventListener('click', event => {
    if (event.target === modal) {
        closeCertificate();
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal?.classList.contains('active')) {
        closeCertificate();
    }
});


// ================= CONTACT FORM =================
const contactForm = document.querySelector('.contact-form');

contactForm?.addEventListener('submit', event => {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const project = document.getElementById('projectType').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Mohon isi Nama, Email, dan Pesan!');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        alert('Format email tidak valid!');
        return;
    }

    const finalSubject =
        subject || `Pesan Portfolio dari ${name}`;

    const body = [
        `Nama: ${name}`,
        `Email: ${email}`,
        project ? `Jenis Project: ${project}` : '',
        '',
        `Pesan:\n${message}`
    ]
        .filter(Boolean)
        .join('\n');

    window.location.href =
        `mailto:miftakhulnizamramadhan@email.com` +
        `?subject=${encodeURIComponent(finalSubject)}` +
        `&body=${encodeURIComponent(body)}`;
});