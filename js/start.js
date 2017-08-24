var BoardWorld = {
	velocity: 8
};
var game = new Phaser.Game(320, 480, Phaser.CANVAS, 'phaser-example', { 
	preload: preload,
	create: create,
	update: update,
	render: render
});
function preload() {
	game.load.image('ball', 'img/ball_8.png');
	game.load.image('board1', 'img/ping_pong_paddle.png');
	game.load.image('board2', 'img/ping_pong_paddle.png');
	game.load.image('background', 'img/ping_pong_8bit_transp_background_glowy.png');
	game.load.audio('beep', 'img/ping_pong_8bit_beeep.ogg');
}

var points1 = 0;
var points2 = 0;

var pointsTxt1;
var pointsTxt2;
var ball

var beep;

function create() {
	game.add.tileSprite(0, 0, 320, 480, 'background');
	beep = game.add.audio('beep');
	game.physics.startSystem(Phaser.Physics.ARCADE);
	game.stage.backgroundColor = '#000000';
	ball = game.add.sprite(game.world.centerX, game.world.centerY, 'ball');
	this.board1 = game.add.sprite(game.world.centerX, 0 ,'board1');
	this.board1.scale.setTo(1.5,1);
	this.board2 = game.add.sprite(game.world.centerX, game.world._height ,'board2');
	this.board2.scale.setTo(1.5,1);
	this.keys = game.input.keyboard.createCursorKeys();
	game.physics.arcade.enable([ball, this.board1, this.board2]);
	ball.body.bounce.set(1);
	ball.body.velocity.set(300);
	ball.anchor.set(0.5, 0.5);
	ball.body.setCircle(8);
	ball.body.collideWorldBounds = true;
	this.board2.body.collideWorldBounds = true;
	this.board1.body.collideWorldBounds = true;
	this.board2.body.immovable = true;
	this.board1.body.immovable = true;
	pointsTxt1 = game.add.text(game.world._width - 30 , game.world.centerY - 30, '0', { font: "20px Arial", fill: "#ffffff", align: "left" });
	pointsTxt2 = game.add.text(game.world._width - 30, game.world.centerY + 10, '0', { font: "20px Arial", fill: "#ffffff", align: "left" });
	ball.body.onWorldBounds = new Phaser.Signal();
	ball.body.onWorldBounds.add(hitWorldBounds, this);
	this.board2.body.bounce.set(1);
}
function hitWorldBounds (sprite, up, down, left, right) {
	if(down){
		points1++;
		pointsTxt1.text = points1;
		ball.reset(game.world.centerX, game.world.centerY);
		ball.body.velocity.set(-300);
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
	game.physics.arcade.collide(ball, this.board1, collisionHandler);
	game.physics.arcade.collide(ball, this.board2, collisionHandler);

	if (this.keys.left.isDown) {
		this.board2.x -= BoardWorld.velocity;
	}
	if (this.keys.right.isDown){
		this.board2.x += BoardWorld.velocity;
	}
	if (this.keys.up.isDown){
		this.board1.x -= BoardWorld.velocity;
	}
		if (this.keys.down.isDown){
		this.board1.x += BoardWorld.velocity;
	}
}
function collisionHandler(){
	 beep.play();
}
function render () {
	/*
	game.debug.spriteInfo(ball, 32, 32);
	game.debug.body(ball);
	*//*
	game.debug.body(this.board2);
	game.debug.body(this.board1);*/
	
}