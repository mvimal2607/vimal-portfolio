// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Fade-in animation on scroll
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
});

// Copy to clipboard function
function copyCode(button) {
    const pre = button.parentElement.querySelector('pre');
    const code = pre.querySelector('code').innerText;
    navigator.clipboard.writeText(code).then(() => {
        button.innerHTML = 'Copied!';
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-clipboard"></i>';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}

// Navigation bar hide/show on scroll
let lastScrollTop = 0;
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Scrolling down
        nav.classList.add('nav-hidden');
    } else if (currentScroll < lastScrollTop) {
        // Scrolling up
        nav.classList.remove('nav-hidden');
    }
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Prevent negative scroll values
});