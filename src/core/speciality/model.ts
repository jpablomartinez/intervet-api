class Speciality {
  speciality_id?: string | undefined;
  name: string;
  description: string;

  constructor(speciality_id: string, name: string, description: string) {
    this.speciality_id = speciality_id;
    this.name = name;
    this.description = description;
  }
}

export default Speciality;
