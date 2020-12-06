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
       
import { Player } from "../components/Player.js";
import { Player2 } from "../components/Player2.js";

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
    this.player1 = new Player(this,51);
    this.player2 = new Player2(this,3);
    
    
  }
  
  init() {
    this.score = 0;
  }

   preload(){
       this.player1.preload();
       this.player2.preload();
       
    this.load.spritesheet('scenery', 'assets/images/scenery.png',{ frameWidth: 17, frameHeight: 17});
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
        [  -1,    -1,    -1,    -1,    -1,    -1,    -1,    1,    1,    1,    -1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    -1,    -1],
        [  -1,    -1,    1,    -1,    -1,    -1,    2,    -1,    -1,    -1,    2,    -1,    -1,    -1,    1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    1,    1,    -1,    1,    1,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    2,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    2,    -1,    -1,    -1],
        [  -1,    -1,    -1,    1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    1,    -1,    -1,    -1],
        [  -1,    -1,    -1,    -1,    -1,    -1,    2,    2,    -1,    2,    2,    -1,    -1,    -1,    -1,    -1,    -1],
        [  -1,    -1,    2,    -1,    -1,    -1,    1,    -1,    -1,    -1,    1,    -1,    -1,    -1,    2,    -1,    -1],
        [  -1,    -1,    1,    1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    -1,    1,    1,    -1,    -1],
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
    
    this.player1.create();
    this.player2.create();
    
     this.physics.add.collider(this.player1, layer1);
    this.physics.add.collider(this.player1, interiorLayer);
    //this.physics.add.overlap(player1, collectableLayer, collectItem, null, this);
    this.physics.add.collider(this.player1, murosDown);
    this.physics.add.collider(this.player1, murosUp);
    this.physics.add.collider(this.player1, murosRight);
    this.physics.add.collider(this.player1, murosLeft); 
}

 update ()
{
    this.player1.update();
    this.player2.update();
    


}

}