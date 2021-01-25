const db = require('../../data/dbConfig');

const USERS_TABLE = 'users';

const getByID = (id) => {
    return db.table(USERS_TABLE)
        .where('id', id)
        .first();
};

const getByUsername = (username) => {
    return db.table(USERS_TABLE)
        .where('username', username)
        .first();
};

const addUser = async (data) => {
    let [id] = await db.table(USERS_TABLE)
        .insert(data);

    return getByID(id);
};

module.exports = {
    getByUsername,
    addUser,
    getByID
};