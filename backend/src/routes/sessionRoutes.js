const express = require('express');
const router = express.Router();
const { getAllSessions, createSession, deleteSession, getSessionSeats } = require('../controllers/sessionController');

router.get('/', getAllSessions);
router.post('/', createSession);
router.delete('/:sessionId', deleteSession);
router.get('/:sessionId/seats', getSessionSeats);


module.exports = router;