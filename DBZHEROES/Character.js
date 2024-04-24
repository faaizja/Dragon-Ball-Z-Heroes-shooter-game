class Character {
  
  constructor(pos,vel,cHeight,cWidth,cHealth) {
    this.pos = pos;
    this.vel = vel;
    this.cHeight = cHeight; // character's height
    this.cWidth = cWidth;   // character's width
    this.cHealth = cHealth; // character's health points
  }

  moveCharacter() {
    
  }

  accelerate(acc) {

  }

  drawCharacter() {
    
  }

  hitCharacter() {
    
  }

  decreaseHealth() {
    
  }

  checkWalls() {
    
  }

  update() {
    this.moveCharacter();
    this.checkWalls();
  }
  
}
