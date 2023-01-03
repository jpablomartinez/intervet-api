import { Json } from 'sequelize/types/utils';
import UserModel from '../../infrastructure/database/postgresql/models/user.model';
import { UserTypes } from '../../utils/user_types';

class UserClass {
  id?: string;
  name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  address: Json;
  user_type: UserTypes;

  constructor(user: UserModel) {
    this.id = user.id;
    this.name = user.name;
    this.last_name = user.last_name;
    this.rut = user.rut;
    this.email = user.email;
    this.phone = user.phone;
    this.address = user.address;
    this.user_type = user.user_type;
  }
}

export default UserClass;
