export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("companies", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      cnpj: {
        type: Sequelize.STRING(18),
        unique: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      representative: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      phone: {
        type: Sequelize.STRING(18),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM("active", "inactive", "canceled"),
        defaultValue: "active",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      address_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        Reference: { models: "addresses", key: "id" },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable("companies")
  },
}
