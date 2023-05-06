'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('logs', {
      log_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },    
      auth_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        references: {
          model: 'auth',
          key: 'auth_id'
        },
        onDelete: 'cascade'
      },
      reason: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
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
