module.exports = {
  up: queryInterface => {
    return queryInterface.renameTable('usersAdmins', 'users_admins');
  },

  down: queryInterface => {
    return queryInterface.renameTable('users_admins', 'usersAdmins');
  },
};
