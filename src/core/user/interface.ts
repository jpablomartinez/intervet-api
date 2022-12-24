import { Json } from 'sequelize/types/utils';
import { UserState } from '../../utils/user_state';
import { UserTypes } from '../../utils/user_types';

interface IUser {
  id?: string;
  name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  address: Json;
  user_type: UserTypes;
  user_state: UserState;
  password: string;
}

export default IUser;
