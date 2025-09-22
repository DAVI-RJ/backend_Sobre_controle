import Sequelize, { Model } from "sequelize";

class Products extends Model {
  static init(sequelize) {
    super.init({
      name_product: Sequelize.STRING(100),
      description: Sequelize.TEXT,
      price: Sequelize.DECIMAL(10,2),
      quantity: Sequelize.INTEGER, 
      company_id: Sequelize.INTEGER
    },
    {
      sequelize,
      tableName: "products",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.belongsTo(models.Companies);
  }
}

export default Products; 