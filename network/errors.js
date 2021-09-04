const response = require('./response');

const errors = (err, req, res, next) => {
    console.error('[error]', err);

    const { message, statusCode } = err;

    response.error(req, res, message || 'Internal error', statusCode || 500);
};

module.exports = errors;