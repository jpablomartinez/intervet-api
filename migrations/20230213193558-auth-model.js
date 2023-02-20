'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("auth", {
      auth_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV1
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
      await queryInterface.dropTable('working_hours');
      await queryInterface.dropTable('users');
      await queryInterface.dropTable('vets');
  }
};
