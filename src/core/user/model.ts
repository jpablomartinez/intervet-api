import { Json } from 'sequelize/types/utils';
import { UserState } from '../../utils/user_state';
import { UserTypes } from '../../utils/user_types';
import IUser from './interface';

class User implements IUser {
  id: string;
  name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  address: Json;
  user_type: UserTypes;
  user_state: UserState;
  password: string;

  constructor(
    id: string,
    name: string,
    last_name: string,
    rut: string,
    email: string,
    phone: string,
    address: Json,
    user_type: UserTypes,
    user_state: UserState,
    password: string
  ) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.rut = rut;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.user_type = user_type;
    this.user_state = user_state;
    this.password = password;
  }
}

export default User;
