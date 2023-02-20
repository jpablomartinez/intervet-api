export const enum ContactMethod {
  WorkNumber = 'WorkNumber',
  WhatsApp = 'WhatsApp',
  Email = 'Email',
  Instagram = 'Instagram'
}

export function getContactMethodByOption(option: string) {
  switch (option) {
    case 'WorkNumber':
      return ContactMethod.WorkNumber;
    case 'WhatsApp':
      return ContactMethod.WhatsApp;
    case 'Instagram':
      return ContactMethod.Instagram;
    case 'Email':
      return ContactMethod.Email;
    default:
      return ContactMethod.WorkNumber;
  }
}
