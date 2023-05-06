'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('admins', {
      admin_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },    
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      lastname: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      rut: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING
      },
      type: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'basic'
      },
      backup_email: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        defaultValue: ''
      },
      phone: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        defaultValue: ''
      },
      birthdate: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
        defaultValue: Sequelize.DataTypes.NOW
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
