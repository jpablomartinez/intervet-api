export const enum Workday {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7
}

export function getWorkday(option: number) {
  switch (option) {
    case 1:
      return Workday.Monday;
    case 2:
      return Workday.Tuesday;
    case 3:
      return Workday.Wednesday;
    case 4:
      return Workday.Thursday;
    case 5:
      return Workday.Friday;
    case 6:
      return Workday.Saturday;
    case 7:
      return Workday.Sunday;
    default:
      return Workday.Monday;
  }
}
