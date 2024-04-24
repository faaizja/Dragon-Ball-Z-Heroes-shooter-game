class Projectile {
  constructor(pos, vel, isBoss, alive) {
    this.pos = pos;
    this.vel = vel;
    this.dia = 20;
    this.isBoss = isBoss; // if true, display boss type projectile
    this.incr = 0;
    this.alive = alive; // state of this bullet
    this.scaleTimer = 60;
  }

  drawMe() {
    if (this.isBoss) {
      push();
      strokeWeight(4);
      stroke(2);
      translate(this.pos.x, this.pos.y); // shoot from tip of scythe
      fill(random(150, 200), random(50, 70), random(220, 255), random(90, 250));
      this.scaleTimer--;
      if (this.scaleTimer <= 0) {
        scale(2.5);
      }
      rotate((this.incr += 10));
      ellipse(0, 0, this.dia, this.dia + this.dia / 2);
      pop();
    } // if
    else {
      // player bullet
      push();
      strokeWeight(2);
      translate(this.pos.x - 22, this.pos.y + 23); // shoot from right hand
      fill(random(255), random(255), random(255));
      circle(0, 0, this.dia);
      pop();
    }
  } // draw

  move() {
    this.pos.add(this.vel);
  }

  handleWalls(a) {
    if (!this.isBoss) {
      // player projectile gets spliced when out of bounds
      if (
        this.pos.x < 0 ||
        this.pos.x > width + 20 ||
        this.pos.y < 0 - 20 ||
        this.pos.y > height + 15 || (!this.alive) ) {
        player1.projectileArray.splice(a, 1);
        print("Player projectiles active: " + player1.projectileArray.length);
      } // inner if
    } else if (this.isBoss) {
      if (
        this.pos.x < 0 - 30 ||
        this.pos.x > width - 10 ||
        this.pos.y < 0 - 50 ||
        this.pos.y > height + 30 || (!this.alive)) {
        enemies[0].enemyProjectiles.splice(a, 1);
        print("boss bullet spliced");
      }
    } // else if
  } // handle walls

  hit(thisCharacter, i) {
    
    //detect hit to saibamen 
    if(!this.isBoss) {
    if (this.alive) {
       if (abs(this.pos.x - thisCharacter.pos.x) < this.dia / 2 && 
           abs(this.pos.y - thisCharacter.pos.y) < this.dia / 2) {
         
        thisCharacter.gotHit(i);
         this.alive = false;
      }
    }
    } // outer if
    
    // detect hit to boss
     if (!this.isBoss) {
      if (this.alive) {
         if (abs(this.pos.x - thisCharacter.pos.x) < this.dia && 
             abs(this.pos.y - thisCharacter.pos.y) < this.dia) {
          thisCharacter.gotHit(i);
           this.alive = false;
       }
        
      }
       
    }
    
    // detect hit to player
    if (this.isBoss) {
      if (this.alive) {
        if (abs(this.pos.x - thisCharacter.pos.x) < this.dia && 
             abs(this.pos.y - thisCharacter.pos.y) < this.dia) {
          player1.gotHit(i);
           this.alive = false;
        }
      }
  }
    
  } // end hit

  update() {
    this.drawMe();
    this.move();
    this.handleWalls();
  }
  
} // end class
