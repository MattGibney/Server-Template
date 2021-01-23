const express = require('express');

const controller = require('../controllers/adverts');

const router = express.Router();

router.get('/', controller.fetchAll);

module.exports = router;
