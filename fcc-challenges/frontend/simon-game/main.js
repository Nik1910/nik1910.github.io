// JS for Simon Game

// Object to store information about the game
var game = {

  // Stores count, if count equals 20, the game will be over  
  count: 0,

  // Possibilities to choose from  
  possibilities: ["#red", "#green", "#blue", "#yellow"],

  // Stores moves which are generated by the "generateMove" function  
  currentGame: [],

  // Stores players' moves to compare with "currentGame"  
  player: [],

  // Stores sounds to play when they are clicked  
  sound: {
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    yellow: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'),
  },

  // Stores information about mode of the game, strict or not  
  strict: false,
}

// Starts the new game when the "go" button is clicked, and changes text of the button
$("#go").click(function () {
  newGame();
  $(this).html("Reset");
});

// Runs the "right" and "clearGame" functions
function newGame() {
  right();
  clearGame();
}

// Clears the game properties and runs the "addCount" function
function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

// Adds 1 to the "count", shows player level of the game by using animation effects and runs the "generateMove" function
function addCount() {
  game.count++;
  $("#clickNumber").addClass("animated fadeOutDown");

  setTimeout(function () {
    $("#clickNumber").removeClass("fadeOutDown").html(game.count).addClass("fadeInDown");
  }, 200);

  generateMove();
}

// Generates random moves, adds them to "game.currentGame" and shows them
function generateMove() {
  game.currentGame.push(game.possibilities[(Math.floor(Math.random() * 4))]);
  showMoves();
}

// Shows the player moves to repeat
function showMoves() {

  // Stores a value to loop through "currentGame"  
  var i = 0;

  // Sets an interval to display every 0,6 sec moves 
  var moves = setInterval(function () {

    // Runs the "playGame" function which takes data from "game.currentGame"  
    playGame(game.currentGame[i]);

    // Adds 1 to "i" to keep looping  
    i++;

    // If "i" is bigger or equals to the length of "game.currentGame", it clears the interval and stops looping    
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600)

  // Clears players' moves which is stored in "game.player" 
  clearPlayer();
}

// Gets the elements from "game.currentGame" and lightens them during 0,3 sec
function playGame(field) {
  $(field).addClass("hl");
  // Depending on the element, plays a correspodning sound  
  sound(field);
  setTimeout(function () {
    $(field).removeClass("hl");
  }, 300);
}

// Clears players' moves
function clearPlayer() {
  game.player = [];
}

// Runs every time player clicks on squares
function addToPlayer(id) {

  // Variable to store ids with hashtag that JS can define them as JS ids  
  var field = "#" + id;

  // Adds the ids to "game.player" to check later whether the player does everything right or not 
  game.player.push(field);

  // Runs the "playerTurn" function  
  playerTurn(field);
}

// Checks the inputs from the player and tells whether the player wins or loses
function playerTurn(x) {

  // If the last players' input in the "game.player" isn't the same as the last computers' input in the "game.currentGame" 
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {

    // And if the strict mode has been activated    
    if (game.strict) {

      // Runs the "wrongStrict" function and tells the player to start again from the 1st level  
      wrongStrict();
    }

    // If the strict mode is off, it just shows the player moves again and tells that the player isn't right   
    else {
      wrong();
      showMoves();
    }
  }

  // If everything goes right, it plays the sounds  
  else {
    sound(x);

    // Then if the lengths of "game.player" and "game.CurrentGame" are the same, and if the "count" equals 20, it tells the player that he's a winner   
    var check = game.player.length === game.currentGame.length;
    if (check) {
      if (game.count === 20) {
        won();
      }
      // Otherwise, if the player does everything right and "count" isn't 20, it tells him to go on and adds 1 to "count"      
      else {
        right();
        nextLevel();
      }
    }
  }
}

// Runs the "addCount" function
function nextLevel() {
  addCount();
}


// Turns off or turns on the strict mode
function strict() {

  // Changes text in the "go" button  
  $("#go").html("Reset");

  // Turns on strict mode  
  if (game.strict === false) {
    game.strict = true;
    $("#switcher").html("ON");
    $("#strict").removeClass("button-success").addClass("button-warning");
  }

  // Turns off strict mode  
  else {
    game.strict = false;
    $("#switcher").html("OFF");
    $("#strict").removeClass("button-warning").addClass("button-success");
  }

  // Starts new game 
  newGame();
}



// Plays sounds depending on what square(red,green etc.) is clicked
function sound(name) {
  switch (name) {
    case "#red":
      game.sound.red.play();
      break;

    case "#green":
      game.sound.green.play();
      break;

    case "#blue":
      game.sound.blue.play();
      break;

    case "#yellow":
      game.sound.yellow.play();
      break;
  };
}

// Functions to display whether the player is right,wrong or won in the bar below the squares by using animation effects
function right() {
  $("#status").removeClass("button-danger").addClass("button-info");
  $("#stattext").html("Yes!").addClass("animated fadeOutDown");

  setTimeout(function () {
    $("#stattext").removeClass("fadeOutDown").addClass("fadeInDown");
  }, 200);
}

function wrong() {
  $("#status").removeClass("button-info").addClass("button-danger");
  $("#stattext").html("No!").addClass("animated fadeOutDown");

  setTimeout(function () {
    $("#stattext").removeClass("fadeOutDown").addClass("fadeInDown");
  }, 200);
}

function wrongStrict() {

  $("#status").removeClass("button-info").addClass("button-danger");
  $("#stattext").html("No!").addClass("animated fadeOutDown");

  setTimeout(function () {
    $("#stattext").removeClass("fadeOutDown").addClass("fadeInDown");
  }, 200);
  game.currentGame = [];
  game.count = 0;
  addCount();
}


function won() {
  $("#status").removeClass("button-danger").addClass("button-info");
  $("#stattext").html("Won!").addClass("animated fadeOutDown");

  setTimeout(function () {
    $("#stattext").removeClass("fadeOutDown").addClass("fadeInDown");
  }, 200);
}