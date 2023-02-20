import { Json } from 'sequelize/types/utils';
import UserModel from '../../infrastructure/database/postgresql/models/user.model';
import { UserTypes } from '../../utils/user_types';

class UserClass {
  id?: string;
  name: string;
  last_name: string;
  rut: string;
  phone: string;
  address: Json;

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.last_name = user.last_name;
    this.rut = user.rut;
    this.phone = user.phone;
    this.address = user.address;
  }
}

export default UserClass;
