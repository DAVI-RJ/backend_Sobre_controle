import Sequelize, { Model } from "sequelize";

class Products extends Model {
  static init(sequelize) {
    super.init({
  // expor nomes mais amigáveis no JS e mapear para as colunas da tabela
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'id_product'
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
        field: 'name_product'
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      price: {
        type: Sequelize.DECIMAL(10,2),
        allowNull: false
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      company_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'company_id'
      }
    },
    {
      sequelize,
      tableName: "products",
      timestamps: true,
      underscored: true
    });
  }
  static associate(models){
    this.belongsTo(models.Companies, { foreignKey: 'company_id', targetKey: 'id' });
    this.belongsToMany(models.Sales, {
      through: models.SalesProducts, 
      foreignKey: "id_product",
      otherKey: "id_sales"
    });
  }
}

export default Products; 