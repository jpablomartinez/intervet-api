export const enum AnimalSize {
  Small = 'Small',
  Medium = 'Medium',
  Big = 'Big'
}

export function getAnimalSizeByOption(option: string) {
  switch (option) {
    case 'Small':
      return AnimalSize.Small;
    case 'Medium':
      return AnimalSize.Medium;
    case 'Big':
    default:
      return AnimalSize.Big;
  }
}
