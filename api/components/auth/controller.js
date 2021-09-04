const auth = require('./../../../auth');
const bcrypt = require('bcrypt');
const TABLE = 'auth';


module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('./../../../store/dummy');
    }

    const login = async (username, password) => {
        const data = await store.query(TABLE, { username });
        
        return bcrypt.compare(password, data.password)
        .then(areEquals => {
            if (areEquals) {
                //Generate token
                return auth.sign(JSON.stringify(data));
            } else {
                throw new Error("Invalid info");
            }
        })
        
    }

    const upsert = async (data) => {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }
        
        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, authData);
    }

    return {
        upsert,
        login
    }
};