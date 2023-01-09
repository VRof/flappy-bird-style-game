var block = document.getElementById("block");
var hole = document.getElementById("hole");
var char = document.getElementById("character");

var soundtrack = document.getElementById("soundtrack");
soundtrack.loop = true;
var playFlag = false;
var pause = false;
var muteBtn = document.getElementById("muteBtn");

var jumping = 0; //jumpp flag
var score = 0; //game score

/*pause event handler */
document.addEventListener('keydown', function (event) {
    if (event.key == 'p' || event.key == 'P') {
        pause = !pause;
        if (pause) {
            block.style.animationPlayState = 'paused';
            hole.style.animationPlayState = 'paused';
        }
        else {
            block.style.animationPlayState = 'running';
            hole.style.animationPlayState = 'running';
        }

    }
});

/*generate columns*/
hole.addEventListener('animationiteration', () => {
    if (!pause) {
        var rand = -(Math.random() * 300 + 150);
        hole.style.top = rand + "px";
        score++;
    }
});

/*animation and collisions*/
setInterval(function () {
    if (!pause) {
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
    }
}, 12);

/*click callback function */
function jump() {
    if (!pause) {
        if (playFlag == false)
            soundtrack.play();
        playFlag = true
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
}

/** mute/unmute button handler */
function mute() {
    soundtrack.muted = !soundtrack.muted;
    if (soundtrack.muted)
        muteBtn.style.background = 'url(res/sound.png)';
    else
        muteBtn.style.background = 'url(res/mute.png)';

    muteBtn.style.backgroundSize = 50 + 'px';
    muteBtn.style.width = 50 + 'px';
    muteBtn.style.height = 50 + 'px';
}
