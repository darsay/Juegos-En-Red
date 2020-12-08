var player1;
var player2;
        var playerLookingAt;
        var playerLookingAt2;
        var speed1, speed2;
        var hp1, hp2;
        var dmg1, dmg2;
        var cursors;
        var keys;

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.score = 0;
  }

   preload(){
    this.load.spritesheet('scenery', 'assets/images/scenery.png',{ frameWidth: 17, frameHeight: 17});
    this.load.spritesheet('player1', 'assets/images/players.png',{ frameWidth: 46.5, frameHeight: 48});
    this.load.spritesheet('collectables', 'assets/images/collectables.png',{ frameWidth: 16, frameHeight: 16});
    this.load.image('ground', 'assets/images/ground.png');

    this.load.tilemapTiledJSON('map', 'assets/json/level1.json');

}

 create(){

    //Crea el tilemap
    const map = this.make.tilemap({ key: 'map' });
    //Añade el tileSet de la capa de Mazmorra que coge los elementos de escenario
    const tileset = map.addTilesetImage('Mazmorra', 'scenery');
    //Crea el suelo y los muros en variables distintas para solo 
    //Chocar con los muros
    const suelo = map.createStaticLayer('Suelo', tileset, 0, 0);
    const muros = map.createStaticLayer('Muros', tileset, 0, 0);
    muros.setCollisionByExclusion(-1, true);

    this.Collectables = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const items = map.getObjectLayer('Collectables')['objects'];
      items.forEach(itemObj => {
        // Add new spikes to our sprite group
        const item = this.Collectables.create(itemObj.x, itemObj.y - itemObj.height, 'collectables').setOrigin(0, 0);
      });
    



    player1 = this.physics.add.sprite(250, 150, 'player1');
    player2 = this.physics.add.sprite(250, 400, 'player1');
    speed1 = 160;
    speed2 = speed1;
    hp1 = 100;
    hp2 = hp1;
    dmg1 = 20;
    dmg2 = dmg1;
    
     player1.setScale(0.8);
     player2.setScale(0.8);
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('player1', { start: 3, end: 5 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('player1', { start: 15, end: 17 }),
        frameRate: 10,  //FPS para la animacion
        repeat: -1  //Bucle
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('player1', { start: 27, end: 29 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('player1', { start: 39, end: 41 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'player1', frame: 4 } ],
        frameRate: 20
    });


    this.anims.create({
        key: 'keyS',
        frames: this.anims.generateFrameNumbers('player1', { start: 6, end: 8 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'keyA',
        frames: this.anims.generateFrameNumbers('player1', { start: 18, end: 20 }),
        frameRate: 10,  //FPS para la animacion
        repeat: -1  //Bucle
    });
    this.anims.create({
        key: 'keyD',
        frames: this.anims.generateFrameNumbers('player1', { start: 30, end: 32 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'keyW',
        frames: this.anims.generateFrameNumbers('player1', { start: 42, end: 44 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn2',
        frames: [ { key: 'player1', frame: 7 } ],
        frameRate: 20
    });

    //Entrada por teclado
    cursors = this.input.keyboard.createCursorKeys();//Para las flechas
    keys = this.input.keyboard.addKeys('W,S,A,D'); //Para el resto del teclado (Le puedes meter el resto de letras)
    //Fisica para colisionar con las platforms
    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);

    this.physics.add.collider(player1, player2);

    this.physics.add.overlap(player1,  this.Collectables, collectItem1, null, this);
    this.physics.add.overlap(player2,  this.Collectables, collectItem2, null, this);


}

 update ()
{
    //JUGADOR 1
    if (cursors.left.isDown)
        {
            player1.setVelocityX(-speed1);
            player1.setVelocityY(0);

            player1.anims.play('left', true);
            playerLookingAt = "left";
        }
    else if(cursors.right.isDown)
        {
            player1.setVelocityX(speed1);
            player1.setVelocityY(0);

            player1.anims.play('right', true);
            playerLookingAt = "right";
        }
    else if(cursors.up.isDown) 
        {
            player1.setVelocityY(-speed1);
            player1.setVelocityX(0);

            player1.anims.play('up', true);
            playerLookingAt = "up";

        }
     else if(cursors.down.isDown)
        {
            player1.setVelocityY(speed1);
            player1.setVelocityX(0);

            player1.anims.play('down', true);
            playerLookingAt = "down";

        } 
     else if (keys.A.isDown)
        {
            player2.setVelocityX(-speed2);
            player2.setVelocityY(0);

            player2.anims.play('keyA', true);
            playerLookingAt2 = "keyA";
        }
    else if(keys.D.isDown)
        {
            player2.setVelocityX(speed2);
            player2.setVelocityY(0);

            player2.anims.play('keyD', true);
            playerLookingAt2 = "keyD";
        }
    else if(keys.W.isDown) 
        {
            player2.setVelocityY(-speed2);
            player2.setVelocityX(0);

            player2.anims.play('keyW', true);
            playerLookingAt = "keyW";

        }
     else if(keys.S.isDown)
        {
            player2.setVelocityY(speed2);
            player2.setVelocityX(0);

            player2.anims.play('keyS', true);
            playerLookingAt2 = "keyS";

        }   
    else
        {
            player1.anims.play('turn', true);
            player2.anims.play('turn2', true);
            player1.setVelocityX(0);
            player1.setVelocityY(0);
            player2.setVelocityX(0);
            player2.setVelocityY(0);
        }

}  

}
function collectItem1(player, item)
   {
      item.disableBody(true,true);
      speed1+=20;
      
   }
   function collectItem2(player, item)
   {
      item.disableBody(true,true);
      speed2 +=20;

   }