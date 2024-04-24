class instructionsScreen {
  constructor() {
    this.timerDisplay = 0;
  }

  drawMe() {
    fill(0);
    rect(0, 0, width, height);
  }

  write() {
    noStroke();
    textAlign(CENTER, TOP);
    textFont(font);
    textSize(width / 6);
    fill("rgb(255,145,0)");
    text("Instructions", width / 2, 65);

    textFont("Verdana");
    textSize(30);
    text("Move with the arrow keys", width / 2, height / 2 - 45);

    textSize(25);
    text("Press the spacebar to shoot", width / 2, height / 2);

    textSize(25);
    text("Dodge the enemies and shoot em' down to win!",width / 2, height / 2 + 45);
    
    textSize(20);
    text("Don't get hit more than 10 times!",width / 2, height / 2 + 80);
    
    textSize(100);
    stroke(255);
    textFont("Chiller");
    strokeWeight(5);
    text(int(timer/60), width / 2, height / 2 + 110);
  }

  update() {
    this.drawMe();
    this.write();
  }
} // end class
