var game = new Phaser.Game(Config['width'], Config['height'], Phaser.AUTO, "game");

// Definiujemy stany
game.state.add("Play", PlayState);
game.state.add("Start", StartState);
game.state.add("End", EndState);
// Odpalamy stan
game.state.start("Start");

/*
TODO:
- Przyśpieszanie piłki co odbicie (do jakiejś maksymalnej wartości)

- Może ładniej przyozdrobić index.html - logo dać nad grą, a pierwszy stan będzie zawierał tylko przycisk "start"
- Koniec gry (można dać przyciemnienie tła - półprzezroczysty sprite na całość i tekt kto wygrał) i przycisk reset by zacząć od nowa.
*/