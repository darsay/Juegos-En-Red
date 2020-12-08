
       
import { Player } from "../components/Player.js";
import { Player2 } from "../components/Player2.js";

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
    this.player1 = new Player(this,6);
    this.player2 = new Player2(this,0);
    
    
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
   
    
    this.player1.create();
    this.player2.create();
    
    
    this.physics.add.collider(this.player1, muros);
    this.physics.add.collider(this.player2, muros);

    this.physics.add.collider(this.player1, this.player2);

    this.physics.add.overlap(this.player1,  this.Collectables, collectItem1, null, this);
    this.physics.add.overlap(this.player2,  this.Collectables, collectItem2, null, this);

}

 update ()
{
    this.player1.update();
    this.player2.update();
    
     
    


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