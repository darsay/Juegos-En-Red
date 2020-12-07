import { Player } from "../components/Player.js";

var player1;
var player2;
        var playerLookingAt;
        var walls;
        var interiorWalls;
        var murosDown;
        var murosUp;
        var murosRight;
        var murosLeft;
        var cursors;

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
    var numPlayers  = 1;
  }
  
  init() {
    this.score = 0;
  }

   preload(){
    this.load.spritesheet('scenery', 'assets/images/scenery.png',{ frameWidth: 17, frameHeight: 17});

    for(var i = 0; i<2; i++){
        this.load.spritesheet('player' + i, 'assets/images/players.png',{ frameWidth: 46.8, frameHeight: 48});
    }
    
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
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    7,    7,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    7,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    7,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    7,    7,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1]
    ];

    const mapInteriorWalls = this.make.tilemap({ data: interiorWalls, tileWidth: 48, tileHeight: 48 });
     const interiorWallTiles = mapInteriorWalls.addTilesetImage("scenery");
     const interiorLayer = mapInteriorWalls.createStaticLayer(0, interiorWallTiles, 0, 0);

     interiorLayer.setCollisionBetween(1, 15);
    


    //groundGroup = this.add.group();
    //groundGroup.createMultiple({key: 'ground', repeat: width/48});
    //Phaser.Actions.SetXY(groundGroup.getChildren(), 24, 24, 48);
    //this.add.image(indexX, 300, 'ground');

    var spawners = [[250, 150]]
    var players = new Array(this.numPlayers);

    for(var i = 0; i<players.length; i++){
        players[i] = new Player(i, this);
        //players[i] = this.physics.add.sprite(250, 150, 'player' + i);

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('player' + i, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player' + i, { start: 15, end: 17 }),
            frameRate: 10,  //FPS para la animacion
            repeat: -1  //Bucle
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player' + i, { start: 27, end: 29 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('player' +i, { start: 39, end: 41 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'turn',
            frames: [ { key: 'player' +i, frame: 4 } ],
            frameRate: 20
        });
    }


    //player1 = this.physics.add.sprite(250, 150, 'player1');
    

    //Entrada por teclado
    cursors = this.input.keyboard.createCursorKeys();
    //Fisica para colisionar con las platforms
    this.physics.add.collider(player1, layer1);
    this.physics.add.collider(player1, interiorLayer);
    this.physics.add.collider(player1, murosDown);
    this.physics.add.collider(player1, murosUp);
    this.physics.add.collider(player1, murosRight);
    this.physics.add.collider(player1, murosLeft);
    //FIN PLAYER
}

    update ()
    {

    }
}