const express = require('express');
const advertsRouter = require('./routes/adverts');
const healthcheckRouter = require('./routes/healthcheck');

const router = express.Router();

router.use('/adverts', advertsRouter);
router.use('/healthcheck', healthcheckRouter);

module.exports = router;
