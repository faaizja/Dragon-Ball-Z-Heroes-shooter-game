class Player extends Character {
  constructor(pos, vel, cHealth) {
    super(pos, vel, cHealth);
    this.characterHeight = 120; // new width
    this.characterWidth = 75; // new width
    this.slower = 0.55; // decelerater
    this.projectileArray = []; // store projectiles
  }

  drawCharacter() {
    // @override

    // character
    push();
    translate(this.pos.x, this.pos.y);
    strokeWeight(5);
    Goku.resize(this.characterWidth, this.characterHeight);
    // ellipse(0,0,this.characterWidth, this.characterHeight); // test ellipse
    image(Goku, -37, -60);
    pop();
  }

  drawHealth() {
    push();
    translate(this.pos.x - 50, this.pos.y - 80);
    noStroke();
    if (playerHealth >= 67) fill("rgb(17,228,17)");
    else if (playerHealth <= 66 && playerHealth >= 33) fill("#FFC029");
    else fill("red");
    textSize(10);
    textFont(font);
    rect(0, 0, playerHealth, 10);
    pop();
  } // draw health

  displayScore() {
  push();
    translate(90, 15);
    noStroke();
    fill(0,0,0,130);
  textStyle(BOLD);
    textFont("Verdana");
    textSize(30);
    text("Score: " + playerScore, 0, 0);
  pop();  
  }
  
  move() {
    this.pos.add(this.vel);
    if (!up && !down && !left && !right) this.vel.mult(this.slower);
  }

  accelerate(acc) {
    this.vel.add(acc);
  }

  handleWalls() {
    if (this.pos.x < 0) this.pos.x = width + this.characterWidth * 1.5;
    if (this.pos.x - this.characterWidth * 1.5 > width) this.pos.x = 0;
    if (this.pos.y + this.characterHeight + 25 < 0) this.pos.y = height - 20;
    if (this.pos.y > height) this.pos.y = 0 - this.characterHeight;
  }

  shoot() {
    let newProjectile = new Projectile(
      createVector(this.pos.x, this.pos.y),
      createVector(10, 0), false, true);
    this.projectileArray.push(newProjectile);
  }

  trackProjectiles() {
    for (let a = 0; a < this.projectileArray.length; a++) {
      this.projectileArray[a].update();
    } // for
    
    for (let j = 0; j < this.projectileArray.length; j++) {
      
      for (let i = 0; i < enemies.length; i++) {
        this.projectileArray[j].hit(enemies[i], i);
      } // inner
      
    } // outer
      
  } // track
  
  gotHit() {
    playerHealth--;
    textFont("Cambria");
        textStyle(BOLD);
        fill("red");
        noStroke();
        textSize(30);
        text("HIT", this.pos.x, this.pos.y - 90);
        playerScore--;
  }
  
  checkHealth() {
    for (let i = 0; i < enemies.length; i++) {
      if (
        dist(this.pos.x, this.pos.y, enemies[i].pos.x, enemies[i].pos.y) <
        (this.characterWidth / 2 || this.characterHeight) ) {
        playerHealth--;
        textFont("Cambria");
        textStyle(BOLD);
        fill("red");
        noStroke();
        textSize(30);
        text("HIT", this.pos.x, this.pos.y - 90);
        playerScore--;
        enemies[i].vel.mult(-1);
      }
    } // outer for
  } // check health

  update() {
    // @override super.update()
    this.move();
    this.displayScore();
    this.handleWalls();
    this.trackProjectiles();
    this.checkHealth();
    
  } // end update
    
} //end class
