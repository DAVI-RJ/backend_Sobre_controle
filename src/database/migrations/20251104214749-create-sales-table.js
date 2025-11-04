'use strict';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales', { 
      id_sales:{
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
      },
      valor_sales: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false,
      
      },
      sales_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("completed", "pending", "canceled"),
        defaultValue: "pending",
      },
      observations: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {models: "customers", key: "id_customer"},  
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('sales');
  }
};
