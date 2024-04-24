class homeScreen {
  constructor() {
    this.switcher = 0;
  }

  drawMe() {
    this.switcher++;
    if (this.switcher > 5) this.switcher = 0; // reset

    rect(0, 0, width, height);
    if (this.switcher <= 2) fill(17, 123, 207, 160); // blue
    else fill(248, 149, 40, 160); // orange
  }

  write() {
    textFont(font);
    textSize(width/7.5);
    textAlign(CENTER, CENTER);
    text("DRAGON BALL Z", width/2, height/2 - 80);
    textSize(width/4);
    text("HEROES", width/2, height/2+30);
  }

  update() {
    this.drawMe();
    this.write();
  }
} // end class
