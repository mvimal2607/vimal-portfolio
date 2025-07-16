document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Load Header ---
    fetch('header.html')
        .then(response => {
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            return response.text();
        })
        .then(data => {
            // Inject header HTML into the placeholder
            document.getElementById('header-placeholder').innerHTML = data;
            
            // --- 2. Initialize Header Scripts AFTER loading it ---
            initializeHeader();
        })
        .catch(error => {
            console.error('Error fetching header:', error);
            // Optionally display an error message on the page
            document.getElementById('header-placeholder').innerHTML = '<p class="text-center text-red-500">Could not load header.</p>';
        });

    // --- 3. Fade-in Animation for Page Content ---
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });
});

function initializeHeader() {
    // --- Mobile Menu Toggle Script ---
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

    // --- Active Link Highlighting Script ---
    const currentPage = window.location.pathname.split('/').pop();
    // Use 'index.html' or '' for the root page
    const homePageIdentifier = currentPage === 'index.html' || currentPage === '';

    // Target both desktop and mobile navigation links
    const navLinks = document.querySelectorAll('#nav-links a, #mobile-nav-links a');

    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        const isHomePageLink = link.getAttribute('href') === '/' || link.getAttribute('href') === 'index.html';

        if ((homePageIdentifier && isHomePageLink) || (linkPage === currentPage && !homePageIdentifier)) {
            // Desktop links
            link.classList.add('bg-blue-800', 'dark:bg-blue-950', 'text-white');
            link.classList.remove('text-gray-300');
            link.setAttribute('aria-current', 'page');
            
            // Mobile links - they have slightly different classes
            if (link.parentElement.id === 'mobile-nav-links') {
                 link.classList.add('bg-blue-800', 'dark:bg-blue-950', 'text-white');
                 link.classList.remove('text-gray-300');
            }
        }
    });
}