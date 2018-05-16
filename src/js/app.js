var result = "";
// Variable to store and increase game score
var score = 0;
// Variable to store and decrease game lives, default value is 20
var lives = 20;


const randomize = function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
var Enemy = function (y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    this.x = randomize(200, 1010);
    this.y = y;
    this.WIDTH = 100;
    this.HEIGHT = 80;
    this.speed = randomize(200, 300);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    if (this.x > 1000) {
        this.x = randomize(-200, -100);
        this.speed = randomize(300, 500);
    }

    if ((player.x < this.x + 60 &&
            player.x + 40 > this.x) &&
        (player.y < this.y + 25 &&
            30 + player.y > this.y)) {
        player.x = 200;
        player.y = 300;

        lives = lives - 1;


        if(document.querySelector('h3').innerHTML==='game level 2'){
            this.speed=2
        }
        if(document.querySelector('h3').innerHTML==='game level 3'){
            this.speed=3

        }       
         if(document.querySelector('h3').innerHTML==='game level 4'){
            this.speed=4
        }
        if(document.querySelector('h3').innerHTML==='game level 5'){
            this.speed=5
        }
        if(document.querySelector('h3').innerHTML==='game level 6'){
            this.speed=6
        }
        if(document.querySelector('h3').innerHTML==='game level 7'){
            this.speed=7
        }

        if (score === 10) {
            result = "won";
        }
        if (lives === 0) {
            result = "lose";
            alert = 'you lost'


        }
    }
};


//This function draws the enemy on the screen.

Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.randomize = function (min, max) {
    return Math.floor((Math.random() * (min - max) + min));
}

var Player = function () {
    this.x = 200;
    this.y = 300;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function () {
    if (this.x > 400) {
        this.x = 400;
    }
    if (this.x < 0) {
        this.x = 0;
    }

    if (this.y > 420) {
        this.y = 420;
    }
    if (this.y < 0) {
        this.y = 300;
        score = score + 1;
    }

}

Player.prototype.render = function () {
    this.renderTopBoard();
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.renderTopBoard = function () {
    // display board with score and lives
    ctx.font = "16px Arial";
    ctx.fillText("Score: ", 20, 30);
    ctx.fillText("Live: ", 430, 30);
    ctx.font = "16px Arial";
    ctx.fillText(score, 70, 30);
    ctx.fillText(lives, 470, 30);
    ctx.save();
};
Player.prototype.handleInput = function (key) {
    console.log(key, this.x);
    if (key === 'left') {
        if (this.x === -6) {
            this.x = -6;
        } else {
            this.x -= 103;
        }
    }
    if (key === 'right') {
        if (this.x === 406) {
            this.x = 406;
        } else {
            this.x += 103;
        }
    }
    if (key === 'down') {
        if (this.y === 386) {
            this.y = 386;
        } else {
            this.y += 86;
        }
    }
    if (key === 'up') {
        if (this.y === -44) {
            this.y = -44;
        } else {
            this.y -= 86;
        }
    }
};







Player.prototype.Collision = function (allEnemy) {

}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy(50);
var enemy2 = new Enemy(120);
var enemy3 = new Enemy(200);
var enemy4 = new Enemy(50);
var enemy5 = new Enemy(120);
var enemy6 = new Enemy(200);

var allEnemies = [enemy1, enemy2, enemy3, enemy4, enemy5, enemy6];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);

});

let counter = 1 ;
function add(){
    return counter +=1;
}
const levelFunction=function(){
document.querySelector('h3').innerHTML=`game level ${add()}`;
player.y=300
}
