'use strict';
// Enemies 
var Enemy = function(initialX, initialY, speed) {
   
    this.x = initialX;
    this.y = initialY;
    this.speed = speed;
    
    this.sprite = 'images/enemy-bug.png';
};


Enemy.prototype.update = function(dt) {
    
    this.x = this.x + this.speed * dt;
    if (this.x > 500) {
        this.x = -60;
        this.randomSpeed();
    }
    var bugXLeftRange = this.x - 50;
    var bugXRightRange = this.x + 50;
    var bugYTopRange = this.y - 50;
    var bugYBottomRange = this.y + 50;

    if (player.x > bugXLeftRange && player.x < bugXRightRange && player.y > bugYTopRange && player.y < bugYBottomRange) {
        player.resetPlayerPosition();
    }
}


Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Enemy.prototype.randomSpeed = function() {
    var speedMultiply = Math.floor(Math.random() * 5 + 1);
    this.speed = 75 * speedMultiply;
}

// player
var playerInitialX = 200,
    playerInitialY = 400;


var Player = function() {
  
    this.x = playerInitialX;
    this.y = playerInitialY;
    this.wallChecker = {
        leftWall: false,
        rightWall: false,
        bottomWall: true
    };
    this.sprite = 'images/char-boy.png';
}


Player.prototype.update = function() {

}


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Player.prototype.resetPlayerPosition = function() {
    this.x = playerInitialX;
    this.y = playerInitialY;
    this.resetCheckPosition();
}

Player.prototype.handleInput = function(keyPressed) {
 
    var stepHorizontalLength = 100;
    var stepVerticalLength = 90;
    this.checkPosition();

    if (keyPressed === 'left') {
        if (this.wallChecker.leftWall) {
            return null;
        }
        this.x -= stepHorizontalLength;
    } else if (keyPressed === 'right') {
        if (this.wallChecker.rightWall) {
            return null;
        }
        this.x += stepHorizontalLength;
    } else if (keyPressed === 'up') {
        if (this.y === 40) {
            this.resetPlayerPosition();
            return null;
        }
        this.y -= stepVerticalLength;
    } else if (keyPressed === 'down') {
        if (this.wallChecker.bottomWall) {
            return null;
        }
        this.y += stepVerticalLength;
    } else {
        console.log('>>> WRONG KEY PREESED');
        return null;
    }
}

Player.prototype.checkPosition = function() {
    if (this.x === 0) {
        this.setHorizontalWallCheckerState(true, false);
    } else if (this.x === 400) {
        this.setHorizontalWallCheckerState(false, true);
    } else {
        this.setHorizontalWallCheckerState(false, false);
    }
    if (this.y === 400) {
        this.wallChecker.bottomWall = true;
    } else {
        this.wallChecker.bottomWall = false;
    }
}

Player.prototype.resetCheckPosition = function() {
    this.setHorizontalWallCheckerState(false, false);
    this.wallChecker.bottomWall = true;
}

Player.prototype.setHorizontalWallCheckerState = function(leftWallState, rightWallState) {
    this.wallChecker.leftWall = leftWallState;
    this.wallChecker.rightWall = rightWallState;
}


var allEnemies = [];


for (var i = 0; i < 3; i++) {
    var tempSpeed = Math.floor(Math.random() * 5 + 1) * 75;
    allEnemies.push(new Enemy(-60, 60 + 85 * i, tempSpeed));
}

var player = new Player();


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    var keyPressed = allowedKeys[e.keyCode];
    player.handleInput(keyPressed);
});

// HELPER Function
var LogPlayerPosition = function() {
    console.log('>>> PLAYER - X: ' + player.x + ' Y: ' + player.y + ' ' + player.wallChecker.leftWall + " " + player.wallChecker.rightWall);
}