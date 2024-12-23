const express = require('express');
const router = express.Router();
const MhsController = require('../controllers/MhsController');

router.get('/Mhs', MhsController.getPenelitian);

module.exports = router;


