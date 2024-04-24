class gameOver {
  constructor() {}

  drawScreen(win) {
    if (!win) {
      song.stop();
      
      push();
        lose_gif_create   = createImg("FILES/loseGif.gif", " ");
      image(lose_gif_load, 0, 0)
      lose_gif_create.position(100, 50);
      pop();

      push();
      fill(0);
      noStroke();
      rect(0,0, width, height);

      fill(215,39,215);
      textSize(60);
      stroke("rgb(255,178,229)");
      strokeWeight(random(5,10));
      text("GAME OVER", width / 2, height / 2 +120);

      textSize(30);
      text("The enemies killed you!", width / 2, height / 2 + 175);
      pop();

      noLoop();
    } 
      else {
      push();
        win_gif_create   = createImg("FILES/winGif.gif", " ");
      image(win_gif_load, 0, 0)
      win_gif_create.position(100, 50);
      pop();
      
      push();
      song.stop();
      fill(0);
      rect(0, 0, width, height);

      fill("rgb(72,165,236)");
        stroke("rgb(127,226,254)");
        strokeWeight(2);
      textFont("Times New Roman");
        textSize(40);
      text("WINNER!", width / 2, height / 2 +110);
      text("You defeated all the enemies", width / 2, height / 2 + 145);
      text("SCORE: " + playerScore, width / 2, height / 2 + 180);
      pop();
      // noLoop();
    }
  } // end draw
} // end class
