class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");
    }

    preload(){
        this.load.image("background", "assets/images/background.jpg");
        this.load.image("ship", "assets/spritesheets/ship.png", {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    create() {
        console.log("Scene1 create function");
        this.add.text(20, 20, "Loading game...", { fill: '#ffffff' });
        this.scene.start("playGame");
    }
}