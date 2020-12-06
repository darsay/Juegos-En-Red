var player1;
var player2;
        var playerLookingAt;
        var playerLookingAt2;
        var walls;
        var interiorWalls;
        var murosDown;
        var murosUp;
        var murosRight;
        var murosLeft;
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
}

 create(){
    //walls = this.physics.add.staticGroup();
    //walls.create(200, 300, 'scenery', 2);
    //https://medium.com/@michaelwesthadley/modular-game-worlds-in-phaser-3-tilemaps-1-958fc7e6bbd6
     // Load a map from a 2D array of tile indices
    const baseGround = [
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
        [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0]
    ];

    // When loading from an array, make sure to specify the tileWidth and tileHeight
    const mapBase = this.make.tilemap({ data: baseGround, tileWidth: 48, tileHeight: 48 });
    const baseTiles = mapBase.addTilesetImage("ground");
    const layer0 = mapBase.createStaticLayer(0, baseTiles, 0, 0);

    const walls = [
        [  5,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    1,    6],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  3,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,   -1,    4],
        [  7,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    2,    8]
    ];

    const mapWalls = this.make.tilemap({ data: walls, tileWidth: 48, tileHeight: 48 });
    const wallTiles = mapWalls.addTilesetImage("scenery");
    const layer1 = mapWalls.createStaticLayer(0, wallTiles, 0, 0);

    layer1.setCollisionBetween(1, 8);
    
    const interiorWalls = [
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    -1,    -1],
        [  -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    -1,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    -1,    -1,    -1],
        [  -1,    -1,    -1,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    -1,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1],
        [  -1,    -1,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1]
    ];

    const mapInteriorWalls = this.make.tilemap({ data: interiorWalls, tileWidth: 48, tileHeight: 48 });
     const interiorWallTiles = mapInteriorWalls.addTilesetImage("scenery");
     const interiorLayer = mapInteriorWalls.createStaticLayer(0, interiorWallTiles, 0, 0);

    interiorLayer.setCollisionBetween(1, 15);
    
    const collectables = [
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
    ];

    const mapCollectables = this.make.tilemap({ data: collectables, tileWidth: 48, tileHeight: 48 });
     const collectableTiles = mapCollectables.addTilesetImage("collectables");
     const items = mapCollectables.createStaticLayer(0, collectableTiles, 0, 0);

    items.setCollisionBetween(1, 15);


    //groundGroup = this.add.group();
    //groundGroup.createMultiple({key: 'ground', repeat: width/48});
    //Phaser.Actions.SetXY(groundGroup.getChildren(), 24, 24, 48);
    //this.add.image(indexX, 300, 'ground');


    player1 = this.physics.add.sprite(250, 150, 'player1');
    player2 = this.physics.add.sprite(250, 400, 'player1');
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
    this.physics.add.collider(player1, layer1);
    this.physics.add.collider(player1, interiorLayer);
    //this.physics.add.overlap(player1, collectableLayer, collectItem, null, this);
    this.physics.add.collider(player1, murosDown);
    this.physics.add.collider(player1, murosUp);
    this.physics.add.collider(player1, murosRight);
    this.physics.add.collider(player1, murosLeft);


    this.physics.add.collider(player2, layer1);
    this.physics.add.collider(player2, interiorLayer);
    //this.physics.add.overlap(player1, collectableLayer, collectItem, null, this);
    this.physics.add.collider(player2, murosDown);
    this.physics.add.collider(player2, murosUp);
    this.physics.add.collider(player2, murosRight);
    this.physics.add.collider(player2, murosLeft);
    this.physics.add.collider(player1, player2);
    //FIN PLAYER
}

 update ()
{
    //JUGADOR 1
    if (cursors.left.isDown)
        {
            player1.setVelocityX(-160);
            player1.setVelocityY(0);

            player1.anims.play('left', true);
            playerLookingAt = "left";
        }
    else if(cursors.right.isDown)
        {
            player1.setVelocityX(160);
            player1.setVelocityY(0);

            player1.anims.play('right', true);
            playerLookingAt = "right";
        }
    else if(cursors.up.isDown) 
        {
            player1.setVelocityY(-160);
            player1.setVelocityX(0);

            player1.anims.play('up', true);
            playerLookingAt = "up";

        }
     else if(cursors.down.isDown)
        {
            player1.setVelocityY(160);
            player1.setVelocityX(0);

            player1.anims.play('down', true);
            playerLookingAt = "down";

        } 

     else if (keys.A.isDown)
        {
            player2.setVelocityX(-160);
            player2.setVelocityY(0);

            player2.anims.play('keyA', true);
            playerLookingAt2 = "keyA";
        }
    else if(keys.D.isDown)
        {
            player2.setVelocityX(160);
            player2.setVelocityY(0);

            player2.anims.play('keyD', true);
            playerLookingAt2 = "keyD";
        }
    else if(keys.W.isDown) 
        {
            player2.setVelocityY(-160);
            player2.setVelocityX(0);

            player2.anims.play('keyW', true);
            playerLookingAt = "keyW";

        }
     else if(keys.S.isDown)
        {
            player2.setVelocityY(160);
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
        
//  function collectItem(player1, collectableLayer)
//   {
//       collectableLayer.disableBody(true,true);
//   }


}

}