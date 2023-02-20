'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('attention_areas', {
      attention_area_id: {
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
      region: {
          type: Sequelize.DataTypes.STRING,
          allowNull: false
      },
      commune: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
    });
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
