var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var answer = false;
$(document).keypress(function() {
  if (!answer) {
    $("#level-title").text("Level " + level);
    nextSequence();
    answer = true;
  }
});
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  animatePress(userChosenColour);
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel-1]==userClickedPattern[currentLevel-1]){
      answer=true;
    }else{
      var wrongAudio = new Audio("sounds/wrong.mp3");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").html("Game Over, Press Any Key to Restart");
      startOver();
      break;
    }
  }
}
  if (userClickedPattern.length===gamePattern.length){
    setTimeout(nextSequence,1000);
  }
  if(answer==false){
    var wrongAudio = new Audio("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").html("Game Over, Press Any Key to Restart");
    startOver();
  }
}
function startOver(){
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
}
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
