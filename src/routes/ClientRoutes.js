'use strict'

const express = require('express');
const router = express.Router();

const controller = require('../controllers/ClientController');

router.get('/', controller.get);
router.get('/:mail', controller.getByMail);
router.get('/by/:id', controller.getById);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/:id', controller.delete);

module.exports = router;