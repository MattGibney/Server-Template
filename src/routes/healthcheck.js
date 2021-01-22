const express = require('express');

const controller = require('../controllers/healthcheck');

const router = express.Router();

router.get('/', controller.healthcheck);

module.exports = router;
