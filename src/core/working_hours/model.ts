import { Workday } from '../../utils/working_day';

class WorkingHour {
  working_hour_id?: string;
  day: number;
  start_at: string;
  end_at: string;
  vet_id!: string;

  constructor(
    working_hour_id: string,
    day: number,
    start_at: string,
    end_at: string,
    vet_id: string
  ) {
    this.working_hour_id = working_hour_id;
    this.vet_id = vet_id;
    this.day = day;
    this.start_at = start_at;
    this.end_at = end_at;
  }
}

export default WorkingHour;
