// Global object to store our game parameters
var BallWorld = {
    velocity: 8
};
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { 
	preload: preload,
    create: create,
    update: update,
	render: render
	});

function preload() {
	game.load.image('ball', 'img/ball.png');
	game.load.image('board1', 'img/board.png');
	game.load.image('board2', 'img/board.png');
}
// Called after preload
function create() {
	 game.physics.startSystem(Phaser.Physics.ARCADE);
 
    // Center game canvas on page
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    
    // Change background color
    game.stage.backgroundColor = '#87CEEB';
    // Add the ball to the middle of the game area
    this.ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
	

	this.board1 = game.add.sprite(game.world.CenterX, 0 ,'board1');
	this.board1.scale.setTo(0.2,0.2);
	
	this.board2 = game.add.sprite(game.world.CenterX, game.world._height-20 ,'board2');
	this.board2.scale.setTo(0.2,0.2);
		
    this.keys = game.input.keyboard.createCursorKeys();
	   game.physics.arcade.enable([this.ball, this.board1, this.board2]);
	     
	 this.ball.body.bounce.set(1);
	  this.ball.body.velocity.set(300);
	  //this.ball.body.gravity.y = 100;
	this.ball.scale.setTo(0.02,0.02);
    this.ball.anchor.set(0.5, 0.5);
    this.ball.body.setCircle(1000);
	   this.board2.body.immovable = true;
	   this.board1.body.immovable = true;

	 this.ball.body.collideWorldBounds = true;
	//this.ballbody.setCircle(45);
    // Add key input to the game
	
	// this.board2.body.collideWorldBounds = true;
	 //	 this.board1.body.collideWorldBounds = true;
	// this.board1.body.bounce.set(1);

	 this.board2.body.bounce.set(1);
}
 
// Called once every frame, ideally 60 times per second
function update() {
     game.physics.arcade.collide(this.ball, this.board1);
	 game.physics.arcade.collide(this.ball, this.board2);
    // Poll the arrow keys to move the ball
    if (this.keys.left.isDown) {
       this.board2.x -= BallWorld.velocity;
    }
    if (this.keys.right.isDown) {
        this.board2 .x += BallWorld.velocity;
    }
	    if (this.keys.up.isDown) {
       this.board1.x -= BallWorld.velocity;
    }
    if (this.keys.down.isDown) {
        this.board1.x += BallWorld.velocity;
    }

}
function render () {
game.debug.spriteInfo(this.ball, 32, 32);

    game.debug.body(this.ball);
	  game.debug.body(this.board2);
  game.debug.body(this.board1);

}