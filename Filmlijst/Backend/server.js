const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let films = [
  { id: 1, title: "Dune", genre: "Sci-Fi", specificValue: "Het jaar 10191" },
  { id: 2, title: "The Hobbit", genre: "Fantasy", specificValue: "Midden-Aarde" },
  { id: 3, title: "Titanic", genre: "Romance", specificValue: "Verboden liefde op een schip" }
];

app.get('/api/films', (req, res) => {
  res.json(films);
});

app.post('/api/films', (req, res) => {
  try {
    const { title, genre, specificValue } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Validation failed", message: "Titel is verplicht" });
    }

    const newFilm = { id: Date.now(), title, genre, specificValue };
    films.push(newFilm);

    return res.status(201).json(newFilm);
  } catch (err) {
    return res.status(500).json({ error: "server error" });
  }
});

app.listen(PORT, () => console.log(`Backend draait op http://localhost:${PORT}`));