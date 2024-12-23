const express = require('express');
const router = express.Router();
const DBController = require('../controllers/DBController');

// Routes for penelitian
router.get('/penelitian', DBController.getAllPenelitian);
router.get('/penelitian/:id', DBController.getPenelitianById);
router.post('/penelitian', DBController.createPenelitian);
router.put('/penelitian/:id', DBController.updatePenelitian);
router.delete('/penelitian/:id', DBController.deletePenelitian);

module.exports = router;
