import { Association, Model, DataTypes, Optional } from 'sequelize';
import { db } from '.';
import { VehicleBrand } from './vehiclebrand';
import { VehicleModel } from './vehiclemodel';

export interface VehicleTypeAttributes {
  id: number;
  name: string;
  vehicle_brand_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface VehicleTypeCreationAttributes extends Optional<VehicleTypeAttributes, 'id'> {}

export class VehicleType extends Model<VehicleTypeAttributes, VehicleTypeCreationAttributes> implements VehicleTypeAttributes {
  public id!: number;
  public name!: string;
  public vehicle_brand_id!: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

  public readonly vehicle_models?: [];

  public static associations: {
    vehicle_models: Association<VehicleType, VehicleModel>;
  };
}

VehicleType.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    vehicle_brand_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'vehicle_types',
    sequelize: db.sequelize,
    underscored: true,
    paranoid: true,
  }
);

VehicleType.hasMany(VehicleModel, {
  sourceKey: 'id',
  foreignKey: 'vehicle_type_id',
  as: 'vehicle_models',
});
