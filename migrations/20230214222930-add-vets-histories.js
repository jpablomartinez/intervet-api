'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('vets_histories', {
      vets_histories_id: {
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
      base_university: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
      },
      speciality_university: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
      },
      speciality: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
      },
      experience_years: {
          allowNull: true,
          type: Sequelize.DataTypes.INTEGER,
          defaultValue: 0
      },
      work_history: {
          allowNull: true,
          type: Sequelize.DataTypes.TEXT,
          defaultValue: ""
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
