import { Json } from 'sequelize/types/utils';
import Address from '../address/model';
import IUser from '../user/interface';

class Veterinary implements IUser {
  user_id: string;
  name: string;
  last_name: string;
  rut: string;
  email: string;
  phone: string;
  address: Json;
  type: UserTypes;
  user_state: UserState;
  vet_id: string;
  contact_method: ContactMethod;
  work_phone: string;
  rating: number;
  about_me: string;
  to_home_value: number;
  po_to_home_value: number;
  favorites_amount: number;
  calculate_rating: number;
  best_comment: string;
  is_validated: boolean;

  constructor(
    user_id: string,
    name: string,
    last_name: string,
    rut: string,
    email: string,
    phone: string,
    address: Json,
    type: UserTypes,
    state: UserState,
    vet_id: string,
    contact_method: ContactMethod,
    work_phone: string,
    rating: number,
    about_me: string,
    to_home_value: number,
    po_to_home_value: number,
    favorites_amount: number,
    calculate_rating: number,
    best_comment: string,
    is_validated: boolean
  ) {
    this.user_id = user_id;
    this.name = name;
    this.last_name = last_name;
    this.rut = rut;
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.type = type;
    this.vet_id = vet_id;
    this.contact_method = contact_method;
    this.work_phone = work_phone;
    this.rating = rating;
    this.about_me = about_me;
    this.to_home_value = to_home_value;
    this.po_to_home_value = po_to_home_value;
    this.favorites_amount = favorites_amount;
    this.calculate_rating = calculate_rating;
    this.best_comment = best_comment;
    this.is_validated = is_validated;
    this.user_state = state;
  }
}
