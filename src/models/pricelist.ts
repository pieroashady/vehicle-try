import { Association, Model, DataTypes, Optional, IntegerDataType } from 'sequelize';
import { db } from '.';
import { VehicleModel } from './vehiclemodel';
import { VehicleYear } from './vehicleyear';

export interface PricelistAttributes {
  id: number;
  code: string;
  price: number;
  vehicle_year_id: number;
  vehicle_model_id: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface PricelistCreationAttributes extends Optional<PricelistAttributes, 'id'> {}

export class Pricelist extends Model<PricelistAttributes, PricelistCreationAttributes> implements PricelistAttributes {
  public id!: number;
  public code!: string;
  public price!: number;
  public vehicle_year_id!: number;
  public vehicle_model_id!: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

Pricelist.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    code: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.DOUBLE,
    },
    vehicle_year_id: {
      type: DataTypes.INTEGER,
    },
    vehicle_model_id: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'pricelist',
    sequelize: db.sequelize,
    underscored: true,
    paranoid: true,
  }
);
