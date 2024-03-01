var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    $('#level-title').text(`Level ${level++}`)
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $(`.${randomChosenColor}`).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    userClickedPattern = [];
    console.log(gamePattern);
}

function playSound(name){
    var sound = new Audio(`./sounds/${name}.mp3`);
    sound.play();
}

function animatePress(currentColor){
    $(`.${currentColor}`).addClass('pressed');
    setTimeout(function(){
        $(`.${currentColor}`).removeClass('pressed');
    }, 100)
}

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (currentLevel === gamePattern.length-1){
            setTimeout(nextSequence, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200)
        $("h1").text("Game Over, Press any key to restart");
        startOver();
    }
}

function startOver(){
    gamePattern = [];
    userClickedPattern = [];
    level = 0;
    started = false;
}

$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

$(document).on('keypress', function(){
    if (started === false){
        nextSequence();
    }
    started = true;
});


