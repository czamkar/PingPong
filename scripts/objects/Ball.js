var Ball = function(x, y, game){
    this.initX = x;
    this.initY = y;
    this.sprite = game.add.sprite(x, y, 'assets', 'ball');	
    this.sprite.anchor.setTo(0.5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.sprite.body.velocity.setTo(Config.initBallSpeed);

    this.onIncreasedSpeed = new Phaser.Signal();
    
    
}
Ball.prototype.reset = function() {
    this.sprite.x = this.initX;
    this.sprite.y = this.initY;
    this.sprite.visible = true;
    this.sprite.body.enable = true;
    
    game.time.events.add(0, function() {
        this.sprite.body.velocity.setTo(Config.initBallSpeed);
    }, this);
}
Ball.prototype.increaseSpeed = function(value) {
    value = value | Config.ballIncreaseValue;

    var valueX = this.sprite.body.velocity.x;
    var valueY = this.sprite.body.velocity.y;
    if(this.sprite.body.velocity.x < Config.maxBallSpeed && this.sprite.body.velocity.x > -Config.maxBallSpeed ) {
        if(this.sprite.body.velocity.x > 0  ) {
            valueX += value;
        } else {
            valueX -= value;
        }
        if(this.sprite.body.velocity.y > 0  ) {
            valueY += value;
        } else {
            valueY -= value;
        }
        this.sprite.body.velocity.setTo(valueX, valueY);
        this.onIncreasedSpeed.dispatch();
    }


    // if(this.sprite.body.velocity.x > 0  ) {
    //     this.sprite.body.velocity.x += value;
    // } else {
    //     this.sprite.body.velocity.x -= value;
    // }
    // if(this.sprite.body.velocity.y > 0  ) {
    //     this.sprite.body.velocity.y += value;
    // } else {
    //     this.sprite.body.velocity.y -= value;
    // }

}