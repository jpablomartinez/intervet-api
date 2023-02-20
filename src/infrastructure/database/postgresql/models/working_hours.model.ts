import { DataTypes, Model } from 'sequelize';
import WorkingHour from '../../../../core/working_hours/model';
import { Workday } from '../../../../utils/working_day';
import { sequelize } from '../db_instance';
import VeterinaryModel from './veterinary.model';

class WorkingHoursModel extends Model<WorkingHour> implements WorkingHour {
  public working_hour_id?: string | undefined;
  public vet_id!: string;
  public day!: Workday;
  public start_at!: string;
  public end_at!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

WorkingHoursModel.init(
  {
    working_hour_id: {
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
        model: VeterinaryModel,
        key: 'vet_id'
      },
      onDelete: 'cascade'
    },
    day: {
      allowNull: false,
      type: DataTypes.NUMBER
    },
    start_at: {
      allowNull: false,
      type: DataTypes.STRING
    },
    end_at: {
      allowNull: false,
      type: DataTypes.STRING
    }
  },
  {
    tableName: 'working_hours',
    sequelize
  }
);

export default WorkingHoursModel;
