import { Json } from 'sequelize/types/utils';
import Address from '../address/model';

class Veterinary {
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
  }
}

export default Veterinary;
