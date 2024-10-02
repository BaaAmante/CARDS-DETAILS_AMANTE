// Fetch data from the JSON file
fetch('pokedex.json')
    .then(response => response.json()) // Convert the response to JSON format
    .then(data => {
        // Retrieve the Pokémon ID from the URL parameters
        const urlParams = new URLSearchParams(window.location.search);
        const pokemonId = urlParams.get('id');
        const currentPokemonIndex = data.findIndex(p => p.id == pokemonId); // Find the index of the selected Pokémon in the data array
        
        // Display details of the selected Pokémon card
        displayPokemonDetails(data[currentPokemonIndex]);

        // Set up event listener for the back button
        document.getElementById('leftArrow').addEventListener('click', () => {
            navigateToPokemon(data, currentPokemonIndex - 1); // Navigate to the previous Pokémon
        });

        // Set up event listener for the forward button
        document.getElementById('rightArrow').addEventListener('click', () => {
            navigateToPokemon(data, currentPokemonIndex + 1); // Navigate to the next Pokémon
        });
    })
    .catch(error => console.error('Error fetching the Pokémon data:', error)); // Log any errors in fetching data

// Function to navigate to a Pokémon based on the index
function navigateToPokemon(data, index) {
    if (index >= 0 && index < data.length) { // Check if the index is within bounds
        window.location.href = `detail.html?id=${data[index].id}`; // Redirect to the selected Pokémon's detail page
    }
}

// Function to display Pokémon details
function displayPokemonDetails(pokemon) {
    if (!pokemon) return; // Exit if no Pokémon data is provided

    // Define background colors for different Pokémon types
    const backgroundColors = {
        grass: '#A8D8B9',
        poison: '#D6A9D9',
        fire: '#F1A7A7',
        water: '#A9D6E7',
        electric: '#F9EA7E',
        ground: '#C2B280',
        bug: '#A8D200',
        normal: '#C7C1A0',    
        fairy: '#FF6F61',
        fighting: '#BF3E3E',
        psychic: '#D5006D',
        rock: '#A16A35',
        ghost: '#4B0082',
        dragon: '#5C5E7D',
        steel: '#A8A8B5',
        dark: '#3A3B30',
        ice: '#A4D8E1',
        flying: '#A1C7E1'
    };

    // Set the background color based on the Pokémon's first type
    document.body.style.backgroundColor = backgroundColors[pokemon.type[0].toLowerCase()] || '#FFFFFF';
    
    // Update the displayed Pokémon name and ID
    document.querySelector('.name').textContent = pokemon.name.english; // Display the Pokémon's name
    document.querySelector('.body2-fonts').textContent = `#${String(pokemon.id).padStart(3, '0')}`; // Format the ID

    // Update the displayed Pokémon image
    document.querySelector('.detail-img-wrapper img').src = pokemon.image.hires;

    // Display the types of the Pokémon
    const typeWrapper = document.querySelector('.power-wrapper');
    typeWrapper.innerHTML = ''; // Clear any existing types
    pokemon.type.forEach(type => {
        const typeElement = document.createElement('p'); // Create a new element for each type
        typeElement.classList.add('body3-fonts', 'type', type.toLowerCase());
        typeElement.textContent = type; // Set the text to the type name
        typeElement.style.backgroundColor = backgroundColors[type.toLowerCase()] || '#FFFFFF'; // Set the background color
        typeWrapper.appendChild(typeElement); // Append the type element to the wrapper
    });

    // Display weight and height of the Pokémon
    document.querySelector('.weight').textContent = pokemon.profile.weight; // Display weight
    document.querySelector('.height').textContent = pokemon.profile.height; // Display height

    // Display abilities of the Pokémon
    const abilityWrapper = document.querySelector('.move');
    abilityWrapper.innerHTML = pokemon.profile.ability.map(ability => 
        `<p>${ability[0]} (${ability[1] === "true" ? "Hidden" : "Normal"})</p>` // Format abilities
    ).join(''); // Join abilities into a single string

    // Display the Pokémon's description
    document.querySelector('.pokemon-description').textContent = pokemon.description;

    const stats = pokemon.base; // Retrieve base stats of the Pokémon

    // Map stats to corresponding values
    const statMapping = {
        'HP': stats.HP,
        'Attack': stats.Attack,
        'Defense': stats.Defense,
        'Sp-Attack': stats["Sp. Attack"],
        'Sp-Defense': stats["Sp. Defense"],
        'Speed': stats.Speed
    };

    // Update the stats display
    document.querySelectorAll('.stats-wrap').forEach(statWrap => {
        const statName = statWrap.getAttribute('data-stat'); // Get the stat name from the element
        const statValue = statMapping[statName]; // Retrieve the corresponding stat value

        if (statValue !== undefined) { // Check if stat value exists
            // Fill the width of the stat bar based on the stat value
            const statFill = statWrap.querySelector('.stat-fill');
            statFill.style.width = `${statValue}%`; // Set the fill width based on stat value

            // Set the displayed stat value text
            const statValueText = statWrap.querySelector('.stat-value');
            statValueText.textContent = statValue; // Display the stat value
        }
    });
}