var PlayState = function (game) {
	// konstruktor
};

PlayState.prototype = {
	preload: function () {
		// Tu ładujemy assety
		game.load.atlas('assets', 'assets/images/spritesheet.png', 'assets/images/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
		game.load.image('background', 'assets/images/bg.png');
	},
	create: function () {
		game.points = {
			player: 0,
			cpu: 0
		}

		game.physics.startSystem(Phaser.Physics.ARCADE);

		this.background = game.add.sprite(0, 0, 'background');

		this.paddle1 = new Paddle(10, game.height / 2, game);

		this.paddle2 = new Paddle(game.width - 10, game.height / 2, game);
		this.paddle2.aiSpeed = 2.5;

		this.ball = new Ball(game.width / 2, game.height / 2, game);
		this.ball.sprite.body.onWorldBounds = new Phaser.Signal();
		this.ball.sprite.body.onWorldBounds.add(this.hitWorldBounds, this);
		this.ball.onIncreasedSpeed.add(this.increaseAiSpeed, this);

		this.points1 = game.add.text(game.width / 2 - 30, 40, "0", {
			font: '64px Courier New',
			fontWeight: 'bold'
		});
		this.points1.anchor.setTo(0.5);
		this.points1.alpha = 0.2;

		this.points2 = game.add.text(game.width / 2 + 30, 40, "0", {
			font: '64px Courier New',
			fontWeight: 'bold'
		});
		this.points2.anchor.setTo(0.5);
		this.points2.alpha = 0.2;

	},
	increaseAiSpeed: function () {
		this.paddle2.aiSpeed += 0.08;
	},
	hitWorldBounds: function (sprite, up, down, left, right) {

		if (left || right) {

			if (left) {
				game.points.cpu++;
				this.points2.setText(game.points.cpu);
			} else if (right) {
				game.points.player++;
				this.points1.setText(game.points.player);
			}
			if (game.points.cpu > 2 || game.points.player > 2) {
				game.state.start("End");
			}
			game.time.events.add(Phaser.Timer.SECOND * 2, this.respawnBall, this);
			this.ball.sprite.visible = false;
			this.ball.sprite.body.enable = false;
		}

	},
	respawnBall: function () {
		this.ball.reset();
		this.paddle2.aiSpeed = 2.7;
	},
	collideCallback: function () {

		this.ball.increaseSpeed();
	},
	update: function () {
		if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
			this.paddle1.body.y -= 10;
		} else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
			this.paddle1.body.y += 10;
		}

		if (this.ball.sprite.body.y < this.paddle2.body.y) {
			this.paddle2.body.y -= this.paddle2.aiSpeed; //	+ game.rnd.integerInRange(0,30);
		} else {
			this.paddle2.body.y += this.paddle2.aiSpeed;
		}

		// if player 1 points > 9 then game.pause = true

		game.physics.arcade.collide(this.paddle1, this.ball.sprite, this.collideCallback, null, this);
		game.physics.arcade.collide(this.paddle2, this.ball.sprite, this.collideCallback, null, this);
	},
	render: function () {
		if (Config.debug) {
			//game.debug.bodyInfo(this.ball.sprite, 0, 0);\
			game.debug.text(this.ball.sprite.body.velocity, 20, 20);
			game.debug.body(this.paddle1);
			game.debug.body(this.paddle2);
			game.debug.body(this.ball.sprite);
		}
	}
}