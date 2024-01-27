class MapScene extends Phaser.Scene {
    constructor() {
        super("mapScene");
    }

    preload() {
        this.load.image("background1", "assets/images/map.jpg");
        this.load.image("planet1", "assets/images/level1.png");
        this.load.image("planet2", "assets/images/level2.png");
    }

    create() {
        // Background
        const background1 = this.add.image(0, 0, "background1").setOrigin(0, 0);
        background1.displayWidth = this.sys.game.config.width;
        background1.displayHeight = this.sys.game.config.height;

        // Planets
        const planet1 = this.add.image(200, 300, "planet1").setInteractive();
        planet1.setScale(0.15);
        const planet2 = this.add.image(500, 300, "planet2").setInteractive();
        planet2.setScale(0.6);

        // Event listeners for planet clicks
        planet1.on('pointerup', () => this.selectPlanet(1));
        const textBelowPlanet1 = this.add.text(200, 400, 'Level 1', {
            font: '20px Arial',
            fill: 'white',
            align: 'center',
        });
        textBelowPlanet1.setOrigin(0.5);
    
        planet2.on('pointerup', () => this.selectPlanet(2));
        const textBelowPlanet2 = this.add.text(500, 400, 'Level 2', {
            font: '20px Arial',
            fill: 'white',
            align: 'center',
        });
        textBelowPlanet2.setOrigin(0.5);
    }

    selectPlanet(planetNumber) {
        console.log(`Clicked on Planet ${planetNumber}`);
        // Transition to the corresponding level scene
        this.scene.start(`level${planetNumber}Scene`);
    }
}
