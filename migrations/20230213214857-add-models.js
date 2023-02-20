'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', { 
      user_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: ''
      },
      last_name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },
      rut: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
        defaultValue: Sequelize.DataTypes.STRING
      },      
      phone: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },
      address: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.DataTypes.JSON,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },      
    });
    await queryInterface.createTable('vets', {
      vet_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true
      },
      name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: ''
      },
      last_name: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
        unique: false,
        defaultValue: Sequelize.DataTypes.STRING
      },
      rut: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: false,
        type: Sequelize.DataTypes.STRING,
        unique: true,
        defaultValue: Sequelize.DataTypes.STRING
      },
      work_phone: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
        defaultValue: ''
      },
      rating: {
        allowNull: true,
        type: Sequelize.DataTypes.DECIMAL,
        defaultValue: 0
      },
      about_me: {
        allowNull: false,
        type: Sequelize.DataTypes.TEXT
      },
      to_home_value: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      po_to_home_value: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },
      favorites_amount: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
        defaultValue: 0
      },      
      best_comment: {
        allowNull: true,
        type: Sequelize.DataTypes.TEXT,
        defaultValue: ''
      },
      is_validated: {
        allowNull: false,
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: false
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
    });
  },

  async down (queryInterface, Sequelize) {
    
  }
};
