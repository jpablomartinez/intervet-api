import { ContactMethod } from '../../utils/contact_method';

class Veterinary {
  vet_id?: string;
  name: string;
  last_name: string;
  rut: string;
  work_phone: string;
  rating?: number;
  about_me: string;
  to_home_value: number;
  po_to_home_value: number;
  favorites_amount?: number;
  best_comment?: string;
  is_validated?: boolean;
  speciality?: string;

  constructor(
    vet_id: string,
    name: string,
    last_name: string,
    rut: string,
    work_phone: string,
    rating: number,
    about_me: string,
    to_home_value: number,
    po_to_home_value: number,
    favorites_amount: number,
    best_comment: string,
    is_validated: boolean,
    speciality: string
  ) {
    this.vet_id = vet_id;
    this.name = name;
    this.last_name = last_name;
    this.rut = rut;
    this.work_phone = work_phone;
    this.rating = rating;
    this.about_me = about_me;
    this.to_home_value = to_home_value;
    this.po_to_home_value = po_to_home_value;
    this.favorites_amount = favorites_amount;
    this.best_comment = best_comment;
    this.is_validated = is_validated;
    this.speciality = speciality;
  }
}

export default Veterinary;
