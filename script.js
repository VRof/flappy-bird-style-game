var block = document.getElementById("block");
var hole = document.getElementById("hole");
var char = document.getElementById("character");
var scoreText = document.getElementById("score");

var jumping = 0; //jumpp flag
var score = 0; //game score

/*generate columns*/
hole.addEventListener('animationiteration', () => {
    var rand = -(Math.random() * 300 + 150);
    hole.style.top = rand + "px";
    scoreText.style.content = "score: " + score;
    score++;
});

/*animation and collisions*/
setInterval(function () {
    var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
    if (jumping == 0) {
        char.style.top = charTop + 3 + "px"; //gravity
    }

    var blockLeftSide = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    var invertedCharTop = -(500 - charTop);
    //collisions check
    if ((charTop > 470 || blockLeftSide < 35) && blockLeftSide > -50 && (invertedCharTop < holeTop || invertedCharTop > holeTop + 125)) {
        score == 0 ? score = 0 : score--;
        alert("Game over, your score: " + score);
        char.style.top = 100 + "px";
        score = 0;
    }
}, 12);

/*click callback function */
function jump() {
    jumping = 1;
    var jumpCount = 0;
    var jumpInterval = setInterval(function () {
        var charTop = parseInt(window.getComputedStyle(char).getPropertyValue("top"));
        if (charTop > 6 && jumpCount < 15) {
            char.style.top = charTop - 5 + "px";
        }
        if (jumpCount > 20) {
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    });
}