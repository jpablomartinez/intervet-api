import { Json } from 'sequelize/types/utils';
import IUser from './interface';

class User implements IUser {
  user_id: string;
  name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  address: Json;
  type: UserTypes;
  user_state: UserState;

  constructor(
    id: string,
    name: string,
    last_name: string,
    rut: string,
    email: string,
    phone: string,
    address: Json,
    type: UserTypes,
    state: UserState
  ) {
    this.user_id = id;
    this.name = name;
    this.last_name = last_name;
    this.rut = rut;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.type = type;
    this.user_state = state;
  }
}

export default User;
