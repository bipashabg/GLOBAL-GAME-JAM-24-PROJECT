class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.background = this.add.image(0,0,"background");
        this.background.setOrigin(0,0);

        this.background.displayWidth = width;
        this.background.displayHeight = height;

        this.ship = this.add.image(config.width/2, config.height/2, "ship");
        this.ship.setScale(0.15);

        this.add.text(20, 20, "Playing game", {
            font: "25px Arial",
            fill: "white"
        });
    }

    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height) {
            this.resetShipPos(ship);
        }
    }

    resetShipPos(ship){
        ship.y = 0; 
        var randomX = Phaser.Math.Between(0, config.width);
        ship.x = randomX;
    }

    update() {
        this.moveShip(this.ship, 1);
    }
}