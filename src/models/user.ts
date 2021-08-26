import { Association, Model, DataTypes, Optional } from 'sequelize';
import { db } from '.';
import Password from '../utils/password';

export interface UserAttributes {
  id: number;
  name: string;
  password?: string;
  is_admin: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public password!: string;
  public is_admin!: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

User.init(
  {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    tableName: 'users',
    sequelize: db.sequelize,
    underscored: true,
    paranoid: true,
  }
);

User.prototype.toJSON = function () {
  let values = Object.assign({}, this.get());

  delete values.password;
  return values;
};

async function setUserPassword(instance: User) {
  const { password } = instance;

  const hashed = await Password.hash(password);

  instance.setDataValue('password', hashed);
}

User.addHook('beforeCreate', setUserPassword);
User.addHook('beforeUpdate', setUserPassword);

// User.hasMany(models.Session, { foreignKey: "UserId" });
// User.belongsTo(models.Role);
