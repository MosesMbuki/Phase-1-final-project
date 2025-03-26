document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    const form = document.getElementById('artSubmissionForm');

    // Load and display artworks
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            displayArtworks(data.artworks);

            // Set up filters
            document.getElementById('filter-all').addEventListener('click', () => displayArtworks(data.artworks));
            document.getElementById('filter-paper').addEventListener('click', () => {
                displayArtworks(data.artworks.filter(art => art.medium === 'paper'));
            });
            document.getElementById('filter-skin').addEventListener('click', () => {
                displayArtworks(data.artworks.filter(art => art.medium === 'skin'));
            });
        });

    // Handle form submission
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const newArt = {
            artist: form.artist.value,
            title: form.title.value,
            medium: form.medium.value,
            image: form.image.value
        };

        // Add to gallery immediately (would save to db.json in advanced version)
        const artCard = createArtCard(newArt);
        gallery.appendChild(artCard);

        // Reset form
        form.reset();
        alert('Thank you for your submission!');
    });

    // Helper function to display artworks
    function displayArtworks(artworks) {
        gallery.innerHTML = '';
        artworks.forEach(art => {
            gallery.appendChild(createArtCard(art));
        });
    }

    // Helper function to create an art card
    function createArtCard(art) {
        const card = document.createElement('div');
        card.className = 'art-card';
        card.innerHTML = `
      <img src="${art.image}" alt="${art.title}">
      <h3>${art.title}</h3>
      <p>By ${art.artist}</p>
      <small>Medium: ${art.medium}</small>
    `;
        return card;
    }
});