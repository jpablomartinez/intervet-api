import { DataTypes, Model } from 'sequelize';
import AboutVet from '../../../../core/about_vet/model';
import { sequelize } from '../db_instance';
import VeterinaryModel from './veterinary.model';

class AboutVetModel extends Model<AboutVet> implements AboutVet {
  public about_vet_id?: string | undefined;
  public vet_id?: string | undefined;
  public professional_title!: string;
  public professional_title_url!: string;
  public university!: string;
  public experience_years!: number;
  public about_me!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AboutVetModel.init(
  {
    about_vet_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    vet_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      references: {
        model: 'vets',
        key: 'vet_id'
      },
      onDelete: 'cascade'
    },
    university: {
      allowNull: false,
      type: DataTypes.STRING
    },
    professional_title: {
      allowNull: false,
      type: DataTypes.STRING
    },
    professional_title_url: {
      allowNull: false,
      type: DataTypes.STRING
    },
    experience_years: {
      allowNull: true,
      type: DataTypes.NUMBER,
      defaultValue: 0
    },
    about_me: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: ''
    }
  },
  {
    tableName: 'about_vet',
    sequelize
  }
);

AboutVetModel.hasOne(VeterinaryModel, {
  foreignKey: 'vet_id'
});

export default AboutVetModel;
