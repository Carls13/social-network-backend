const express = require('express');

const response = require('../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
    return Controller.list().then((posts) => {
        response.success(req, res, posts, 200);
    })
    .catch((error) => {
        response.error(req, res, error.message, 500);
    })
    
});

module.exports = router;
