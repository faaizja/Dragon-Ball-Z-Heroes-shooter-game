class BossEnemy extends Character {
  
  constructor(pos,vel, bossWidth, bossHeight, bossHealth) {
    super(pos,vel);
    this.bossWidth = bossWidth; // 75
    this.bossHeight = bossHeight; // 100
    this.bossHealth = bossHealth; // 6
    this.enemyProjectiles = [];
    this.timer = 60; // shoots after every second
    this.dead = false;
    this.murderTimer = 120;
    this.murderSpinner = 2;
  }
  
  drawBoss() {
    push();
    gokuBlack.resize(this.bossWidth, this.bossHeight);
    translate(this.pos.x + 100, this.pos.y);
    // ellipse(0,0,this.bossWidth,this.bossHeight) // test ellipse
    image(gokuBlack, -100,-110);
    pop();
  }
  
  move() {
    this.pos.add(this.vel);
  }
  
  handleWalls() {
    
    if (this.pos.x - 75/2 < 0 || this.pos.x  + 75/2 > width) {
        this.vel.x *= -1;
        }
    
    if (this.pos.y  - 50 < 0 || this.pos.y  + 50 > height) {
      this.vel.y *= -1;
    }
    
  } // handle walls
  
  handleCollision(other) {
     // no collision for boss
  } // handle collision
  
  shoot() {
      let playerPos = createVector(player1.pos.x, player1.pos.y); // bullet origin
      let direction = playerPos.copy().sub(this.pos).normalize(); // shoots at player
    
      let newProjectile = new Projectile(createVector(this.pos.x, this.pos.y), direction.mult(random(4,25)), true, true);
      this.enemyProjectiles.push(newProjectile);
    
    this.timer = 60; // reset timer
    
  } // shoot
  
  trackProjectiles() {
    for (let i =0; i <= this.enemyProjectiles.length - 1; i++) {
          this.enemyProjectiles[i].update(i);
      
        for (let x = 0; x< this.enemyProjectiles.length; x++) {
          this.enemyProjectiles[x].hit(player1);
        }
    } // for
  } // track
  
  gotHit(thisEnemy) {
    this.bossHealth--;
      if (this.bossHealth <= 0) {
        this.dead = true; 
        this.murder(thisEnemy); // call kill method 
      }
    } // got hit
  
  spinner() {
    let incr = 2;
    rotate(2);  
  }
  
    murder(i) {
      // display boss death animation here
      this.murderTimer--; // start murder timer
      
      //then splice
        enemies.splice(i, 1);
        playerScore += 3; 
        print("boss murdered");
    } // kill  
  
  update() {
    this.drawBoss();
    this.move();
    this.handleWalls();
    
    this.timer--;
    if (this.timer <= 0) {
      this.shoot();
    } // if
    
    this.trackProjectiles();
  } // update
  
} // end class