let ch; // character class instance
let player1; // player instance
let Goku; // Goku image holder
let Saibaman; // Saibaman image holder
let gokuBlack; // Boss enemy image
let BACKDROP; // Background holder
let homeSCREEN; // home screen 
let timer; // home screen timer = 5 secs
let instructions; // instrucions screen
let font; // declare saiyan-sans font 
let enemies = []; // global array that holds enemies
let numEnemies = 10;
let song; // holds dbz tune
let bossTimer; // spawns boss after 5 seconds;
let playerScore =0; // player score holder
let playerHealth; // players health bar
let gameOVER; // finishing screen
let win; // true or false 
let kiBlast; // player bullet audio
let Victory; // victory music
let endSongTimer = 90;
let win_gif_load, win_gif_create, lose_gif_load, lose_gif_create; // different images to be displayed if win or lose

function setup() {
  createCanvas(700, 470);
  timer = 60 * 10  ; // set timer to 10 seconds
  bossTimer = 60 * 5; // set boss timer 
  bossTimer--; // start boss timer
  song.play(); // play song
  playerScore = 0;
  playerHealth = 100;
  
  
  player1 = new Player(
    createVector(width / 2 - 50, height / 2),
    createVector(0, 0) );

  for (let x = 0; x < numEnemies; x++) {
    if (x < 1) {
    enemies[x] = new BossEnemy( 
        createVector(random(width - 220, width-170),random(200,height-200)),                     createVector(0,random(-10,10)), 165,220,6); 
  }
    else
       // assign Saibamen to enemy array
     enemies[x] = new BasicEnemy(
    createVector( random(width - 150, width-80),random(50,height-150) ),
    createVector( random(-5,-3),random(-3,3)),60,40,2);
  }
  
  
  homeSCREEN   = new homeScreen();
  instructions = new instructionsScreen();
  gameOVER     = new gameOver();
  
} // setup

function draw() {
  timer--; // start homescreen timer
  
  if(timer <= 600 && timer > 360) homeSCREEN.update(); // display home screen for 5 secs
  
  else if (timer <= 360 && timer > 0) instructions.update(); // show rules for 5 secs
  
    else gameOn();// start game 
  
  if (playerHealth <= 0 || playerScore <= -10) {
    
    win = false;
    gameOVER.drawScreen(win);
    noLoop(); // cease
  }
    
    else if (playerHealth > 0 && enemies.length <= 0) {
      win = true;
      gameOVER.drawScreen(win);
    }
  
} // end draw

function preload() {
  Goku      = loadImage("FILES/Goku.png");
  Saibaman  = loadImage("FILES/Saibaman.png");
  BACKDROP  = loadImage("FILES/GAMEBACKGROUND.jpg");
  gokuBlack = loadImage("FILES/gokuBlack.png");
  font      = loadFont('FILES/Saiyan-Sans.ttf');
  song      = loadSound('FILES/DBZTUNE.mp3');
  kiBlast   = loadSound("FILES/kiblast.mp3");
  Victory   = loadSound("FILES/victory.mp3");
  win_gif_load   = loadImage("FILES/winGif.gif");
  lose_gif_load = loadImage("FILES/loseGif.gif")
  
  
}

// play game function:
function gameOn() {
  BACKDROP.resize(width, height); // fit screen
  image(BACKDROP, 0, 0); // set background to DBZ world tournament setting
  
      let upAcc = createVector(0, -0.5);
      let downAcc = createVector(0, 0.5);
      let leftAcc = createVector(-0.5, 0);
      let rightAcc = createVector(0.5, 0);
  
  // update methods
  player1.drawCharacter();
  player1.drawHealth();
  player1.update();
  
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
    for(let j = i +1; j < enemies.length; j++){
      enemies[i].handleCollision(enemies[j]);
      } // inner for
  } // outer for

  if      (up)     player1.accelerate(upAcc);
  else if (down)   player1.accelerate(downAcc);
  else if (left)   player1.accelerate(leftAcc);
  else if (right)  player1.accelerate(rightAcc);
} // end gameOn