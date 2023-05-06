'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('comments', {
      comment_id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        unique: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },
      user_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          references: {
              model: 'users',
              key: 'user_id'
          }
      },
      vet_id: {
          allowNull: false,
          primaryKey: true,
          type: Sequelize.DataTypes.UUID,
          references: {
              model: 'vets',
              key: 'vet_id'
          }
      },
      comment: {
          allowNull: false,
          type: Sequelize.DataTypes.TEXT,
          defaultValue: ''
      },
      rating: {
          allowNull: false,
          type: Sequelize.DataTypes.FLOAT,
          defaultValue: 1
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
