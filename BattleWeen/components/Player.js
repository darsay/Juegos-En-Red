export class Player  {
    constructor(scene, sprite) {
      this.relatedScene = scene;
      this.sprite = sprite;
    }
  
    preload() {
        this.relatedScene.load.spritesheet('player1', 'assets/images/players.png',{ frameWidth: 46.8, frameHeight: 48});
    }
  
    create() {
        this.player1 = this.relatedScene.physics.add.sprite(250, 150, 'player1');
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
            frames:  this.relatedScene.anims.generateFrameNumbers('player1', { start: this.sprite + 36, end: this.sprite+39 }),
            frameRate: 10,
            repeat: -1
        });
        this.relatedScene.anims.create({
            key: 'turn',
            frames: [ { key: 'player1', frame: this.sprite+1 } ],
            frameRate: 20
        });
     
    }
    
  }