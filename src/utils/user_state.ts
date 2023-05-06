export const enum UserState {
  ToValidated = 'ToValidated',
  PendingForReview = 'PendingForReview',
  Active = 'Active',
  Suspended = 'Suspended',
  Deleted = 'Deleted',
  Rejected = 'Rejected',
  Undefined = 'Undefined'
}

export function getUserStateByString(userState: string) {
  if (userState === 'ToValidated') return UserState.ToValidated;
  else if (userState === 'Active') return UserState.Active;
  else if (userState === 'PendingForReview') return UserState.PendingForReview;
  else if (userState === 'Suspended') return UserState.Suspended;
  else if (userState === 'Deleted') return UserState.Deleted;
  else return UserState.Undefined;
}

export function isValidUserState(states: string[]){
  for(var s of states){
    if(s != 'ToValidated' && s != 'Active' && s != 'Suspended' && s!= 'Deleted' && s!= 'All' && s!= 'Rejected') return false;
  }
  return true;
}