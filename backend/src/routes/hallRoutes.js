const express = require('express');
const router = express.Router();

const { 
  getAllHalls, 
  createHall, 
  deleteHall 
} = require('../controllers/hallController');

router.get('/', getAllHalls);
router.post('/', createHall);
router.delete('/:hallId', deleteHall);

module.exports = router;