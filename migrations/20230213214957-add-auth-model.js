'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("auth", {
      auth_id: {
        allowNull: false,        
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
      },
      email: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING,
          unique: false,
      },
      password: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
      },
      user_type: {
          allowNull: false,
          type: Sequelize.DataTypes.ENUM({
              values: ['PetOwner', 'Veterinary', 'Admin']
          })
      },
      user_state: {
          allowNull: false,
          type: Sequelize.DataTypes.ENUM({
              values: ['ToValidate', 'Active', 'Suspended', 'Deleted']
          })
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
