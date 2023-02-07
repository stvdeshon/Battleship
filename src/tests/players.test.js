export default class Player {
  constructor(name) {
    this.name = name;
  }

  humanAttack() {
    //player can click on eligible coordinates
  }

  computerAttack() {
    //computer automatically chooses eligible coordinates
  }
}

//can either make a single attack function conditional on if player name is 'computer'
//or make two separate functions and set the logical flow elsewhere
