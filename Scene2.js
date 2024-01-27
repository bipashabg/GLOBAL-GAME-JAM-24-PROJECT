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

        this.createButton(width / 2, height / 2 - 50, "Start", () => this.startGame());
        this.createButton(width / 2, height / 2, "Options", () => this.showOptions());
        this.createButton(width / 2, height / 2 + 50, "Quit", () => this.quitGame());
        this.createButton(width / 2, height / 2 + 100, "Credits", () => this.showCredits());

        // Add pixelated text buttons
        this.add.text(width / 2, height / 2 - 50, "Start", {
            font: "25px Arial",
            fill: "white",
            backgroundColor: 0x00000000, 
            padding: 10
        }).setOrigin(0.5).setInteractive().on('pointerup', () => this.startGame()).setResolution(4); 

        this.add.text(width / 2, height / 2, "Options", {
            font: "25px Arial",
            fill: "white",
            backgroundColor: 0x00000000, 
            padding: 10
        }).setOrigin(0.5).setInteractive().on('pointerup', () => this.showOptions()).setResolution(4); 

        this.add.text(width / 2, height / 2 + 100, "Credits", {
            font: "25px Arial",
            fill: "white",
            backgroundColor: 0x00000000, 
            padding: 10
        }).setOrigin(0.5).setInteractive().on('pointerup', () => this.showCredits()).setResolution(4); 


        this.add.text(width / 2, height / 2 + 50, "Quit", {
            font: "25px Arial",
            fill: "white",
            backgroundColor: 0x00000000, 
            padding: 10
        }).setOrigin(0.5).setInteractive().on('pointerup', () => this.quitGame()).setResolution(4); 

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

    createButton(x, y, text, callback) {
        const button = this.add.text(x, y, text, {
            font: "25px Arial",
            fill: "white",
            backgroundColor: 0x00000000, // Transparent background
            padding: 10,
            borderColor: "white",
            borderWidth: 2,
        }).setOrigin(0.5).setInteractive();

        button.on('pointerup', callback);
        button.on('pointerover', () => this.onButtonHover(button));
        button.on('pointerout', () => this.onButtonOut(button));
    }

    onButtonHover(button) {
        button.setStyle({
            fill: "yellow",  // Change fill color on hover
            borderColor: "yellow",
        });
    }

    onButtonOut(button) {
        button.setStyle({
            fill: "white",  // Reset fill color on hover out
            borderColor: "white",
        });
    }

    startGame() {
        console.log("Start Game");
    }

    showOptions() {
        console.log("Show Options");
    }

    quitGame() {
        console.log("Quit Game");
    }

    showCredits() {
        console.log("Show Credits");
    }
}
