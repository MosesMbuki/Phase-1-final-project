document.addEventListener('DOMContentLoaded', function () {
    const gallery = document.getElementById('gallery');
    const form = document.getElementById('artSubmissionForm');

    // Load and display artworks
    fetch("http://localhost:8080/artworks")
        .then(response => response.json())
        .then(data => {
            // Handle both array and {artworks: [...]} responses
            const artworks = data.artworks || data;
            showArt(artworks);

            // Setup filters
            document.getElementById('filter-all').onclick = () => showArt(artworks);
            document.getElementById('filter-paper').onclick = () => showArt(artworks.filter(a => a.medium === 'paper'));
            document.getElementById('filter-skin').onclick = () => showArt(artworks.filter(a => a.medium === 'skin'));
        })
        .catch(() => gallery.innerHTML = "Couldn't load art");

    // Form submission
    form.onsubmit = function (e) {
        e.preventDefault();
        const newArt = {
            artist: form.artist.value,
            title: form.title.value,
            medium: form.medium.value,
            image: form.image.value
        };
        gallery.innerHTML = `
      <div class="art-card">
        <img src="${newArt.image}" alt="${newArt.title}">
        <h3>${newArt.title}</h3>
        <p>By ${newArt.artist}</p>
      </div>
    ` + gallery.innerHTML;
        form.reset();
    };

    // Show all art
    function showArt(artworks) {
        gallery.innerHTML = artworks.map(art => `
      <div class="art-card">
        <img src="${art.image}" alt="${art.title}">
        <h3>${art.title}</h3>
        <p>By ${art.artist}</p>
        <small>${art.medium}</small>
      </div>
    `).join('');
    }
});

