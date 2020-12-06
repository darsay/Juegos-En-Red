export class Player  {
    constructor(scene, sprite) {
      this.relatedScene = scene;
      this.sprite = sprite;
      this.keys;
      
      
    }
  
    preload() {
        this.relatedScene.load.spritesheet('player1', 'assets/images/players.png',{ frameWidth: 46.8, frameHeight: 48});
    }
  
    create() {
        this.player = this.relatedScene.physics.add.sprite(250, 150, 'player1');
        this.relatedScene.anims.create({
            key: 'down',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite, end:  this.sprite + 2 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'left',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite + 12, end: this.sprite + 14 }),
            frameRate: 10,  //FPS para la animacion
            repeat: -1  //Bucle
        });
        this.relatedScene.anims.create({
            key: 'right',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite + 24, end: this.sprite+26 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'up',
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite + 36, end: this.sprite+38 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'turn',
            frames: [ { key: 'player1', frame: this.sprite+1 } ],
            frameRate: 20
        });

        /* this.relatedScene.physics.add.collider(this.player, this.relatedScene.layer1);
        this.relatedScene.physics.add.collider(this.player, this.relatedScene.interiorLayer);
        //this.physics.add.overlap(player1, collectableLayer, collectItem, null, this);
        this.relatedScene.physics.add.collider(this.player, this.relatedScene.murosDown);
        this.relatedScene.physics.add.collider(this.player, this.relatedScene.murosUp);
        this.relatedScene.physics.add.collider(this.player, this.murosRight);
        this.relatedScene.physics.add.collider(this.player, this.murosLeft); */

        this.keys =  this.relatedScene.input.keyboard.addKeys('W,A,S,D');
        
    }
    update(){
        if (this.keys.A.isDown)
        {
            this.player.setVelocityX(-160);
            this.player.setVelocityY(0);

            this.player.anims.play('left', true);
           
        }
    else if(this.keys.D.isDown)
        {
            this.player.setVelocityX(160);
            this.player.setVelocityY(0);

            this.player.anims.play('right', true);
            
        }
    else if(this.keys.W.isDown) 
        {
            this.player.setVelocityY(-160);
            this.player.setVelocityX(0);

            this.player.anims.play('up', true);
            

        }
     else if(this.keys.S.isDown)
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