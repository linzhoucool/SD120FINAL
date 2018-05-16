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

/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make 
 * writing app.js a little simpler to work with.
 */

var Engine = (function(global) {
    /* Predefine the variables we'll be using within this scope,
     * create the canvas element, grab the 2D context for that canvas
     * set the canvas elements height/width and add it to the DOM.
     */
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    /* This function serves as the kickoff point for the game loop itself
     * and handles properly calling the update and render methods.
     */
    function main() {
        /* Get our time delta information which is required if your game
         * requires smooth animation. Because everyone's computer processes
         * instructions at different speeds we need a constant value that
         * would be the same for everyone (regardless of how fast their
         * computer is) - hurray time!
         */
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        /* Call our update/render functions, pass along the time delta to
         * our update function since it may be used for smooth animation.
         */
        update(dt);
        render();

        /* Set our lastTime variable which is used to determine the time delta
         * for the next time this function is called.
         */
        lastTime = now;

        /* Use the browser's requestAnimationFrame function to call this
         * function again as soon as the browser is able to draw another frame.
         */
        win.requestAnimationFrame(main);
    }

    /* This function does some initial setup that should only occur once,
     * particularly setting the lastTime variable that is required for the
     * game loop.
     */
    function init() {
        reset();
        lastTime = Date.now();
        main();
    }

    /* This function is called by main (our game loop) and itself calls all
     * of the functions which may need to update entity's data. Based on how
     * you implement your collision detection (when two entities occupy the
     * same space, for instance when your character should die), you may find
     * the need to add an additional function call here. For now, we've left
     * it commented out - you may or may not want to implement this
     * functionality this way (you could just implement collision detection
     * on the entities themselves within your app.js file).
     */
    function update(dt) {
        updateEntities(dt);
        // checkCollisions();
    }

    /* This is called by the update function and loops through all of the
     * objects within your allEnemies array as defined in app.js and calls
     * their update() methods. It will then call the update function for your
     * player object. These update methods should focus purely on updating
     * the data/properties related to the object. Do your drawing in your
     * render methods.
     */
    function updateEntities(dt) {
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }

    /* This function initially draws the "game level", it will then call
     * the renderEntities function. Remember, this function is called every
     * game tick (or loop of the game engine) because that's how games work -
     * they are flipbooks creating the illusion of animation but in reality
     * they are just drawing the entire screen over and over.
     */
    function render() {
        /* This array holds the relative URL to the image used
         * for that particular row of the game level.
         */
        var rowImages = [
                'images/water-block.png',   // Top row is water
                'images/stone-block.png',   // Row 1 of 3 of stone
                'images/stone-block.png',   // Row 2 of 3 of stone
                'images/stone-block.png',   // Row 3 of 3 of stone
                'images/grass-block.png',   // Row 1 of 2 of grass
                'images/grass-block.png'    // Row 2 of 2 of grass
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        // Before drawing, clear existing canvas
        ctx.clearRect(0,0,canvas.width,canvas.height)

        /* Loop through the number of rows and columns we've defined above
         * and, using the rowImages array, draw the correct image for that
         * portion of the "grid"
         */
        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                /* The drawImage function of the canvas' context element
                 * requires 3 parameters: the image to draw, the x coordinate
                 * to start drawing and the y coordinate to start drawing.
                 * We're using our Resources helpers to refer to our images
                 * so that we get the benefits of caching these images, since
                 * we're using them over and over.
                 */
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }

    /* This function is called by the render function and is called on each game
     * tick. Its purpose is to then call the render functions you have defined
     * on your enemy and player entities within app.js
     */
    function renderEntities() {
        /* Loop through all of the objects within the allEnemies array and call
         * the render function you have defined.
         */
        allEnemies.forEach(function(enemy) {
            enemy.render();
        });

        player.render();
    }











    
    /* This function does nothing but it could have been a good place to
     * handle game reset states - maybe a new game menu or a game over screen
     * those sorts of things. It's only called once by the init() method.
     */
    function reset() {
        // noop
    }

    /* Go ahead and load all of the images we know we're going to need to
     * draw our game level. Then set init as the callback method, so that when
     * all of these images are properly loaded our game will start.
     */
    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-boy.png'
    ]);
    Resources.onReady(init);

    /* Assign the canvas' context object to the global variable (the window
     * object when run in a browser) so that developers can use it more easily
     * from within their app.js files.
     */
    global.ctx = ctx;
})(this);

/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function() {
    var resourceCache = {};
    var loading = [];
    var readyCallbacks = [];

    /* This is the publicly accessible image loading function. It accepts
     * an array of strings pointing to image files or a string for a single
     * image. It will then call our private image loading function accordingly.
     */
    function load(urlOrArr) {
        if(urlOrArr instanceof Array) {
            /* If the developer passed in an array of images
             * loop through each value and call our image
             * loader on that image file
             */
            urlOrArr.forEach(function(url) {
                _load(url);
            });
        } else {
            /* The developer did not pass an array to this function,
             * assume the value is a string and call our image loader
             * directly.
             */
            _load(urlOrArr);
        }
    }

    /* This is our private image loader function, it is
     * called by the public image loader function.
     */
    function _load(url) {
        if(resourceCache[url]) {
            /* If this URL has been previously loaded it will exist within
             * our resourceCache array. Just return that image rather
             * re-loading the image.
             */
            return resourceCache[url];
        } else {
            /* This URL has not been previously loaded and is not present
             * within our cache; we'll need to load this image.
             */
            var img = new Image();
            img.onload = function() {
                /* Once our image has properly loaded, add it to our cache
                 * so that we can simply return this image if the developer
                 * attempts to load this file in the future.
                 */
                resourceCache[url] = img;

                /* Once the image is actually loaded and properly cached,
                 * call all of the onReady() callbacks we have defined.
                 */
                if(isReady()) {
                    readyCallbacks.forEach(function(func) { func(); });
                }
            };

            /* Set the initial cache value to false, this will change when
             * the image's onload event handler is called. Finally, point
             * the image's src attribute to the passed in URL.
             */
            resourceCache[url] = false;
            img.src = url;
        }
    }

    /* This is used by developers to grab references to images they know
     * have been previously loaded. If an image is cached, this functions
     * the same as calling load() on that URL.
     */
    function get(url) {
        return resourceCache[url];
    }

    /* This function determines if all of the images that have been requested
     * for loading have in fact been properly loaded.
     */
    function isReady() {
        var ready = true;
        for(var k in resourceCache) {
            if(resourceCache.hasOwnProperty(k) &&
               !resourceCache[k]) {
                ready = false;
            }
        }
        return ready;
    }

    /* This function will add a function to the callback stack that is called
     * when all requested images are properly loaded.
     */
    function onReady(func) {
        readyCallbacks.push(func);
    }

    /* This object defines the publicly accessible functions available to
     * developers by creating a global Resources object.
     */
    window.Resources = {
        load: load,
        get: get,
        onReady: onReady,
        isReady: isReady
    };
})();
