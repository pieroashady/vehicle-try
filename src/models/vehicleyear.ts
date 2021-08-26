import { Association, Model, DataTypes, Optional } from 'sequelize';
import { db } from '.';
import { Pricelist } from './pricelist';

export interface VehicleYearAttributes {
  id: number;
  year: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface VehicleYearCreationAttributes extends Optional<VehicleYearAttributes, 'id'> {}

export class VehicleYear extends Model<VehicleYearAttributes, VehicleYearCreationAttributes> implements VehicleYearAttributes {
  public id!: number;
  public year!: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;

  public readonly vehicle_years?: [];
  public readonly pricelist?: [];

  public static associations: {
    //vehicle_year: Association<VehicleYear, Pricelist>;
    pricelist: Association<VehicleYear, Pricelist>;
  };
}

VehicleYear.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'vehicle_years',
    sequelize: db.sequelize,
    underscored: true,
    paranoid: true,
  }
);

VehicleYear.hasMany(Pricelist, {
  foreignKey: 'vehicle_year_id',
  as: 'pricelist',
});

Pricelist.belongsTo(VehicleYear, {
  targetKey: 'id',
  foreignKey: 'vehicle_year_id',
  as: 'vehicle_year',
});
