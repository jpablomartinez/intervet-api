export const enum UserState {
  ToValidated = 'ToValidated',
  Active = 'Active',
  Suspended = 'Suspended',
  Deleted = 'Deleted',
  Undefined = 'Undefined'
}

export function getUserStateByString(userState: string) {
  if (userState === 'ToValidated') return UserState.ToValidated;
  else if (userState === 'Active') return UserState.Active;
  else if (userState === 'Suspended') return UserState.Suspended;
  else if (userState === 'Deleted') return UserState.Deleted;
  else return UserState.Undefined;
}
