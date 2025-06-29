document.addEventListener('DOMContentLoaded', function() {
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
});
