const express = require('express');
const router = express.Router();
const { getAllSessions, createSession } = require('../controllers/sessionController');

router.get('/', getAllSessions);
router.post('/', createSession);

module.exports = router;