const jwt = require('jsonwebtoken');
const config = require('./../config');
const error = require('./../utils/error');

const secret = config.jwt.secret;

const sign = (data) => {
    return jwt.sign(data, secret);
};

const verify = (token) => {
    return jwt.verify(token, secret);
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req);

        if (decoded.id !== owner) {
            throw error('Not allowed to do this task', 401);
        }
    },
    logged: (req) => {
        const decoded = decodeHeader(req);
    },
}

const getToken = (auth) => {
    if (!auth) {
        throw error('No token coming', 400);
    }

    if (auth.indexOf('Bearer ') === -1) {
        throw error('Invalid format', 401);
    }

    let token = auth.replace('Bearer ', '');

    return token;
}

const decodeHeader = (req) => {
    const { authorization } = req.headers || '';
    const token = getToken(authorization);
    const decoded = verify(token);

    req.user = decoded;
    return decoded;
}

module.exports = { 
    sign,
    check
};