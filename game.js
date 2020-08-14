var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;

function nextSequence()
{
    userClickedPattern = [];
    level++;
    $("#level-title").text("level "+ level);
    var randomNumber = Math.random()*4;
    randomNumber = Math.floor(randomNumber);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    
} 
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});  

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){$("#"+currentColour).removeClass("pressed")},100);
}

$(document).keydown(function()
{
    if(level === 0)
    {
        nextSequence();
    }
    
});

$(document).on("tap",function(){
    if(level === 0)
    {
        nextSequence();
    }
});


function checkAnswer(currentLevel)
{
    
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel])
    {
        console.log("success");
        if(userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){
                nextSequence();
            } , 1000);
        }
    }
    else
    {
        startOver();
    }
}

function startOver()
{
        var gameOverAudio = new Audio("sounds/wrong.mp3");
        gameOverAudio.play();
        $("body").addClass("game-over");
        setTimeout(function(){$("body").removeClass("game-over")},200);
        level = 0;
        $("#level-title").text("Game Over, Press Any Key to Restart");
        gamePattern=[];
        userClickedPattern =[];
        console.log("fail");
}
