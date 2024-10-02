// Define background colors for different Pokémon types
const backgroundColors = {
    grass: '#A8D8B9',  // Light green for Grass type
    poison: '#D6A9D9', // Light purple for Poison type
    fire: '#F1A7A7',   // Light red for Fire type
    water: '#A9D6E7',  // Light blue for Water type
    electric: '#F9EA7E', // Light yellow for Electric type
    ground: '#C2B280', // Light brown for Ground type
    bug: '#A8D200',    // Bright green for Bug type
    normal: '#C7C1A0', // Beige for Normal type
    fairy: '#FF6F61',  // Coral for Fairy type
    fighting: '#BF3E3E', // Dark red for Fighting type
    psychic: '#D5006D', // Bright pink for Psychic type
    rock: '#A16A35',   // Brown for Rock type
    ghost: '#4B0082',  // Indigo for Ghost type
    dragon: '#5C5E7D', // Slate gray for Dragon type
    steel: '#A8A8B5',  // Light gray for Steel type
    dark: '#3A3B30',   // Dark gray for Dark type
    ice: '#A4D8E1',    // Light cyan for Ice type
    flying: '#A1C7E1'  // Light blue for Flying type
};

// Define the no-match message element
const noMatchMessage = document.getElementById('no-match-message');

// Fetch Pokémon data and create cards
fetch('pokedex.json')
    .then(response => response.json()) // Parse JSON response
    .then(data => {
        const container = document.querySelector('.container'); // Select container for cards
        data.forEach(pokemon => {
            const card = document.createElement('div'); // Create a new card element
            card.classList.add('card'); // Add card class to the card

            // Format the Pokémon ID to be 3 digits long
            const formattedId = String(pokemon.id).padStart(3, '0');

            // Create type of Pokémon with background colors
            const typeElements = pokemon.type.map(type => {
                const color = backgroundColors[type.toLowerCase()] || '#FFFFFF'; // Default to white if no match
                return `<span class="type" style="background-color: ${color};">${type}</span>`; // Create type element with background color
            }).join(' '); // Join types into a single string

            // Set the inner HTML for the card
            card.innerHTML = `
                <img src="${pokemon.image.thumbnail}" alt="${pokemon.name.english}"> <!-- Pokémon image -->
                <div class="info">
                    <p class="code">${formattedId}</p> <!-- Pokémon ID -->
                    <p class="name">${pokemon.name.english}</p> <!-- Pokémon name -->
                    <p class="type">${typeElements}</p> <!-- Pokémon types -->
                </div>
            `;

            // Navigate to details page on card click
            card.addEventListener('click', () => {
                window.location.href = `detail.html?id=${pokemon.id}`; // Redirect to detail page with Pokémon ID
            });

            // Add the card to the container
            container.appendChild(card); // Append card to the container
        });
    })
    .catch(error => console.error('Error fetching the Pokémon data:', error)); // Log any errors

// Search functionality
document.getElementById('search').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase(); // Get search input
    const pokemonCards = document.querySelectorAll('.card'); // Select all Pokémon cards
    let matchFound = false; // Variable to track if any match is found

    // Clear the message if the search term is empty
    if (searchTerm === '') {
        noMatchMessage.style.display = 'none'; // Hide the no-match message if the search bar is empty
    }

    // Check each card for matches
    pokemonCards.forEach(card => {
        const pokemonName = card.querySelector('.name').textContent.toLowerCase(); // Get Pokémon name
        if (pokemonName.includes(searchTerm)) {
            card.style.display = ''; // Show card if name matches
            matchFound = true; // Set matchFound to true if there is a match
        } else {
            card.style.display = 'none'; // Hide card if name does not match
        }
    });

    // Show or hide the no-match message based on whether any matches were found
    noMatchMessage.style.display = matchFound ? 'none' : 'block'; // Toggle message visibility
});