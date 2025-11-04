import Sequelize, { Model } from "sequelize";

class Customers extends Model {
  static init(sequelize) {
    super.init({
      cnpj_customer: Sequelize.STRING(18),
      name_customer: Sequelize.STRING(100),
      phone_customer: Sequelize.STRING(15),
      email: Sequelize.STRING(100),
      situation: Sequelize.ENUM("enum_companies_status"), 
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
  }
}

export default Customers; 