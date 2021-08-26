import { Association, Model, DataTypes, Optional } from 'sequelize';
import { db } from '.';
import { Pricelist } from './pricelist';
import { VehicleType } from './vehicletype';

export interface VehicleModelAttributes {
  id: number;
  name: string;
  vehicle_type_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface VehicleModelCreationAttributes extends Optional<VehicleModelAttributes, 'id'> {}

export class VehicleModel extends Model<VehicleModelAttributes, VehicleModelCreationAttributes> implements VehicleModelAttributes {
  public id!: number;
  public name!: string;
  public vehicle_type_id!: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

  public readonly vehicle_types?: [];
  public readonly pricelist?: [];

  public static associations: {
    vehicle_types: Association<VehicleType, VehicleModel>;
    pricelist: Association<VehicleModel, Pricelist>;
  };
}

VehicleModel.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    vehicle_type_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'vehicle_models',
    sequelize: db.sequelize,
    underscored: true,
    paranoid: true,
  }
);

VehicleModel.hasMany(Pricelist, {
  foreignKey: 'vehicle_model_id',
  as: 'pricelist',
});

Pricelist.belongsTo(VehicleModel, {
  targetKey: 'id',
  foreignKey: 'vehicle_model_id',
  as: 'vehicle_models',
});
