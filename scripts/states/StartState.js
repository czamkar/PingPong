var StartState = function(game) {
    // konstruktor
};
    
StartState.prototype = {
	preload: function() {
        // Tu ładujemy assety
		game.load.atlas('assets', 'assets/images/spritesheet.png', 'assets/images/sprites.json', Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
		game.load.image('background', 'assets/images/bg.png');
	},
  	create: function() {
 
        
        this.background = game.add.sprite(0, 0, 'background');
        
        this.startText = game.add.text(game.width/2 , 80, "Ping Pong", {font: '52px Courier New',align:'center', fontWeight: 'bold'});
        this.startText2Line = game.add.text(game.width/2 , 160, "Press To Spacebar", {font: '36px Courier New',align:'center', fontWeight: 'bold'});
        
        this.startText.anchor.setTo(0.5);
        this.startText2Line.anchor.setTo(0.5);
        //this.points2.alpha = 0.2;

        this.key1 = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.key1.onDown.add(this.start, this);

    },
    start: function() {
        game.state.start("Play");
    },
	update: function() {

	},
	render: function() {

	}
}	