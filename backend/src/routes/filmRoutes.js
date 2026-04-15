const express = require('express');
const router = express.Router();
const { getAllFilms, createFilm } = require('../controllers/filmController');

// Получить все фильмы
router.get('/', getAllFilms);

// Создать новый фильм
router.post('/', createFilm);

module.exports = router;