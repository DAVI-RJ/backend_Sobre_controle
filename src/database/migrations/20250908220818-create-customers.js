'use strict';

export default {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("customers", { 
      id_customer: {
        type: Sequelize.INTEGER,
        allowNull: false, 
        primaryKey: true, 
        autoIncrement: true
      },
      cnpj_customer: {
        type: Sequelize.STRING(18),
        unique: true,
        allowNull: false
      },
      name_customer: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email_customer: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false
      },
      phone_customer: {
        type: Sequelize.STRING(15),
        allowNull: false
      },
      status: {
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
      await queryInterface.dropTable('customers');
    }
};
