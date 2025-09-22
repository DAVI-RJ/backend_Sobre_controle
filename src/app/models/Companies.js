import Sequelize, { Model } from "sequelize";

class Companies extends Model {
  static init(sequelize) {
    super.init({
      cnpj: Sequelize.STRING(18),
      name: Sequelize.STRING(100),
      representative: Sequelize.STRING(100),
      email: Sequelize.STRING(100),
      phone: Sequelize.STRING(15),
      password: Sequelize.STRING(255),
      status: Sequelize.ENUM("active", "inactive", "canceled"), 
      address_id: Sequelize.INTEGER
    },
    {
      sequelize,
      tableName: "companies",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.belongsTo(models.Address)
    this.hasMany(models.Product);
  }
}

export default Companies; 