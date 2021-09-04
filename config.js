module.exports = {
    remoteDB: process.env.API_PORT || false,
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || "mySecret"
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 'dneMXcHCnr',
        password: process.env.MYSQL_PASSWORD || 'AgbadkOvQy',
        database: process.env.MYSQL_DATABASE || 'dneMXcHCnr',
    },
    mysqlService: {
        host: process.env.MYSQL_SERVICE_HOST || 'localhost',
        port: process.env.MYSQL_SERVICE_PORT || 3001,
    },
    cacheService: {
        host: process.env.CACHE_SERVICE_HOST || 'localhost',
        port: process.env.CACHE_SERVICE_PORT || 3003,
    },
    post: {
        port: process.env.POST_SERVICE_PORT || 3002,
    },
    redis: {
        host: process.env.REDIS_HOST || "redis-12680.c73.us-east-1-2.ec2.cloud.redislabs.com",
        port: process.env.REDIS_PORT || "12680",
        password: process.env.REDIS_PASSWORD || "Vxsi7ukv0T9Y1HIZUUyeTELkxX3ap0ew"
    }
}