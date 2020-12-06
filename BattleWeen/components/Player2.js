export class Player2  {
    constructor(scene, sprite) {
      this.relatedScene = scene;
      this.sprite2 = sprite;
      this.keys;
      
    }
  
    preload() {
        this.relatedScene.load.spritesheet('player1', 'assets/images/players.png',{ frameWidth: 46.8, frameHeight: 48});
    }
  
    create() {
        this.player = this.relatedScene.physics.add.sprite(250, 150, 'player1');
        this.relatedScene.anims.create({
            key: 'down',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite2, end:  this.sprite2 + 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'left',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite2 + 12, end: this.sprite2 + 14 }),
            frameRate: 10,  //FPS para la animacion
            repeat: -1  //Bucle
        });
        this.relatedScene.anims.create({
            key: 'right',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite2 + 24, end: this.sprite2+26 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'up',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite2 + 36, end: this.sprite2+38 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'turn',
            frames: [ { key: 'player1', frame: this.sprite2+1 } ],
            frameRate: 20
        });

        

        this.keys =  this.relatedScene.input.keyboard.createCursorKeys();
        
    }
    update(){
        if (this.keys.left.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);

            this.player.anims.play('left', true);
           
        }
    else if(this.keys.right.isDown)
        {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);

            this.player.anims.play('right', true);
            
        }
    else if(this.keys.up.isDown) 
        {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);

            this.player.anims.play('up', true);
            

        }
     else if(this.keys.down.isDown)
        {
            this.player.setVelocityY(160);
            this.player.setVelocityX(0);

            this.player.anims.play('down', true);
            

        } 

        else
        {
            this.player.anims.play('turn', true);
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
            
        }
        

    }
  }