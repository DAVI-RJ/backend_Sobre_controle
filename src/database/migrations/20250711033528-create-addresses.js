export default {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable("addresses", {
    id: { 
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    street: {
      type: Sequelize.STRING(100), 
      allowNull: false,
    }, 
    number: {
      type: Sequelize.STRING(15),
    },
    neighborhood: {
      type: Sequelize.STRING(40),
    },
    city: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    state: {
      type: Sequelize.STRING(2), 
      allowNull: false
    },
    zip: {
      type: Sequelize.STRING(10)
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE
    },
   });
  },

  async down (queryInterface) {
    await queryInterface.dropTable("addresses");
  }
};
