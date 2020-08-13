const db = require('../db-config.js');

function find() {
    return db('users').orderBy('id');
}

function findBy(filter) {
    return db('users').where(filter).first();
}

function add(user) {
    db('users').insert(user).then(ids => {
        return findById(ids[0]);
      });
    }

    function findById(id) {
        return db('users')
          .where({ id })
          .first();
      }
      


function update(changes, id) {
}

function remove(id) {
}

module.exports = {
    find,
    findBy,
    add,
    findById
}
