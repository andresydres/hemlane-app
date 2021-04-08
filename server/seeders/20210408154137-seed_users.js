

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        id: 0,
        userName: 'Winnie',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1,
        userName: 'Brad',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userName: 'Bob',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userName: 'Thomas',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};
