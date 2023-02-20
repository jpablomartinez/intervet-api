import { DataTypes, Model } from 'sequelize';
import AttentionArea from '../../../../core/attention_area/model';
import { sequelize } from '../db_instance';

class AttentionAreaModel extends Model<AttentionArea> implements AttentionArea {
  public attention_area_id?: string | undefined;
  public vet_id!: string;
  public region!: string;
  public commune!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

AttentionAreaModel.init(
  {
    attention_area_id: {
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
    region: {
      type: DataTypes.STRING,
      allowNull: false
    },
    commune: {
      type: DataTypes.STRING,
      allowNull: false
    },
  },
  {
    tableName: 'attention_areas',
    sequelize
  }
);

export default AttentionAreaModel;
