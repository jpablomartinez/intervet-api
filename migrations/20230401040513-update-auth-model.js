'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /*await queryInterface.addColumn(
      'auth',
      'user_id',
      {
        allowNull: true,
        type: Sequelize.DataTypes.UUID,
        defaultValue: Sequelize.DataTypes.UUIDV1,
        unique: true
      }
    ),*/
    await queryInterface.addColumn(
      'auth',
      'refresh_token',
      {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        defaultValue: ''
      }
    )
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
