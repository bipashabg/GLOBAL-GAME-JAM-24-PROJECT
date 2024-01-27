class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
    }

    preload() {
        // Loading audio files
        this.load.audio('backgroundMusic', 'assets/audio/bgmusic.mp3');
        this.load.audio('buttonClick', 'assets/audio/click.mp3');
    }

    create() {
        const { width, height } = this.sys.game.config;

        this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });
        this.backgroundMusic.play();

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

        this.input.keyboard.on("keydown-O", this.showOptions, this);
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

        button.on('pointerup', () => {
            this.sound.play('buttonClick');
            callback();
        });
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
        this.scene.start("mapScene");
    }

    // Function to show the options pop-up
    showOptions() {
        // Create a pop-up container
        const popupContainer = this.add.container(this.sys.game.config.width / 2, this.sys.game.config.height / 2);

        // Background for the pop-up
        const popupBackground = this.add.graphics();
        popupBackground.fillStyle(0x000000, 0.7);
        popupBackground.fillRect(-150, -100, 300, 200);
        popupContainer.add(popupBackground);

        // Text for options
        const optionsText = this.add.text(-120, -70, 'Choose an option:', {
            font: '20px Arial',
            fill: '#ffffff'
        });
        popupContainer.add(optionsText);

        // Option 1: Adjust Volume
        const adjustVolumeText = this.add.text(-120, -30, '1. Adjust Volume', {
            font: '18px Arial',
            fill: '#ffffff'
        });
        adjustVolumeText.setInteractive().on('pointerdown', () => {
            console.log('Adjust Volume');
            popupContainer.destroy(); // Close the pop-up
        });
        popupContainer.add(adjustVolumeText);

        // Option 2: Controls
        const controlsText = this.add.text(-120, 0, '2. Controls', {
            font: '18px Arial',
            fill: '#ffffff'
        });
        controlsText.setInteractive().on('pointerdown', () => {
            const controlsMessage = 'Controls:\nLevel 1: \nLevel 2: Press space key to move up';
            alert(controlsMessage);
            popupContainer.destroy(); // Close the pop-up
        });
        popupContainer.add(controlsText);

        // Close button
        const closeButton = this.add.text(120, -70, 'X', {
            font: '20px Arial',
            fill: '#ff0000'
        });
        closeButton.setInteractive().on('pointerdown', () => {
            popupContainer.destroy(); // Close the pop-up
        });
        popupContainer.add(closeButton);
    }


    quitGame() {
        console.log("Quit Game");
    }

    showCredits() {
        console.log("Show Credits");
    }
}
