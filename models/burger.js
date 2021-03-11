const orm = require('../config/orm');

const burger = {
    selectAll(callback) {
        orm.selectAll('burgers', result => callback(result));
    },
    insertOne(columns, values, callback) {
        orm.insertOne('burgers', columns, values, result => callback(result));
    },
    updateOne(objectColumnValues, condition, callback) {
        orm.updateOne('burgers', objectColumnValues, condition, result => callback(result));
    },
};

module.exports = burger;