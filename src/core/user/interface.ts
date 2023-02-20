import { Json } from 'sequelize/types/utils';

interface IUser {
  user_id?: string;
  name: string;
  last_name: string;
  rut: string;
  phone: string;
  address: Json;
}

export default IUser;
