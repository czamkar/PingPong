var EndState = function(game) {
    // konstruktor
};
    
EndState.prototype = {
	preload: function() {

        game.load.spritesheet('button', 'assets/images/reset.png');
	},
  	create: function() {
        
        this.background = game.add.sprite(0, 0, 'background');
        
    
        if(game.points.player > 2) {
            this.endText = game.add.text(game.width/2 , 140,  "Game win player"/* \n socer:" + game.points.player*/ , {font: '52px Courier New',align:'center', fontWeight: 'bold'});
            this.endText.anchor.setTo(0.5);
        } else {
            this.endText = game.add.text( game.width/2, 140,  "Game win cpu"/* \n socer:"  + game.points.cpu*/ , {font: '52px Courier New',align:'center', fontWeight: 'bold'});
            this.endText.anchor.setTo(0.5);
        }
        this.button = game.add.button(game.width/2, 200, 'button',this.RestartGame);
        this.button.anchor.setTo(0.5, 0.5);
        this.button.scale.setTo(0.1, 0.1);
        this.button.alpha = 0.2;

        this.key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.key1.onDown.add(this.start, this);

    },
    RestartGame: function(){
        game.state.start("Play");
    },
    start: function() {
        game.state.start("Play");
    },
	update: function() {

	},
	render: function() {

	}
}	