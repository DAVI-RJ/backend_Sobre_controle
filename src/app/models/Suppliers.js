import Sequelize, { Model } from "sequelize";

class Suppliers extends Model {
  static init(sequelize) {
    super.init({
      cnpj: Sequelize.STRING(18),
      name: Sequelize.STRING(100),
      phone: Sequelize.STRING(15),
      email: Sequelize.STRING(100),
      status: Sequelize.ENUM("enum_companies_status"), 
      address_id: Sequelize.INTEGER
    },
    {
      sequelize,
      tableName: "suppliers",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.belongsTo(models.Address);
  }
}

export default Suppliers; 