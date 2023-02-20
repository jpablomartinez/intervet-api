import { AnimalSize } from '../../utils/animal_size';

///species:
///dog, cat, huron, birds, rabbit, horse
///ask which type of domestic pet are the most commune
class Animal {
  animal_id?: string;
  breed: string;
  specie: string;
  size: AnimalSize;

  constructor(
    animal_id: string,
    breed: string,
    specie: string,
    size: AnimalSize
  ) {
    this.animal_id = animal_id;
    this.breed = breed;
    this.specie = specie;
    this.size = size;
  }
}

export default Animal;
