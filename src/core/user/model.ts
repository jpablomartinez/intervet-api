import { Json } from 'sequelize/types/utils';
import IUser from './interface';

class User implements IUser {
  user_id?: string | undefined;
  name: string;
  last_name: string;
  rut: string;
  phone: string;
  address: Json;
  

  constructor(
    user_id: string,
    name: string,
    last_name: string,
    rut: string,
    phone: string,
    address: Json
  ) {
    this.user_id = user_id;
    this.name = name;
    this.last_name = last_name;
    this.rut = rut;
    this.phone = phone;
    this.address = address;
  }
}

export default User;
