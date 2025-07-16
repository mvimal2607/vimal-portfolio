document.addEventListener('DOMContentLoaded', () => {
    // Load all dynamic parts of the page
    loadHeader();
    loadFooter();

    // --- THIS IS THE CORRECTED CHECK ---
    // It now checks if the 'github-avatar' element exists on the page
    if (document.getElementById('github-avatar')) {
        loadGitHubProfile();
    }
    
    // Fade-in animation for page content
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

// --- Function to load the Header ---
function loadHeader() {
    fetch('/header.html') 
        .then(response => response.ok ? response.text() : Promise.reject('Header not found'))
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            initializeHeaderInteractivity();
        })
        .catch(error => console.error('Error fetching header:', error));
}

// --- Function to load the Footer ---
function loadFooter() {
    fetch('/footer.html')
        .then(response => response.ok ? response.text() : Promise.reject('Footer not found'))
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        })
        .catch(error => console.error('Error fetching footer:', error));
}

// --- Function to load the GitHub Profile ---
function loadGitHubProfile() {
    fetch('https://api.github.com/users/mvimal2607')
        .then(response => response.ok ? response.json() : Promise.reject('GitHub user not found'))
        .then(data => {
            document.getElementById('github-avatar').innerHTML = `<a href="https://github.com/mvimal2607" target="_blank" title="Visit Vimal's GitHub" aria-label="Vimal's GitHub profile"><img src="${data.avatar_url}" alt="Vimal's GitHub profile picture" class="w-40 h-40 rounded-full mx-auto"></a>`;
            document.getElementById('github-username').textContent = `Hi, I'm ${data.name || data.login}`;
            document.getElementById('github-bio').textContent = data.bio || 'Android Developer | FOSS Enthusiast';
        })
        .catch(error => {
            console.error('Error fetching GitHub data:', error);
            const profileSection = document.querySelector('[aria-label="GitHub Profile"]');
            if(profileSection) profileSection.innerHTML = `<p class="text-red-500">Could not load GitHub profile data.</p>`;
        });
}

// --- Function to handle mobile menu and active link highlighting ---
function initializeHeaderInteractivity() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    if (btn) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            hamburgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('#nav-links a, #mobile-nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop() || 'index.html';
        if (linkPage === currentPage) {
            link.classList.add('bg-blue-800', 'dark:bg-blue-950', 'text-white');
            link.classList.remove('text-gray-300');
            link.setAttribute('aria-current', 'page');
        }
    });
}