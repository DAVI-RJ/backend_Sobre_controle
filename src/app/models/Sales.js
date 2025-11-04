import Sequelize, { Model } from "sequelize";

class Sales extends Model{
  static init (sequelize){
    super.init({
      valor_sales: Sequelize.DECIMAL(10.2),
      sales_date: Sequelize.DATE,
      id_customer: Sequelize.INTEGER,
      quantity: Sequelize.INTEGER,  
      status: Sequelize.ENUM("completed", "pending", "canceled"),
      observations: Sequelize.TEXT
    },
    {
      sequelize,
      tableName: "sales",
      timestamps: true,
      underscored: true
    }); 
  }
  static associations(models){
    this.belongsTo(models.Customers),
    this.belongsToMany(models.Product, {
      through: models.SalesProducts,
      foreignKey: "id_sale", 
      otherKey: "id_product"
    });
  }
}

export default new Sales; 