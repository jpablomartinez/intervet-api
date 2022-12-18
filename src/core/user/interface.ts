import { Json } from 'sequelize/types/utils';
import Address from '../address/model';

interface IUser {
  user_id: string;
  name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  address: Json;
  type: UserTypes;
  user_state: UserState;
}

export default IUser;
