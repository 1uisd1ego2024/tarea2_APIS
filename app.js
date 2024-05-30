//URL base de la api

const API_URL = 'http://swapi.dev/api/';

//Elementos del DOM

const content = document.getElementById('content');
const buttons = document.querySelectorAll('nav button');
const itemSelector = document.getElementById('item-selector');
const selectorContainer = document.getElementById('selector-container');

//Funcion para obtener los datos

async function fetchData(endpoint) {
    try {

        const response = await fetch(API_URL + endpoint);
        if (!response.ok) {
            throw new Error('Network response was not ok');

        }
        const data = await response.json();
        console.log(`Fetched data from ${endpoint}`, data);
        return data.results;
    } catch (error) {
        console.error('Error fetching data: ', error);
        return [];

    }
}


// Card para personaje


function createCharacterCard(character) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = ` <h2>${character.name}</h2>
    <p> Altura: ${character.height}</p>
    <p>Peso: ${character.mass} kg</p>
    <p>Año de Nacimiento: ${character.birth_year}</p>
    <p>Genero: ${character.gender}</p>
    `;
    return card;


}





//Card para planetas


function createPlanetCard(planets) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = ` <h2>${planets.name}</h2>
    <p> Rotación: ${planets.rotation_period}</p>
    <p>Periodo en órbita: ${planets.orbital_period} años</p>
    <p>Diámetro: ${planets.diameter}</p>
    <p>Clima: ${planets.climate}</p>
    <p>Gravedad: ${planets.gravity}</p>
    <p>Tipo de terreno: ${planets.terrain}</p>
    <p>Superficie de agua: ${planets.surface_water}</p>
    <p>Cantidad de población: ${planets.population}</p>
    `;
    return card;


}


// card para naves, agregado  recientemente


function createStarShipCard(starships) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = ` <h2>${starships.name}</h2>
    <p>Modelo: ${starships.model} kg</p>
    <p>Fabricante: ${starships.manufacturer}</p>
    <p>Costo en créditos: $ ${starships.cost_in_credits}</p>
    <p>Largo: ${starships.length} metros</p>
    <p>Velocidad máxima en atmósfera: ${starships.max_atmosphering_speed}</p>
    <p>Pasajeros: ${starships.passengers}</p>
    <p>Capacidad de combustible en Cc: ${starships.cargo_capacity}</p>
    `;
    return card;


}











//Funcion pra mostrar los datos

async function displayData(type) {
    content.innerHTML = '';
    itemSelector.style.display = 'block';
    itemSelector.innerHTML = '<option value="" disabled selected>Seleccion un item</option>';
    const endpoint = type === 'characters' ? 'people' : type;
    console.log(`Fetching data for endpoint :${endpoint}`);

    const data = await fetchData(endpoint);
    if (data.lenght === 0) {
        itemSelector.innerHTML = '<option value="" disabled>No se encontraron datos.</option>';
        return;

    }

    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.url;
        option.textContent = item.name || item.title;
        itemSelector.appendChild(option);

    });
    itemSelector.onchange = async function () {
        const url = this.value;
        const response = await fetch(url);
        const item = await response.json();
        content.innerHTML = '';


        let card;

        if (type === 'people') {
            card = createCharacterCard(item);



        } else if (type === 'planets') {

            card = createPlanetCard(item);

        } else if (type === 'starships') {

            card = createStarShipCard(item);

        }

        if (card) {

            content.appendChild(card);
        } else {
            console.error('Error: car undefined');


        }


    };

}

//Agregar eventos a los botones

buttons.forEach(button => {

    button.addEventListener('click', (event) => {
        const type = event.target.id === 'characters' ? 'people' : event.target.id;
        displayData(type);

    })


})



