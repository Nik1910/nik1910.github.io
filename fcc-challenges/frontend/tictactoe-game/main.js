// JS for Tic Tac Toe Game

// Creating object to store information about the game and players 
var game = {
  first: true,
  user: "",
  computer: "",
  currentPlayer: "",
  moves: 1,
};

// Opens modal window to choose side
$(window).on("load", function () {
  setTimeout(function () {

    $.magnificPopup.open({
      items: {
        src: '.modal-window'
      },
      type: 'inline',
      removalDelay: 300,
      mainClass: 'my-mfp-zoom-in'
    });

  }, 1000);

});

function start() {
  $.magnificPopup.open({
    items: {
      src: '.modal-window'
    },
    type: 'inline',
    removalDelay: 300,
    mainClass: 'my-mfp-zoom-in'
  });
}

// Selects side
function selectModal(id) {
  if (id === "x") {

    // If the user selects cross, then it's set to the user, and circle is set to the computer    
    game.user = '<span class="fa fa-times"></span>';
    game.computer = '<span class="fa fa-circle-o"></span>';

    // Hides modal window
    $.magnificPopup.close();
  }

  // If the user selects circle, then it's set to the user, and cross is set to the computer   
  else if (id === "o") {
    game.user = '<span class="fa fa-circle-o"></span>';
    game.computer = '<span class="fa fa-times"></span>';

    // Hides modal window
    $.magnificPopup.close();
  }

  // Makes the first move 
  firstMove();

  // Set user as the current player   
  setCurrPl("user");
}

// In order to choose other side use this button
$("#otherSide").on("click", function () {
  start();
  selectModal();
  reset();
});


// Makes the first move 
function firstMove() {

  // First step is made by the computer in the 5th square
  $("#fifth").html(game.computer);

  // In order to prevent unnecessary clicking,it disables the "onclick" event in the square 
  $("#fifth").removeAttr("onclick");
}

// This function is run every time players click on squares
function icon(id) {

  // If the current player is user
  if (game.currentPlayer === "user") {

    // It gets the id of the square and passes circle or cross(depending on what the user chose) to that square
    $("#" + id).html(game.user);

    // The "onclick" event is removed    
    $("#" + id).removeAttr("onclick");

    // Checks if the user won or not   
    gameStatus();

    // Sets computer as the current player    
    setCurrPl("computer");

    // If current player is computer    
  } else if (game.currentPlayer === "computer") {

    // It gets the id of the square and passes circle or cross(depending on what the user chose) to that square
    $("#" + id).html(game.computer);

    // The "onclick" event is removed
    $("#" + id).removeAttr("onclick");

    // Checks if there is a winner or not
    gameStatus();

    // Sets user as the current player     
    setCurrPl("user");
  }

  // There are only 9 available moves in the game(due to a number of id's), so if "game.moves" equals 9, the game is over and  the "draw" function and then the "reset" function are run
  game.moves++;
  draw();

  // If the current player is the computer, it runs the "comp" function
  if (game.currentPlayer === "computer") {
    comp();
  }
}

// This function lets the computer think and make a move
function comp() {
  switch (true) {

    // If the first square isn't occupied neither the user nor the computer      
    case $("#first").html() !== game.user && $("#first").html() != game.computer:

      // The "icon" function is run and the computer occupies the square      
      icon("first");
      break;

      // The same happens to other squares      
    case $("#second").html() !== game.user && $("#second").html() !== game.computer:
      icon("second");
      break;
    case $("#third").html() !== game.user && $("#third").html() !== game.computer:
      icon("third");
      break;
    case $("#fourth").html() !== game.user && $("#fourth").html() !== game.computer:
      icon("fourth");
      break;
    case $("#fifth").html() !== game.user && $("#fifth").html() !== game.computer:
      icon("fifth");
      break;
    case $("#sixth").html() !== game.user && $("#sixth").html() !== game.computer:
      icon("sixth");
      break;
    case $("#seventh").html() !== game.user && $("#seventh").html() !== game.computer:
      icon("seventh");
      break;
    case $("#eighth").html() !== game.user && $("#eighth").html() !== game.computer:
      icon("eighth");
      break;
    case $("nineth").html() !== game.user && $("#nineth").html() !== game.computer:
      icon("nineth");
      break;
  }
};

