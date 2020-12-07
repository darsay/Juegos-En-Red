export class Player extends Phaser.GameObjects.Sprite{
    constructor(num, scene, sprite) {
        var x = 250
        var y = 150;

        super(scene);
        Phaser.GameObjects.Sprite.call(this, scene, 250, 150, 'player' + num);
        var num = num;
    }
  
    preload() {
        this.relatedScene.load.spritesheet('player' + num, 'assets/images/players.png',{ frameWidth: 46.8, frameHeight: 48});
    }
  
        
    create() {
        /*this.this = this.relatedScene.physics.add.sprite(250, 150, 'this');
        this.relatedScene.anims.create({
            key: 'down',
            frames:  this.relatedScene.anims.generateFrameNumbers('this', { start: this.sprite, end:  this.sprite + 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'left',
            frames:  this.relatedScene.anims.generateFrameNumbers('this', { start: this.sprite + 12, end: this.sprite + 14 }),
            frameRate: 10,  //FPS para la animacion
            repeat: -1  //Bucle
        });
        this.relatedScene.anims.create({
            key: 'right',
            frames:  this.relatedScene.anims.generateFrameNumbers('this', { start: this.sprite + 24, end: this.sprite+26 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'up',
            frames:  this.relatedScene.anims.generateFrameNumbers('this', { start: this.sprite + 36, end: this.sprite+39 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'turn',
            frames: [ { key: 'this', frame: this.sprite+1 } ],
            frameRate: 20
        });*/
     
    }

    update(){
        if (cursors.left.isDown)
        {
            this.setVelocityX(-160);
            this.setVelocityY(0);

            this.anims.play('left', true);
            playerLookingAt = "left";
        }
    else if(cursors.right.isDown)
        {
            this.setVelocityX(160);
            this.setVelocityY(0);

            this.anims.play('right', true);
            playerLookingAt = "right";
        }
    else if(cursors.up.isDown) 
        {
            this.setVelocityY(-160);
            this.setVelocityX(0);

            this.anims.play('up', true);
            playerLookingAt = "up";

        }
    else if(cursors.down.isDown)
        {
            this.setVelocityY(160);
            this.setVelocityX(0);

            this.anims.play('down', true);
            playerLookingAt = "down";

        }
    else
        {
            this.anims.play('turn', true);
            this.setVelocityX(0);
            this.setVelocityY(0);
        }
    }
    
  }