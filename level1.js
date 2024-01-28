class Level1Scene extends Phaser.Scene {

  createAlien(){
    const alienXLocation = Math.floor(Math.random()*800)+1
    let alienXVelocity = Math.floor(Math.random()*50)+1
    alienXVelocity *=Math.round(Math.random()?1:-1)
    const anAsteroid = this.physics.add.sprite(alienXLocation,-100,'asteroid')
    anAsteroid.setScale(0.15); 
    anAsteroid.body.velocity.y=90
    anAsteroid.body.velocity.x=alienXVelocity
    this.alienGroup.add(anAsteroid)
  }
  
  constructor() {
      super("level1Scene");

      this.background = null
      this.ship = null  
      this.fireMissile=false
      this.score=0
      this.scoreText=null
      this.scoreTextStyle = {font:'45px', fill:'#ffffff', align: 'center'}  
      this.gameOverText= null
      this.gameOverTextStyle = {font:'45px', fill:'#ff0000', align: 'center'}  
  }

  init(data){
    this.cameras.main.setBackgroundColor('#ffffff')
  }

  preload() {
    this.load.image("background", "assets/images/level2bg.jpg");
    this.load.image("ship", "assets/spritesheets/ship.png");
    this.load.image("missile", "assets/images/missile.png");
    this.load.image("asteroid", "assets/images/asteroid.png");

    this.load.audio('shoot',"assets/audio/click.mp3")
}

create() {
    // Background
    this.background = this.add.tileSprite(0, 0, this.sys.game.config.width, this.sys.game.config.height, "background");
    this.background.displayWidth = this.sys.game.config.width;
    this.background.displayHeight = this.sys.game.config.height;
    this.background.setOrigin(0, 0);

    this.ship = this.physics.add.sprite(800/2,600-50,'ship')
    this.ship.setCollideWorldBounds(true)
    this.ship.setScale(0.15);
    
    this.scoreText = this.add.text(10,10, 'Score: '+this.score.toString(), this.scoreTextStyle)
    this.missileGroup = this.physics.add.group()
    this.alienGroup = this.add.group()
    this.createAlien()

    this.physics.add.collider(this.missileGroup,this.alienGroup,function (missileCollide,alienCollide){
      alienCollide.destroy()
      missileCollide.destroy()
      this.score = this.score + 1
      this.scoreText.setText('Score: '+ this.score.toString())
      this.createAlien()
      this.createAlien()
    }.bind(this ))

    this.physics.add.collider(this.ship,this.alienGroup,function (shipCollide,alienCollide){
      this.physics.pause()
      alienCollide.destroy()
      shipCollide.destroy()
      this.gameOverText= this.add.text(800/2,600/2,'Game Over!\n Click Here to play again',this.gameOverTextStyle).setOrigin(0.5)
      this.gameOverText.setInteractive({useHandCursor:true})
      this.gameOverText.on('pointerdown',()=>this.scene.start('level1Scene'))
    }.bind(this ))
  }

  update(time,delta){
      const keyLeftObj = this.input.keyboard.addKey('LEFT')
      const keyRightObj = this.input.keyboard.addKey('RIGHT')
      const keySpaceObj = this.input.keyboard.addKey('SPACE')

      if (keyLeftObj.isDown === true){
        this.ship.x -=15
        if(this.ship.x<0){
          this.ship.x=0
        }
      }
      if (keyRightObj.isDown === true){
        this.ship.x +=15
        if(this.ship.x>800){
          this.ship.x=800
        }
      }
      if (keySpaceObj.isDown === true){
        if(this.fireMissile ===false){
          this.sound.play('shoot')
          this.fireMissile=true
          const aNewMissile = this.physics.add.sprite(this.ship.x,this.ship.y,'missile')
          this.missileGroup.add(aNewMissile)  
        }
        
      }
      if(keySpaceObj.isUp ===true){
        this.fireMissile=false
      }

      this.missileGroup.children.each(function(item){
          item.y = item.y-15
          if(item.y<0){
            item.destroy()
          }

      })
  }
}