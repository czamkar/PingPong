var BoardWorld = {
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

var points1 = 0;
var points2 = 0;

var pointsTxt1;
var pointsTxt2;
var ball

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#87CEEB';
	ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
	this.board1 = game.add.sprite(game.world.centerX, 0 ,'board1');
	this.board1.scale.setTo(0.2,0.2);
	this.board2 = game.add.sprite(game.world.centerX, game.world._height-20 ,'board2');
	this.board2.scale.setTo(0.2,0.2);
	this.keys = game.input.keyboard.createCursorKeys();
	game.physics.arcade.enable([ball, this.board1, this.board2]);
	ball.body.bounce.set(1);
	ball.body.velocity.set(300);
	ball.scale.setTo(0.02,0.02);
	ball.anchor.set(0.5, 0.5);
	ball.body.setCircle(1000);
	ball.body.collideWorldBounds = true;
		this.board2.body.collideWorldBounds = true;
		this.board1.body.collideWorldBounds = true;
	this.board2.body.immovable = true;
	this.board1.body.immovable = true;
	pointsTxt1 = game.add.text(780, game.world.centerY - 30, '0', { font: "20px Arial", fill: "#ffffff", align: "left" });
	pointsTxt2 = game.add.text(780, game.world.centerY + 30, '0', { font: "20px Arial", fill: "#ffffff", align: "left" });
	ball.body.onWorldBounds = new Phaser.Signal();
	ball.body.onWorldBounds.add(hitWorldBounds, this);
	this.board2.body.bounce.set(1);
}
function hitWorldBounds (sprite, up, down, left, right) {
	if(down){
		points1++;
		pointsTxt1.text = points1;
		ball.reset(game.world.centerX, game.world.centerY);
		ball.body.velocity.set(300);
	}
	if(up){
		points2++;
		pointsTxt2.text = points2;
		ball.reset(game.world.centerX, game.world.centerY);
		ball.body.velocity.set(300);
	}
}
// Called once every frame, ideally 60 times per second
function update(){
	game.physics.arcade.collide(ball, this.board1);
	game.physics.arcade.collide(ball, this.board2);

	if (this.keys.left.isDown) {
		this.board2.x -= BoardWorld.velocity;
	}
	if (this.keys.right.isDown){
		this.board2 .x += BoardWorld.velocity;
	}
	if (this.keys.up.isDown){
		this.board1.x -= BoardWorld.velocity;
	}
		if (this.keys.down.isDown){
		this.board1.x += BoardWorld.velocity;
	}
}
function render () {
	/*
	game.debug.spriteInfo(ball, 32, 32);
	game.debug.body(ball);
	game.debug.body(this.board2);
	game.debug.body(this.board1);
	*/
}