import Sequelize, { Model } from "sequelize";

class SalesModels extends Model{
  static init (sequelize){
    super.init({
      valor_sales: Sequelize.DECIMAL(10.2)
    },
    {
      sequelize,
      tableName: "sales",
      timestamps: true,
      underscored: true
    }); 
  }
  static 
}

export default new SalesModels; 