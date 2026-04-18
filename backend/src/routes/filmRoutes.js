const express = require('express');
const router = express.Router();
const { getAllFilms, createFilm } = require('../controllers/filmController');

router.get('/', getAllFilms);
router.post('/', createFilm);

module.exports = router;