// Blocks every square by removing the "onclick" event
function lockAll() {
  $(".game-field").removeAttr("onclick");
}

// Gets a parameter("user" or "computer") and sets it to "game.currentPlayer"
function setCurrPl(curr) {
  game.currentPlayer = curr;
}

// Checks if there is a winner or not
function gameStatus() {

  // Variable to store players' icon
  var curPlayer;

  // If the current player is user, the icon(cross or circle) the user chose is set to "curPlayer"
  if (game.currentPlayer == "user") {
    curPlayer = game.user;
  }

  // If the current player is computer, the icon(cross or circle) is set to "curPlayer"  
  else if (game.currentPlayer == "computer") {
    curPlayer = game.computer;
  }

  switch (true) {

    // If the first,the second and the third square are occupied by one of the players  
    case $("#first").html() === curPlayer && $("#second").html() === curPlayer &&
    $("#third").html() === curPlayer:

      // Runs the "show" function      
      show("#first", "#second", "#third");
      break;

      // Other combinations      
    case $("#fourth").html() === curPlayer && $("#fifth").html() === curPlayer &&
    $("#sixth").html() === curPlayer:
      show("#fourth", "#fifth", "#sixth");
      break;
    case $("#seventh").html() === curPlayer && $("#eighth").html() === curPlayer &&
    $("#nineth").html() === curPlayer:
      show("#seventh", "#eighth", "#nineth");
      break;
    case $("#first").html() === curPlayer && $("#fourth").html() === curPlayer &&
    $("#seventh").html() === curPlayer:
      show("#first", "#fourth", "#seventh");
      break;
    case $("#second").html() === curPlayer && $("#fifth").html() === curPlayer &&
    $("#eighth").html() === curPlayer:
      show("#second", "#fifth", "#eighth");
      break;
    case $("#third").html() === curPlayer && $("#sixth").html() === curPlayer &&
    $("#nineth").html() === curPlayer:
      show("#third", "#sixth", "#nineth");
      break;
    case $("#first").html() === curPlayer && $("#fifth").html() === curPlayer &&
    $("#nineth").html() === curPlayer:
      show("#first", "#fifth", "#nineth");
      break;
    case $("#third").html() === curPlayer && $("#fifth").html() === curPlayer &&
    $("#seventh").html() === curPlayer:
      show("#third", "#fifth", "#seventh");
      break;
    default:
      draw();
  }
};

// If all squares are occupied(all 9 moves were made),after 1 sec delay, runs the "reset" function 
function draw() {
  if (game.moves === 9) {
    setTimeout(reset, 1000);
  }
}

// Gets ids' of squares  
function show(x, y, z) {

  // Creates variables to store the ids
  var x = $(x),
    y = $(y),
    z = $(z);

  // And finally adds the "win" class(yellow font color)  
  x.addClass("win");
  y.addClass("win");
  z.addClass("win");

  // Locks all squares  
  lockAll();

  // And after 1 sec delay, runs the "reset" function   
  setTimeout(reset, 1000);
}

// Resets the game
function reset() {

  // Clears the squares  
  $(".game-field").html("");

  // Sets "game.moves" to the initial value   
  game.moves = 1;

  // Adds the "onclick" event back to squares  
  $(".game-field").attr("onclick", "icon(this.id)");

  // Removes the "win" class from the circle and cross  
  $(".win").removeClass("win");

  // After 0.2 sec delay, runs the "firstMove" function  
  setTimeout(firstMove, 200);
}