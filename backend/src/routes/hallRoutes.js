const express = require('express');
const router = express.Router();
const { getAllHalls, createHall } = require('../controllers/hallController');

router.get('/', getAllHalls);
router.post('/', createHall);

module.exports = router;