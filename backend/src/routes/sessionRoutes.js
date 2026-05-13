const express = require('express');
const router = express.Router();
const { getAllSessions, createSession, deleteSession } = require('../controllers/sessionController');

router.get('/', getAllSessions);
router.post('/', createSession);
router.delete('/:sessionId', deleteSession);

module.exports = router;