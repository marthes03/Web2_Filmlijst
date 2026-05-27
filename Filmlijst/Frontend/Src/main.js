import Film, { SciFiFilm, FantasyFilm, RomanceFilm, Shelf } from './film.js';
import { loadFromStorage, saveToStorage } from './storage.js';

const API_URL = "http://localhost:3000/api/films";
const shelf = new Shelf();
const container = document.getElementById('film-container');
const form = document.getElementById('film-form');
const genreSelect = document.getElementById('genre');
const specificInput = document.getElementById('specific-info');

shelf.subscribe(renderFilmLijst); // Koppel UI aan de data-houder


// Dynamische placeholders
genreSelect.addEventListener('change', () => {
  const gekozenGenre = genreSelect.value;

  if (gekozenGenre === 'Sci-Fi') {
    specificInput.placeholder = "Tijdsetting (bijv. Het jaar 3024)";
  } else if (gekozenGenre === 'Fantasy') {
    specificInput.placeholder = "Fantasiewereld (bijv. Heksen & Covens)";
  } else if (gekozenGenre === 'Romance') {
    specificInput.placeholder = "Relatietype (bijv. Enemies to Lovers)";
  }
});


document.addEventListener('DOMContentLoaded', async () => {
  // Zorg dat we ALTIJD een array [] krijgen, zelfs als loadFromStorage faalt of null geeft
  const cached = loadFromStorage('film_opslag', []);
  shelf.setFilms(cached);
  
  await syncWithBackend();
});

async function syncWithBackend() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    
    const liveFilms = await response.json();
    saveToStorage('film_opslag', liveFilms);
    shelf.setFilms(liveFilms);
  } catch (err) {
    console.error("Kon live data niet ophalen, we draaien door op cache:", err); //Vang verwachte fouten op
  }
}

// POLYMORFISME: Hier beslist JavaScript welke specifieke klasse hij bouwt
function renderFilmLijst(filmsData) {
  container.innerHTML = '';
  
filmsData.forEach(item => {
    let filmObj;
    
    if (item.genre === 'Sci-Fi') {
      filmObj = new SciFiFilm(item.title, item.genre, item.specificValue);
    } else if (item.genre === 'Fantasy') {
      filmObj = new FantasyFilm(item.title, item.genre, item.specificValue);
    } else if (item.genre === 'Romance') {
      filmObj = new RomanceFilm(item.title, item.genre, item.specificValue);
    } else {
      filmObj = new Film(item.title, item.genre);
    }
    
    container.appendChild(filmObj.render());
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // Stop het standaard herladen van de pagina

  const title = document.getElementById('title').value.trim();
  const genre = genreSelect.value;
  const specificValue = specificInput.value.trim();

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, genre, specificValue })
    });
    if (!response.ok) throw new Error("Fout bij opslaan");
    
    form.reset();
    await syncWithBackend();
  } catch (err) {
    alert("Server offline! De film kon niet live worden opgeslagen.");
  }
});