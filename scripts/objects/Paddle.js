var Paddle = function(x, y, game){
    this.sprite = game.add.sprite(x, y, 'assets', 'paddle');	
    this.sprite.anchor.setTo(0.5);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.collideWorldBounds = true;
    this.sprite.body.bounce.set(1);
    this.sprite.body.immovable = true;
    
    return this.sprite;
}