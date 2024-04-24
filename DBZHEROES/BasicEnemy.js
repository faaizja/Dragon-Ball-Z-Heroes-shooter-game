class BasicEnemy extends Character {
  constructor(pos, vel, cHeight, cWidth, cHealth) {
    super(pos, vel, cHeight, cWidth, cHealth); // super constructor
    //cHeight = height/6
    //cWidth = width/8
    //cHealth = 2
    this.dead = false;
  }

  drawCharacter() {
    push();
    translate(this.pos.x, this.pos.y);
    ellipse(0,0,this.cWidth, this.cHeight); // test ellipse
    Saibaman.resize(this.cWidth, this.cHeight);
    image(Saibaman,-20, -27);
    pop();
  }

  move() {
    this.pos.add(this.vel);
  }

  handleCollision(other) {
    
    if (this.pos.dist(other.pos) <
      this.cWidth / 2 + other.cWidth /2) {
      let angle = atan2(this.pos.y - other.pos.y, this.pos.x - other.pos.x);
      let avgSpeed = (this.vel.mag() + other.vel.mag()) / 2;

      this.vel.set(avgSpeed * cos(angle), avgSpeed * sin(angle));
      other.vel.set(avgSpeed * cos(angle- PI), avgSpeed * sin(angle - PI));
    } 
    
  } // handle

  handleWalls() {
    if (this.pos.x  - 20 < 0 || this.pos.x  + 20 > width) {
      this.vel.x *= -1;
    }

    if (this.pos.y - 30 < 0 ||
      this.pos.y + 30 > height) {
      this.vel.y *= -1;
    }
  } // handle walls

  gotHit(thisEnemy) {
    this.cHealth--;
    if (this.cHealth <= 0) {
      this.dead = true; 
      this.murder(thisEnemy); // call kill method 
    }
  } // got hit

  murder(i) {
    enemies.splice(i, 1);
    playerScore += 1; 
    print("murdered saibaman");
  }

  update() {
    this.drawCharacter();
    this.move();
    this.handleWalls();
  }
} // end class
