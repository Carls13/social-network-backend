const db = {
    'user': [
        {
            id: 1,
            name: 'Carlos'
        },
        {
            id: 2,
            name: 'Samuel'
        }
    ]
};

const list = async (table) => {
    return db[table] || [];
};

const get = async (table, id) => {
    let col = await list(table);
    return col.find((item) => item.id == id);
};

const upsert = (table, data) => {
    if (!db[table]) {
        db[table] = [];
    }
    db[table].push(data);

    console.log(db);
};

const remove = async (table, id) => {
    return true;
};

const query = async (table, params) => {
    let col = await list(table);

    let keys = Object.keys(params);
    const key = keys[0];
    return col.find((item) => item[key] === params[key]);
};

module.exports = {
    list,
    get, 
    upsert,
    remove, 
    query
};