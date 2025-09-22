import Sequelize, { Model} from "sequelize"; 


class Address extends Model {
  static init (sequelize){
    super.init ({
      street: Sequelize.STRING(100),
      number: Sequelize.STRING(10), 
      neighborhood: Sequelize.STRING(100),
      city: Sequelize.STRING(100),
      state: Sequelize.STRING(100), 
      zip: Sequelize.STRING(10)
    },
    {
      sequelize,
      tableName: "addresses",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.hasMany(models.Companies);
    this.hasMany(models.Suppliers);
  }
}

export default Address; 