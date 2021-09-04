const express = require('express');

const secure = require('./secure');
const response = require('./../../../network/response');
const Controller = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
    return Controller.list().then((users) => {
        response.success(req, res, users, 200);
    })
    .catch((error) => {
        response.error(req, res, error.message, 500);
    })
    
});

router.get('/:id/followers', (req, res) => {
    return Controller.followers(req.params.id).then((followers) => {
        response.success(req, res, followers, 200);
    })
    .catch((error) => {
        response.error(req, res, error.message, 500);
    })
    
});

router.get('/:id/following', (req, res) => {
    return Controller.following(req.params.id).then((following) => {
        response.success(req, res, following, 200);
    })
    .catch((error) => {
        response.error(req, res, error.message, 500);
    })
    
});

router.post('/follow/:id', secure('follow'), (req, res, next) => {
    Controller.follow(req.user.id, req.params.id)
    .then(data => {
        response.success(req, res, data, 201);
    })
    .catch(next);
})

router.get('/:id', (req, res) => {
    return Controller.get(req.params.id).then((user) => {
        response.success(req, res, user, 200);
    })
    .catch((error) => {
        response.error(req, res, error.message, 500);
    })
});

const upsert = (req, res) => {
    Controller.upsert(req.body)
    .then((user) => {
        response.success(req, res, user, 201);
    })
    .catch((err) => {
        response.error(req, res, err.message, 500);
    });
}

router.post('/', upsert);
router.put('/', secure('update'), upsert);

module.exports = router;