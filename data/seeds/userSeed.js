
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'kirk', password: '12345'},
        {id: 2, username: 'spock', password: '12345'},
        {id: 3, username: 'bones', password: '12345'}
      ]);
    });
};
