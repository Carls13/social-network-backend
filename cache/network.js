const express = require('express');

const response = require('./../network/response');
const Store = require('./../store/redis');

const router = express.Router();

router.get('/:table', async (req, res, next) => {
    const data = await Store.list(req.params.table);
    response.success(req, res, data, 200);
});

router.get('/:table/id', async (req, res, next) => {
    const data = await Store.list(req.params.table, req.params.id);
    response.success(req, res, data, 200);
});

router.put('/:table/id', async (req, res, next) => {
    const data = await Store.upsert(req.params.table, req.params.body);
    response.success(req, res, data, 2001);
});

module.exports = router;