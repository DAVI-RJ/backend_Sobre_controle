'use strict';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('products', { 
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true,
        autoIncrement: true
      },
      name_product: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER, 
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {models: "companies", key: "id"},  
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('products');
  }
};
