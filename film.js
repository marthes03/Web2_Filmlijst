export default class Film {  // Default export voor de hoofdklasse
  constructor(title, genre) {
    if (!title) throw new Error("Titel is verplicht");
    this.title = title;
    this.genre = genre;
  }

  render() { // Elementen dynamisch aanmaken vanuit JS
    const kaart = document.createElement('div');
    kaart.className = `film-kaart ${this.genre.toLowerCase()}`;
    
    const h3 = document.createElement('h3');
    h3.textContent = this.title; // textContent is veilig tegen XSS
    
    const p = document.createElement('p');
    p.innerHTML = `Genre: <span>${this.genre}</span>`;
    
    kaart.appendChild(h3);
    kaart.appendChild(p);
    return kaart;
  }
}
//Subclass voor Sci-Fi
export class SciFiFilm extends Film {
  constructor(title, genre, tijdSetting) {
    super(title, genre); // Roept verplicht parent constructor aan
    this.tijdSetting = tijdSetting || "Onbekend tijdsetting";
  }

  render() {
    const kaart = super.render(); // Pak de basis-kaart
    const tag = document.createElement('p');
    tag.textContent = `Tijdsetting: ${this.tijdSetting}`;
    kaart.appendChild(tag);
    return kaart;
  }
}

// Subclass voor Fantasy
export class FantasyFilm extends Film {
  constructor(title, genre, fantasieWereld) {
    super(title, genre);
    this.fantasieWereld = fantasieWereld || "Geen specifieke wereld";
  }

  render() {
    const kaart = super.render();
    const tag = document.createElement('p');
    tag.textContent = `Fantasiewereld: ${this.fantasieWereld}`;
    kaart.appendChild(tag);
    return kaart;
  }
}


// Subclass voor Romance
export class RomanceFilm extends Film {
  constructor(title, genre, relatieType) {
    super(title, genre); // Roept verplicht de parent-constructor aan
    this.relatieType = relatieType || "Onbekend";
  }

  render() {
    const kaart = super.render(); // Hergebruik de parent HTML
    const tag = document.createElement('p');
    tag.textContent = `Relatietype: ${this.relatieType}`;
    kaart.appendChild(tag);
    return kaart;
  }
}

// Het Observer Pattern om de UI automatisch in sync te houden
export class Shelf {
  constructor() {
    this.films = [];
    this.listeners = [];
  }
  subscribe(listener) {
    this.listeners.push(listener);
  }
  setFilms(filmLijst) {
    this.films = filmLijst;
    this.notify();
  }
  notify() {
    for (const listener of this.listeners) {
      listener(this.films);
    }
  }
}