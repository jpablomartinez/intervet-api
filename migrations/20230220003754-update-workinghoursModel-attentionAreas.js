'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("working_hours" , {
      working_hour_id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.DataTypes.UUID,
        unique: true,
        defaultValue: Sequelize.DataTypes.UUIDV1
      },
      day: {
          allowNull: false,
          type: Sequelize.DataTypes.INTEGER
      },
      start_at: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
      },
      end_at: {
          allowNull: false,
          type: Sequelize.DataTypes.STRING
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
    });
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
