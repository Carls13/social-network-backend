const TABLE = 'post';

module.exports = (injectedStore) => {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    const list = () => {
        return store.list(TABLE);
    };

    return { 
        list, 
    };
}