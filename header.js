document.addEventListener('DOMContentLoaded', function() {
  // Fetch and insert header
  fetch('header.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('afterbegin', html);
    })
    .catch(error => console.error('Error loading header:', error));

  // Fetch and insert footer
  fetch('footer.html')
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.text();
    })
    .then(html => {
      document.body.insertAdjacentHTML('beforeend', html);
    })
    .catch(error => console.error('Error loading footer:', error));

  // Fetch GitHub profile data for header
  fetch('https://api.github.com/users/mvimal2607')
    .then(response => response.json())
    .then(data => {
      document.getElementById('header-avatar').innerHTML = `<a href="https://github.com/mvimal2607" target="_blank" title="Visit Vimal's GitHub" aria-label="Vimal's GitHub profile"><img src="${data.avatar_url}" alt="Vimal's GitHub profile picture" width="40" style="border-radius: 50%;"></a>`;
    })
    .catch(error => {
      console.error('Error fetching GitHub data:', error);
      document.getElementById('header-avatar').innerHTML = '<img src="https://via.placeholder.com/40" alt="Placeholder avatar" width="40" style="border-radius: 50%;">';
    });

  // Toggle menu visibility with transition
  document.querySelector('.menu-toggle').addEventListener('click', function() {
    this.classList.toggle('active');
    document.querySelector('.nav-menu').classList.toggle('active');
  });
});