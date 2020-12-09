var player1;
var player2;
        var playerLookingAt;
        var playerLookingAt2;
        var speed1, speed2;
        var hp1, hp2;
        var dmg1, dmg2;
        var cursors;
        var keys;
        var balls;
        var balls2;
        

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });
  }
  
  init() {
    this.score = 0;
  }

   preload(){
    this.load.image('ball', 'assets/images/ball.png');
    this.load.spritesheet('scenery', 'assets/images/scenery.png',{ frameWidth: 17, frameHeight: 17});
    this.load.spritesheet('player1', 'assets/images/players.png',{ frameWidth: 46.5, frameHeight: 48});
    this.load.spritesheet('collectables', 'assets/images/collectables.png',{ frameWidth: 16, frameHeight: 16});
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('dmgBox', 'assets/images/damagePU.png');
    this.load.image('lifeBox', 'assets/images/lifePU.png');
    this.load.image('speedBox', 'assets/images/speedPU.png');
    this.load.image('randomBox', 'assets/images/box.png');

    this.load.tilemapTiledJSON('map', 'assets/json/level111.json');

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

    // this.Collectables = this.physics.add.group({
    //     allowGravity: false,
    //     immovable: true
    //   });
    
     
    //   const items = map.getObjectLayer('Collectables')['objects'];
    //   items.forEach(itemObj => {
    //     // Add new spikes to our sprite group
    //     const item = this.Collectables.create(itemObj.x, itemObj.y - itemObj.height, 'collectables').setOrigin(0, 0);
    //   });
    
      /////////////////////////////////////
      this.HpUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const hpBoxes = map.getObjectLayer('HpUp')['objects'];
      hpBoxes.forEach(hpBox => {
        // Add new spikes to our sprite group
        const hpup1 = this.HpUp.create(hpBox.x, hpBox.y - hpBox.height, 'lifeBox').setOrigin(0, 0);
      });

      //////////////////////////////////////////////////////////////////////////////////////////////

      this.SpeedUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const speedBoxes = map.getObjectLayer('SpeedUp')['objects'];
      speedBoxes.forEach(speedBox => {
        // Add new spikes to our sprite group
        const speedup1 = this.SpeedUp.create(speedBox.x, speedBox.y - speedBox.height, 'speedBox').setOrigin(0, 0);
      });

///////////////////////////////////////////////
      this.DmgUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const dmgBoxes = map.getObjectLayer('DmgUp')['objects'];
      dmgBoxes.forEach(dmgBox => {
        // Add new spikes to our sprite group
        const dmgup1 = this.DmgUp.create(dmgBox.x, dmgBox.y - dmgBox.height, 'dmgBox').setOrigin(0, 0);
      });

      //////////////////////////////////////
      this.RandomUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const randomBoxes = map.getObjectLayer('RandomUp')['objects'];
      randomBoxes.forEach(randomBox => {
        // Add new spikes to our sprite group
        const randomup1 = this.RandomUp.create(randomBox.x, randomBox.y - randomBox.height, 'randomBox').setOrigin(0, 0);
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


      balls = this.physics.add.group();
      balls2 = this.physics.add.group();
      
      
      //this.physics.add.overlap(balls,  muros, choqueBala, null, this);
    //Entrada por teclado
    cursors = this.input.keyboard.createCursorKeys();//Para las flechas
    keys = this.input.keyboard.addKeys('W,S,A,D,M,T'); //Para el resto del teclado (Le puedes meter el resto de letras)
    //Fisica para colisionar con las platforms
    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);

    this.physics.add.collider(player1, player2);

    this.physics.add.overlap(player1,  this.HpUp, collectHp1, null, this);
    this.physics.add.overlap(player2,  this.HpUp, collectHp2, null, this);

    this.physics.add.overlap(player1,  this.SpeedUp, collectSpeed1, null, this);
    this.physics.add.overlap(player2,  this.SpeedUp, collectSpeed2, null, this);

    this.physics.add.overlap(player1,  this.DmgUp, collectDmg1, null, this);
    this.physics.add.overlap(player2,  this.DmgUp, collectDmg2, null, this);

    this.physics.add.overlap(player1,  this.RandomUp, collectRandom1, null, this);
    this.physics.add.overlap(player2,  this.RandomUp, collectRandom2, null, this);

    this.physics.add.overlap(player2, balls, quitarVida, null, this);
    this.physics.add.collider(player2, balls);

    this.physics.add.overlap(player1, balls2, quitarVida, null, this);
    this.physics.add.collider(player1, balls2);

   
    this.physics.add.collider(muros, balls);

   
    this.physics.add.collider(muros, balls2);
   
}

update(){

if(keys.M.isDown){
this.disparar();
}
if(keys.T.isDown){
  this.disparar2();
  }

this.movimiento2();
this.movimiento1();


}
 


 movimiento2 ()
{
   
   
      if (keys.A.isDown)
        {
            player2.setVelocityX(-speed2);
            player2.setVelocityY(0);

            player2.anims.play('keyA', true);
            playerLookingAt2 = 1;
        }
    else if(keys.D.isDown)
        {
            player2.setVelocityX(speed2);
            player2.setVelocityY(0);

            player2.anims.play('keyD', true);
            playerLookingAt2 = 2;
        }
    else if(keys.W.isDown) 
        {
            player2.setVelocityY(-speed2);
            player2.setVelocityX(0);

            player2.anims.play('keyW', true);
            playerLookingAt = 3;

        }
     else if(keys.S.isDown)
        {
            player2.setVelocityY(speed2);
            player2.setVelocityX(0);

            player2.anims.play('keyS', true);
            playerLookingAt2 = 4;

        }   
    else
        {
            
            player2.anims.play('turn2', true);
         
            player2.setVelocityX(0);
            player2.setVelocityY(0);
            playerLookingAt2 = 4;

        }

}  


 movimiento1 ()
 {

  if (cursors.left.isDown)
  {
      player1.setVelocityX(-speed1);
      player1.setVelocityY(0);

      player1.anims.play('left', true);
      playerLookingAt = 1;
  }
else if(cursors.right.isDown)
  {
      player1.setVelocityX(speed1);
      player1.setVelocityY(0);

      player1.anims.play('right', true);
      playerLookingAt = 2;
  }
else if(cursors.up.isDown) 
  {
      player1.setVelocityY(-speed1);
      player1.setVelocityX(0);

      player1.anims.play('up', true);
      playerLookingAt = 3;

  }
else if(cursors.down.isDown)
  {
      player1.setVelocityY(speed1);
      player1.setVelocityX(0);

      player1.anims.play('down', true);
      playerLookingAt = 4;

  } 
  else
        {
            
            player1.anims.play('turn', true);
         
            player1.setVelocityX(0);
            player1.setVelocityY(0);
            playerLookingAt = 4;
        }

}

 disparar(){
  this.ball= balls.create(player1.x, player1.y, 'ball');
  this.ball.setCollideWorldBounds(true);
  this.ball.setScale(0.01);
  switch(playerLookingAt){
case(1):
  this.ball.setVelocityX(-200);
  break;
  case(2):
  this.ball.setVelocityX(200);
  break;
  case(3):
  this.ball.setVelocityY(-200);
  break;
  case(4):
  this.ball.setVelocityY(200);
  break;
  }
 
 }

 disparar2(){
  this.ball2= balls2.create(player2.x, player2.y, 'ball');
  this.ball2.setCollideWorldBounds(true);
  this.ball2.setScale(0.01);
  switch(playerLookingAt2){
    case(1):
      this.ball2.setVelocityX(-200);
      break;
      case(2):
      this.ball2.setVelocityX(200);
      break;
      case(3):
      this.ball2.setVelocityY(-200);
      break;
      case(4):
      this.ball2.setVelocityY(200);
      break;
      }
 }


}




function quitarVida(player,item){
  item.disableBody(true,true);
}


function collectHp1(player, item)
   {
      item.disableBody(true,true);
      hp1 +=20;
   }
function collectHp2(player, item)
   {
      item.disableBody(true,true);
      hp2 +=20;
   }

function collectSpeed1(player, item)
   {
      item.disableBody(true,true);
      speed1 +=20;
   }
function collectSpeed2(player, item)
   {
      item.disableBody(true,true);
      speed2 +=20;
   }

   function collectDmg1(player, item)
   {
      item.disableBody(true,true);
      dmg1 +=20;
   }
function collectDmg2(player, item)
   {
      item.disableBody(true,true);
      dmg2 +=20;
   }

   function collectRandom1(player, item)
   {
       
      item.disableBody(true,true);
      let rand = Math.random(1,3);
    
      dmg1 +=20;
   }
function collectRandom2(player, item)
   {
      item.disableBody(true,true);
      dmg2 +=20;
   }

 