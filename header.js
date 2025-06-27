document.addEventListener('DOMContentLoaded', function() {
  // Function to attach menu toggle event
  function setupMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
      const computedStyle = getComputedStyle(menuToggle);
      if (computedStyle.display !== 'none' && !menuToggle.dataset.eventAttached) {
        menuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          const navMenu = document.querySelector('.nav-menu');
          if (navMenu) {
            navMenu.classList.toggle('active');
          } else {
            console.error('Nav menu element not found');
          }
        });
        menuToggle.dataset.eventAttached = 'true'; // Mark as attached
        console.log('Menu toggle event attached');
      } else if (computedStyle.display === 'none') {
        console.log('Menu toggle is hidden');
      }
    } else {
      console.error('Menu toggle element not found');
    }
  }

  // Fetch and insert header
  fetch('header.html')
    .then(response => {
      if (!response.ok) {
        console.error('Header fetch failed:', response.status, response.statusText);
        throw new Error('Header fetch failed');
      }
      return response.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
      setupMenuToggle(); // Initial setup after header insertion
    })
    .catch(error => console.error('Error loading header:', error));

  // Fetch and insert footer
  fetch('footer.html')
    .then(response => {
      if (!response.ok) {
        console.error('Footer fetch failed:', response.status, response.statusText);
        throw new Error('Footer fetch failed');
      }
      return response.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    })
    .catch(error => console.error('Error loading footer:', error));

  // Fetch GitHub profile data for header
  fetch('https://api.github.com/users/mvimal2607')
    .then(response => {
      if (!response.ok) throw new Error('GitHub API request failed');
      return response.json();
    })
    .then(data => {
      const headerAvatar = document.getElementById('header-avatar');
      if (headerAvatar) {
        headerAvatar.innerHTML = `<a href="https://github.com/mvimal2607" target="_blank" title="Visit Vimal's GitHub" aria-label="Vimal's GitHub profile"><img src="${data.avatar_url}" alt="Vimal's GitHub profile picture" width="40" style="border-radius: 50%;"></a>`;
      } else {
        console.error('Header avatar element not found');
      }
    })
    .catch(error => {
      console.error('Error fetching GitHub data:', error);
      const headerAvatar = document.getElementById('header-avatar');
      if (headerAvatar) {
        headerAvatar.innerHTML = '<img src="https://via.placeholder.com/40" alt="Placeholder avatar" width="40" style="border-radius: 50%;">';
      }
    });

  // Debounced resize handler with reinitialization
  let resizeTimeout;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      setupMenuToggle(); // Re-check and attach on resize
      // Force re-evaluate active state to reset any stuck toggles
      const menuToggle = document.querySelector('.menu-toggle');
      const navMenu = document.querySelector('.nav-menu');
      if (menuToggle && navMenu) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    }, 100); // Debounce delay
  });
});
