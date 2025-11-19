import Sequelize, { Model } from "sequelize";

class Companies extends Model {
  static init(sequelize) {
    super.init({
      cnpj: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      representative:{
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(15)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "canceled"),
        defaultValue: "active",
      }, 
      address_id: {
        type: Sequelize.INTEGER,
        field: "address_id", 
      }
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