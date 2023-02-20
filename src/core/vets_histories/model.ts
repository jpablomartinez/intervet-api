class VetHistory {
  history_vet_id?: string;
  vet_id: string;
  base_university: string;
  speciality: string;
  speciality_university: string;
  experience_years?: number;
  work_history?: string;

  constructor(
    history_vet_id: string,
    vet_id: string,
    base_university: string,
    speciality: string,
    speciality_university: string,
    experience_years: number,
    work_history: string
  ) {
    this.history_vet_id = history_vet_id;
    this.vet_id = vet_id;
    this.base_university = base_university;
    this.speciality = speciality;
    this.speciality_university = speciality_university;
    this.experience_years = experience_years;
    this.work_history = work_history;
  }
}

export default VetHistory;
