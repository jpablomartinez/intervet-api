import { DataTypes, Model } from 'sequelize';
import Veterinary from '../../../../core/veterinary/model';
import { sequelize } from '../db_instance';
import AnimalModel from './animal_model';
import AttentionAreaModel from './attention_area.model';
import FavoriteVetModel from './favorite_vet_model';
import SpecialityModel from './speciality.model';
import UserModel from './user.model';
import VetServiceModel from './vet_service.model';
import WorkingHoursModel from './working_hours.model';

class VeterinaryModel extends Model<Veterinary> implements Veterinary {
  public vet_id?: string;
  public name!: string;
  public last_name!: string;
  public rut!: string;
  public work_phone!: string;
  public rating?: number;
  public about_me!: string;
  public to_home_value!: number;
  public po_to_home_value!: number;
  public favorites_amount?: number;
  public best_comment?: string;
  public is_validated?: boolean;
  public user_id!: string;
  public speciality!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

VeterinaryModel.init(
  {
    vet_id: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: true,
      type: DataTypes.UUID,
      unique: true,
      defaultValue: DataTypes.UUIDV1
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: ''
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false,
      defaultValue: DataTypes.STRING
    },
    rut: {
      allowNull: false,
      autoIncrement: false,
      primaryKey: false,
      type: DataTypes.STRING,
      unique: true,
      defaultValue: DataTypes.STRING
    },
    work_phone: {
      allowNull: true,
      type: DataTypes.STRING,
      defaultValue: ''
    },
    rating: {
      allowNull: true,
      type: DataTypes.DECIMAL,
      defaultValue: 0
    },
    about_me: {
      allowNull: false,
      type: DataTypes.TEXT
    },
    to_home_value: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    po_to_home_value: {
      allowNull: false,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    favorites_amount: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    best_comment: {
      allowNull: true,
      type: DataTypes.TEXT,
      defaultValue: ''
    },
    is_validated: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    speciality: {
      allowNull: false,
      type: DataTypes.STRING,
      defaultValue: 'Medicina General'
    }
  },
  {
    tableName: 'vets',
    sequelize
  }
);

VeterinaryModel.hasMany(WorkingHoursModel, { foreignKey: 'vet_id' });
WorkingHoursModel.belongsTo(VeterinaryModel, { foreignKey: 'vet_id' });

VeterinaryModel.hasMany(AttentionAreaModel, { foreignKey: 'vet_id' });
AttentionAreaModel.belongsTo(VeterinaryModel, { foreignKey: 'vet_id' });

VeterinaryModel.hasMany(VetServiceModel, { foreignKey: 'vet_id' });
VetServiceModel.belongsTo(VeterinaryModel, { foreignKey: 'vet_id' });

VeterinaryModel.belongsToMany(SpecialityModel, {
  through: 'VetSpeciality',
  foreignKey: 'vet_id'
});
SpecialityModel.belongsToMany(VeterinaryModel, {
  through: 'VetSpeciality',
  foreignKey: 'speciality_id'
});

UserModel.hasMany(FavoriteVetModel, {foreignKey: 'user_id'});
FavoriteVetModel.belongsTo(UserModel, {foreignKey: 'user_id', as: 'user'});

VeterinaryModel.hasMany(FavoriteVetModel, {foreignKey: 'vet_id'});
FavoriteVetModel.belongsTo(VeterinaryModel, {foreignKey: 'vet_id', as: 'vet'});

VeterinaryModel.belongsToMany(AnimalModel, {
  through: 'AnimalVet',
  foreignKey: 'vet_id',
  otherKey: 'animal_id'
});

AnimalModel.belongsToMany(VeterinaryModel, {
  through: 'AnimalVet',
  foreignKey: 'animal_id',
  otherKey: 'vet_id'
});


export default VeterinaryModel;
