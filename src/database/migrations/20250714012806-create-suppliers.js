'use strict';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("suppliers", { 
      id_supplier: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
      },
      cnpj_supplier: {
        type: Sequelize.STRING(18),
        unique: true,
        allowNull: false
      },
      name_supplier: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email_supplier: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      phone_supplier: {
        type: Sequelize.STRING(18),
        allowNull: false
      },
      status_supplier: {
        type: Sequelize.ENUM("active", "inactive", "canceled"), 
        defaultValue: "active",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: {models: "addresses", key: "id"},  
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      }
    });
  },

  async down (queryInterface) {
    await queryInterface.dropTable('suppliers');
  }
};