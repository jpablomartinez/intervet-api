'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('favorite_vets', {
      user_id: {
        type: Sequelize.DataTypes.UUID,
        primaryKey: true,
        references: {
            model: 'users',
            key: 'user_id'
        },
        onDelete: 'cascade'
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
