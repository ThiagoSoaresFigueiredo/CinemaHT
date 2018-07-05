'use strict'

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        title: 'Cinema HT',
        version: '1.0.0',
        author: 'Thiago Soares Figueiredo'
    });
});

module.exports = router;