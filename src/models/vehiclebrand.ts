import { Association, Model, DataTypes, Optional } from 'sequelize';
import { db } from '.';
import { Pricelist } from './pricelist';
import { VehicleModel } from './vehiclemodel';
import { VehicleType } from './vehicletype';

export interface VehicleBrandAttributes {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface VehicleBrandCreationAttributes extends Optional<VehicleBrandAttributes, 'id'> {}

export class VehicleBrand extends Model<VehicleBrandAttributes, VehicleBrandCreationAttributes> implements VehicleBrandAttributes {
  public id!: number;
  public name!: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

  public readonly vehicle_typesz?: [];

  public static associations: {
    vehicle_types: Association<VehicleBrand, VehicleType>;
    vehicle_models: Association<VehicleType, VehicleModel>;
    pricelist: Association<VehicleModel, Pricelist>;
  };
}

VehicleBrand.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: 'vehicle_brands',
    sequelize: db.sequelize,
    underscored: true,
    paranoid: true,
  }
);

VehicleBrand.hasMany(VehicleType, {
  sourceKey: 'id',
  foreignKey: 'vehicle_brand_id',
  as: 'vehicle_types',
});

VehicleType.belongsTo(VehicleBrand, {
  foreignKey: 'vehicle_brand_id',
  as: 'vehicle_brands',
});
