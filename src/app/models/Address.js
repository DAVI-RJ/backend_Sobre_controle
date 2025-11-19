import Sequelize, { Model} from "sequelize"; 


class Address extends Model {
  static init (sequelize){
    super.init ({
      street: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      number: {
        type: Sequelize.STRING(15),
        defaultValue: 0, 
      }, 
      neighborhood: {
        type: Sequelize.STRING(40),
        allowNull: false, 
      },
      city: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
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
    this.hasMany(models.Customers);
  }
}

export default Address; 