document.addEventListener('DOMContentLoaded', function() {
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
      // Attach event listener after header is inserted
      const menuToggle = document.querySelector('.menu-toggle');
      if (menuToggle) {
        menuToggle.addEventListener('click', function() {
          this.classList.toggle('active');
          const navMenu = document.querySelector('.nav-menu');
          if (navMenu) {
            navMenu.classList.toggle('active');
          } else {
            console.error('Nav menu element not found');
          }
        });
      } else {
        console.error('Menu toggle element not found');
      }
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
});