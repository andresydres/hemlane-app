
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Todos', [
      {
        id: 0,
        userId: 0,
        text: 'buy eggs',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 1,
        userId: 0,
        text: 'buy milk',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        userId: 1,
        text: 'buy meat',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        userId: 1,
        text: 'buy vegi',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        userId: 2,
        text: 'buy eggs',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        userId: 2,
        text: 'buy apples',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        userId: 3,
        text: 'buy ham',
        order: 0,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 7,
        userId: 3,
        text: 'buy bananas',
        order: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    
  }
};