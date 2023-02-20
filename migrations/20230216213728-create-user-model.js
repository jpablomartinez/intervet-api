'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      user_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: ''
      },
      last_name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },
      rut: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
        defaultValue: Sequelize.DataTypes.STRING
      },      
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },
      address: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.DataTypes.JSON,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
      }
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
