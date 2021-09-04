const { nanoid } = require('nanoid');
const auth = require('../auth');

const TABLE = 'user';

module.exports = (injectedStore, injectedCache) => {
    let cache = injectedCache;
    let store = injectedStore;
    if (!store) {
        store = require('./../../../store/dummy');
    }
    if (!cache) {
        store = require('./../../../store/dummy');
    }
    const list = async () => {
        let users = await cache.list(TABLE);

        if (!users) {
            console.log("Data from store");
            users = await store.list(TABLE);
            cache.upsert(TABLE, users);
        } else {
            console.log("Data from cache");
        }

        return users;
    };

    const get = (id) => {
        return store.get(TABLE, id);
    };

    const followers = (id) => {
        return store.followers('user_follow', {
            user_to: id
        })
    }

    const following = (id) => {
        return store.following('user_follow', {
            user_from: id
        })
    }

    const upsert = async (body) => {
        const user = {
            name: body.name,
            username: body.username,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            })
        }

        return store.upsert(TABLE, user);
    }

    const follow = (from, to) => {
        return store.upsert('user_follow', {
            user_from: from,
            user_to: to
        })
    }

    return {
        list,
        get,
        upsert,
        follow,
        followers,
        following
    };
}