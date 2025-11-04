'use strict';
'use strict';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('sales_products', { 
      id_sales_products:{
        type: Sequelize.INTEGER, 
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
      },
      quantity_sold: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      price_at_sale: {
        type: Sequelize.DECIMAL(10,2),
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
      id_product: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        Reference: {models: "products", key: "id_product"},  
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      id_sales:{
        type: Sequelize.INTEGER, 
        allowNull: false, 
        Reference: {models: "sales", key: "id_sales"},  
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('sales_products');
  }
};
