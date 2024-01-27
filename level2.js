class Level2Scene extends Phaser.Scene {
    constructor() {
        super("level2Scene");
    }

    preload() {
        this.load.image("background2", "assets/images/level2bg.jpg");
        this.load.image("spaceship", "assets/spritesheets/ship.png");
        this.load.image("asteroid", "assets/images/asteroid.png");
    }

    create() {
        // Background
        this.background2 = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, "background2");
        this.background2.displayWidth = this.sys.game.config.width;
        this.background2.displayHeight = this.sys.game.config.height;
        this.background2.setOrigin(0, 0);

        // Spaceship
        this.spaceship = this.physics.add.sprite(100, this.sys.game.config.height / 2, "spaceship");
        this.spaceship.setCollideWorldBounds(true); // Ensure the spaceship stays within the game world bounds
        this.spaceship.setScale(0.15);

        // Set up physics for the spaceship
        this.physics.world.enable(this.spaceship);
        this.spaceship.setGravityY(800); // Add gravity to the spaceship

        // Obstacles (Asteroids)
        this.obstacles = this.physics.add.group();

        // Set up keyboard input
        this.cursors = this.input.keyboard.createCursorKeys();

        // Event listener for spacebar
        this.input.keyboard.on("keydown-SPACE", this.flap, this);

        this.initialDistance = this.sys.game.config.width;

        // Timer for adding asteroids
        this.timer = this.time.addEvent({
            delay: 1500, 
            callback: this.addAsteroid,
            callbackScope: this,
            loop: true,
        });

        // Add asteroids immediately
        this.addAsteroid();

        // Distance left countdown
        this.distanceLeft = this.sys.game.config.width;
        this.distanceText = this.add.text(20, 20, `Distance left: ${this.distanceLeft}`, {
            font: "20px Arial",
            fill: "white"
        });
    }

    update() {
        // Move the spaceship continuously to the right
        this.spaceship.x += 1; // Decreased the spaceship speed
    
        // Move the background based on the distance covered
        this.distanceLeft -= 1; // Adjust the decrement value based on your preference
        this.distanceText.setText(`Distance left: ${Math.max(0, this.distanceLeft)}`);
    
        // Move the background based on spaceship movement
        this.background2.tilePositionX += 1; // Adjust the scrolling speed
    
        // Move the spaceship up or down based on spacebar input
        if (this.cursors.space.isDown) {
            this.spaceship.setVelocityY(-100); // Decreased the upward speed
        } else {
            this.spaceship.setVelocityY(100); // Decreased the downward speed
        }
    
        // Check for collisions with asteroids
        this.physics.overlap(this.spaceship, this.obstacles, this.gameOver, null, this);
    
        // Check if the distance left is zero, meaning the spaceship reached the finish line
        if (this.distanceLeft <= 0) {
            console.log("Level completed!");
            alert("Level completed");
            // You can transition to the next level or perform any other actions here

            // Redirect to Scene2
            //this.scene.start("Scene2");
        }
    }
    

    flap() {
        // Move the spaceship up when the spacebar is pressed
        this.spaceship.setVelocityY(-200);
    }

    addAsteroid() {
        // Add an asteroid to the obstacles group
        const asteroid = this.physics.add.image(
            Phaser.Math.Between(0, this.sys.game.config.width), // Random X position
            Phaser.Math.Between(50, this.sys.game.config.height - 50),
            "asteroid"
        );
        asteroid.setScale(0.5); // Make the asteroid smaller
        asteroid.setVelocityX(-150); // Move the asteroid to the left
        asteroid.setScale(0.16);
        this.obstacles.add(asteroid);

        // Destroy the asteroid when it's out of the screen
        asteroid.setDepth(true);
    }

    gameOver() {
        // Game over logic
        console.log("Game Over");
        alert("Game over");
        this.scene.restart(); // Restart the level on game over
    }
}

