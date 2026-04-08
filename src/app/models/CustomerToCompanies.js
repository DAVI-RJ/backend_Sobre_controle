import Sequelize, { Model } from "sequelize";

class CustomerToCompanies extends Model {
  static init(sequelize) {
    super.init({
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
      }
    }, {
      sequelize,
      tableName: "customer_companies",
      timestamps: true,
      underscored: true
    });
  }
}

export default CustomerToCompanies;
