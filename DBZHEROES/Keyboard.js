let up = false;
let down = false;
let left = false;
let right = false;

function keyPressed(){
  if      (keyCode == UP_ARROW)   up = true;
  else if (keyCode == DOWN_ARROW)   down = true;
  else if (keyCode == LEFT_ARROW)   left = true;
  else if (keyCode == RIGHT_ARROW)   right = true;
  
  if (key == ' ') {
    player1.shoot();
    kiBlast.play(); // sound effect
  } // shoot at enemy
}

function keyReleased(){
  if      (keyCode == UP_ARROW)   up = false;
  else if (keyCode == DOWN_ARROW)   down = false;
  else if (keyCode == LEFT_ARROW)   left = false;
  else if (keyCode == RIGHT_ARROW)   right = false;
}
  
