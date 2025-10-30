import Sequelize, { Model } from "sequelize";


class SalesProduct extends Model{
  static init(sequelize){
    super.init({
      id: Sequelize.STRING
    },
    {
      sequelize
    }
    ); 
  }
}

export default new SalesProduct; 