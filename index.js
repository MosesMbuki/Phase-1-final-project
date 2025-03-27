// document.addEventListener('DOMContentLoaded', function () {
//     const gallery = document.getElementById('gallery');
//     const form = document.getElementById('artSubmissionForm');

//     // Load and display artworks
//   fetch("https://phase-1-final-project-3.onrender.com/artworks")
//         .then(response => response.json())
//         .then(data => {
//             // Handle both array and {artworks: [...]} responses
//             const artworks = data.artworks || data;
//             showArt(artworks);

//             // Setup filters
//             document.getElementById('filter-all').onclick = () => showArt(artworks);
//             document.getElementById('filter-paper').onclick = () => showArt(artworks.filter(a => a.medium === 'paper'));
//             document.getElementById('filter-skin').onclick = () => showArt(artworks.filter(a => a.medium === 'skin'));
//         })

//     // Form submission
//     form.onsubmit = function (e) {
//         e.preventDefault();
//         const newArt = {
//             artist: form.artist.value,
//             title: form.title.value,
//             medium: form.medium.value,
//             image: form.image.value
//         };
//         gallery.innerHTML = `
//       <div class="art-card">
//         <img src="${newArt.image}" alt="${newArt.title}">
//         <h3>${newArt.title}</h3>
//         <p>By ${newArt.artist}</p>
//       </div>
//     ` + gallery.innerHTML;
//         form.reset();
//     };

//     // Show all art
//     function showArt(artworks) {
//         gallery.innerHTML = artworks.map(art => `
//       <div class="art-card">
//         <img src="${art.image}" alt="${art.title}">
//         <h3>${art.title}</h3>
//         <p>By ${art.artist}</p>
//         <small>${art.medium}</small>
//       </div>
//     `).join('');
//     }
// });

document.addEventListener('DOMContentLoaded', function () {
  const gallery = document.getElementById('gallery');
  const form = document.getElementById('artSubmissionForm');
  const URL = "https://phase-1-final-project-3.onrender.com/artworks"; // Your json-server endpoint

  // Load and display artworks
  function loadArtworks() {
    fetch(URL)
      .then(response => response.json())
      .then(artworks => {
        displayArtworks(artworks);
        setupFilters(artworks);
      });
  }

  // Display artworks in gallery
  function displayArtworks(artworks) {
    gallery.innerHTML = artworks.map(art => `
      <div class="art-card">
        <img src="${art.image}" alt="${art.title}" onclick="enlargeImage('${art.image}')">
        <h3>${art.title}</h3>
        <p>By ${art.artist}</p>
        <small>Medium: ${art.medium}</small>
      </div>
    `).join('');
  }

  // Setup filter buttons
  function setupFilters(artworks) {
    document.getElementById('filter-all').onclick = () => displayArtworks(artworks);
    document.getElementById('filter-paper').onclick = () =>
      displayArtworks(artworks.filter(a => a.medium === 'paper'));
    document.getElementById('filter-skin').onclick = () =>
      displayArtworks(artworks.filter(a => a.medium === 'skin'));
  }

  // Handle form submission
  form.onsubmit = async function (e) {
    e.preventDefault();

    const newArt = {
      artist: form.artist.value,
      title: form.title.value,
      medium: form.medium.value,
      image: form.image.value
    };

    try {
      // Save to database
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newArt)
      });

      if (response.ok) {
        // Refresh the gallery
        loadArtworks();
        form.reset();
        alert('Artwork submitted successfully!');
      } else {
        alert('Error submitting artwork');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit artwork');
    }
  };

  // Initial load
  loadArtworks();
});