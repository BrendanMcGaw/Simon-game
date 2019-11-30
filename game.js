var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;
var started = false;

//             Game Starter
//---------------------------------------
// on pressing of any key, will start the game.
if (started == false) {
  $(document).on("keydown", function() {
    $("#level-title").html("level " + level);
    nextSequence();
    started = true;
  });
}
else {
  //---------------------------------------
  // --------------------------------------
  // unbinds keydown event for starting game.
  $(document).on("keydown", function() {
    $(this).unbind();
  });
}

function restartGame() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}

//             Runs Next Level
//---------------------------------------
// Assuming answer was right, runs the next sequence in the chain.
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * buttonColours.length);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(200).fadeOut(200).fadeIn(200);
  playSound(randomChosenColour);

  $("#level-title").html("Level: " + level++);
  buttonsClickedHandler();
}

//
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success!");

    if (gamePattern.length === userClickedPattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 500);
    }

  } else {
    console.log("Wrong!");
    restartGame();
    animateWrong();
    playWrongSound();
  }
}

// Handles operation of the click event. Submitting the user clicked button as the next iteration of the userClickedPattern.
function buttonsClickedHandler(userChosenColour) {
  $(".btn").unbind().on("click", function() {
    userChosenColour = $(this).attr("id"); // this is .btn classes ID that has been clicked by the user.
    userClickedPattern.push(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
    playSound(userChosenColour);
    animatePress(userChosenColour);

  });
}

function animateWrong() {
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
    }, 200);
    $("h1").html("Game Over! Press any key to restart.");
}

// Plays sound when pattern is false.
function playWrongSound() {
  var wrongSound = new Audio ("sounds/wrong.mp3");
  wrongSound.play();
}
// Plays sound on click of each button.
function playSound(name) {
  var colourSoundClip = new Audio("sounds/" + name + ".mp3");
  colourSoundClip.play();
}

// Flashes the icon that is next in the pattern.
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
