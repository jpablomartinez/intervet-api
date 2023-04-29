
///species:
///dog, cat, huron, birds, rabbit, horse
///ask which type of domestic pet are the most commune
class Animal {
  animal_id?: string;  
  specie: string;  

  constructor(
    animal_id: string,    
    specie: string,    
  ) {
    this.animal_id = animal_id;    
    this.specie = specie;    
  }
}

export default Animal;
