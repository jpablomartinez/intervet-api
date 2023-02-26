'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('vet_services', {
      vet_service_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },
      vet_id: {
          type: Sequelize.DataTypes.UUID,
          primaryKey: true,
          references: {
              model: 'vets',
              key: 'vet_id'
          },
          onDelete: 'cascade'
      },
      name_service: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        defaultValue: ''
      },
      price: {
          type: Sequelize.DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0
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