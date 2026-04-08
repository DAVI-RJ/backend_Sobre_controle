import Sequelize, { Model } from "sequelize";

class Customers extends Model {
  static init(sequelize) {
    super.init({
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true, 
        autoIncrement: true, 
        field: "id_customer"
      },
      cnpj: {
        type: Sequelize.STRING(18),
        field: "cnpj_customer"
      },
      name: {
        type: Sequelize.STRING(100),
        field: "name_customer"
      },
      phone: {
        type: Sequelize.STRING(15),
        field: "phone_customer"
      },
      email: {
        type: Sequelize.STRING(100),
        field: "email_customer"
      },
      situation: {
        type: Sequelize.ENUM("enum_companies_status"),
        field: "status"
      }, 
      address_id: Sequelize.INTEGER
    },
    {
      sequelize,
      tableName: "customers",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.belongsTo(models.Address);
    this.belongsToMany(models.Companies, {
      through: 'customer_companies',
      foreignKey: 'customer_id',
      otherKey: 'company_id'
    });
  }
}

export default Customers; 