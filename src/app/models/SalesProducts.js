import Sequelize, { Model } from "sequelize";


class SalesProducts extends Model{
  static init(sequelize){
    super.init({
      quantity_sold: Sequelize.INTEGER,
      price_at_sale: Sequelize.DECIMAL(10,2)
    },
    {
      sequelize,
      tableName: "sales_products", 
      timestamps: true,
      underscored: true
    }
    ); 
  }
  static associate(models){
    this.belongsTo(models.Products, { foreignKey: 'id_product' });
    this.belongsTo(models.Sales, { foreignKey: 'id_sales' });
  }
}

export default SalesProducts; 