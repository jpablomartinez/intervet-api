'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('specialties', {
      speciality_id: {
        type: Sequelize.DataTypes.UUID,
        unique: true,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },
      name: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false,
      },
      description: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      createdAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW,
        allowNull: false
      },
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
