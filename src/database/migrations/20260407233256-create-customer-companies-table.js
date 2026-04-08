'use strict';

export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customer_companies', {
      customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customers',
          key: 'id_customer' 
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'companies',
          key: 'id'  
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    // Adicionar chave composta para evitar duplicatas (N:N)
    await queryInterface.addIndex('customer_companies', ['customer_id', 'company_id'], {
      unique: true
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('customer_companies');
  }
};