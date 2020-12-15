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
        var NumeroVida;
        var NumeroVida2;
        var shootTime1=0; //Controla el numero de balas que se pueden disparar en un periodo de tiempo
        var shootTime2=0;
        
        var Level;
       var V1;
       var V2;
      

export class Game extends Phaser.Scene {

  constructor() {
    super({ key: 'game' });

    
  }
  
   init(data)
  {     
    this.id= data.id;
    }
    
      
  

   preload(){
    
    this.load.image('ball', 'assets/images/ball.png');
    this.load.spritesheet('scenery', 'assets/images/scenery.png',{ frameWidth: 17, frameHeight: 17});
    this.load.spritesheet('player1', 'assets/images/players.png',{ frameWidth: 46.5, frameHeight: 48});
    this.load.spritesheet('brujaSp', 'assets/images/brujaSprite.png',{ frameWidth: 46.5, frameHeight: 48});
    this.load.spritesheet('zombieSp', 'assets/images/zombieSprite.png',{ frameWidth: 48, frameHeight: 48});
    this.load.spritesheet('collectables', 'assets/images/collectables.png',{ frameWidth: 16, frameHeight: 16});
    this.load.image('ground', 'assets/images/ground.png');
    this.load.image('dmgBox', 'assets/images/damagePU.png');
    this.load.image('lifeBox', 'assets/images/lifePU.png');
    this.load.image('speedBox', 'assets/images/speedPU.png');
    this.load.image('randomBox', 'assets/images/box.png');
    //this.load.image('chest', 'assets/images/box.png');

    
      this.load.tilemapTiledJSON('map', 'assets/tileMaps/level1.json');
      
      this.load.tilemapTiledJSON('map2', 'assets/tileMaps/level2.json');
      
      this.load.tilemapTiledJSON('map3', 'assets/tileMaps/level3.json');
      
      this.load.tilemapTiledJSON('map4', 'assets/tileMaps/level4.json');
      
      this.load.tilemapTiledJSON('map5', 'assets/tileMaps/level5.json');
  

    this.load.audio('disparo','assets/sounds/disparo.wav');
    this.load.audio('box','assets/sounds/box.wav');

}

 create(data){
   Level = data.id;
   V1 =data.vic1;
   V2= data.vic2;
   //Para la musica del menu de inicio
    this.sound.get('intro').stop();
    //Crea el tilemap
    var map;
    switch(Level){
      case(0):
      map = this.make.tilemap({ key: 'map' });
      break;
      case(1):
       map = this.make.tilemap({ key: 'map2' });
      break;
      case(2):
      map = this.make.tilemap({ key: 'map3' });
      break;
      case(3):
      map = this.make.tilemap({ key: 'map4' });
      break;
      case(4):
      map = this.make.tilemap({ key: 'map5' });
      break;
      
    }
    
    //Añade el tileSet de la capa de Mazmorra que coge los elementos de escenario
    const tileset = map.addTilesetImage('Mazmorra', 'scenery');
    //Crea el suelo y los muros en variables distintas para solo 
    //Chocar con los muros
    const suelo = map.createStaticLayer('Suelo', tileset, 0, 0);
    const muros = map.createStaticLayer('Muros', tileset, 0, 0);
    //Colisiona todo lo que tenga un indice distinto de -1 (todos los muros)
    muros.setCollisionByExclusion(-1, true);
    
    //Aqui empiezan a crearse los objetos coleccionables que aumentan las estadisticas de los personajes
    
    //Añadimos HpUp, que viene dado del mapa a un grupo de fisicas sin gravedad e inamovible
    this.HpUp = this.physics.add.group({
      allowGravity: false,
      immovable: true
    });
    
     //Aqui creamos cada caja individualmente con el sprite llamado desde lifeBox 
    const hpBoxes = map.getObjectLayer('HpUp')['objects'];
    hpBoxes.forEach(hpBox => {
      const hpup1 = this.HpUp.create(hpBox.x, hpBox.y - hpBox.height, 'lifeBox').setOrigin(0, 0);
    });

    
    //Lo mismo con velocidad
      this.SpeedUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const speedBoxes = map.getObjectLayer('SpeedUp')['objects'];
      speedBoxes.forEach(speedBox => {
        const speedup1 = this.SpeedUp.create(speedBox.x, speedBox.y - speedBox.height, 'speedBox').setOrigin(0, 0);
      });

    //Lo mismo con daño
      this.DmgUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const dmgBoxes = map.getObjectLayer('DmgUp')['objects'];
      dmgBoxes.forEach(dmgBox => {
        const dmgup1 = this.DmgUp.create(dmgBox.x, dmgBox.y - dmgBox.height, 'dmgBox').setOrigin(0, 0);
      });

    //Lo mismo con las cajas Random
      this.RandomUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const randomBoxes = map.getObjectLayer('RandomUp')['objects'];
      randomBoxes.forEach(randomBox => {
        const randomup1 = this.RandomUp.create(randomBox.x, randomBox.y - randomBox.height, 'randomBox').setOrigin(0, 0);
      });

    //Lo mismo con la caja que aumenta todas las estadisticas
      this.EveryUp = this.physics.add.group({
        allowGravity: false,
        immovable: true
      });
    
     
      const everyBoxes = map.getObjectLayer('EveryUp')['objects'];
      everyBoxes.forEach(everyBox => {
        const everyup1 = this.EveryUp.create(everyBox.x, everyBox.y - everyBox.height, 'collectables').setOrigin(0, 0);
      });


    //Aqui se crea el player y se inicializan sus sprites y propiedades
    player1 = this.physics.add.sprite(70, 70, 'brujaSp');
    player2 = this.physics.add.sprite(785, 554, 'zombieSp');
    player1.setScale(0.8);
    player2.setScale(0.8);
    speed1 = 160;
    speed2 = speed1;
    hp1 = 1000;
    hp2 = hp1;
    dmg1 = 20;
    dmg2 = dmg1;
  /////////////////// Se muestran las vidas de ambos/////////////////////////////  
    NumeroVida= this.add.text(50,5,'P1 Hp: ' + hp1, { fontSize: '32px', fill: '#000', backgroundColor: 'pink', });
    NumeroVida2= this.add.text(595,5,'P2 Hp: ' + hp2, { fontSize: '32px', fill: '#000', backgroundColor: 'powderblue', });
/////////////////////////////////////////////////////////////////
     player1.setScale(0.8);
     player2.setScale(0.8);
     
    //Se crean las animaciones de los dos personajes
    this.anims.create({
        key: 'down',
        frames: this.anims.generateFrameNumbers('brujaSp', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('brujaSp', { start: 4, end: 7 }),
        frameRate: 10,  //FPS para la animacion
        repeat: -1  //Bucle
    });
    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('brujaSp', { start: 8, end: 11 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'up',
        frames: this.anims.generateFrameNumbers('brujaSp', { start: 12, end: 15 }),
        frameRate: 10,
        repeat: -1
    });
    this.anims.create({
        key: 'turn',
        frames: [ { key: 'brujaSp', frame: 0 } ],
        frameRate: 20
    });


    this.anims.create({
      key: 'keyS',
      frames: this.anims.generateFrameNumbers('zombieSp', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
      key: 'keyA',
      frames: this.anims.generateFrameNumbers('zombieSp', { start: 8, end: 11 }),
      frameRate: 10,  //FPS para la animacion
      repeat: -1  //Bucle
  });
  this.anims.create({
      key: 'keyD',
      frames: this.anims.generateFrameNumbers('zombieSp', { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
      key: 'keyW',
      frames: this.anims.generateFrameNumbers('zombieSp', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1
  });
  this.anims.create({
      key: 'turn2',
      frames: [ { key: 'zombieSp', frame: 0 } ],
      frameRate: 20
  });
  
  //Se crean las fisicas de las balas
      balls = this.physics.add.group();
      balls2 = this.physics.add.group();
      
      
      
    //Entrada por teclado
    cursors = this.input.keyboard.createCursorKeys();//Para las flechas
    keys = this.input.keyboard.addKeys('W,S,A,D,M,T'); //Para el resto del teclado (Le puedes meter el resto de letras)
    //// FISICAS ////
    //Fisica para colisionar con las platforms
    this.physics.add.collider(player1, muros);
    this.physics.add.collider(player2, muros);
    //Añade colisiones de player1 con player2
    this.physics.add.collider(player1, player2);

    //Cajas
    //Añade los metodos para que cuando player1 o player 2 cojan vida, les aumente la vida
    this.physics.add.overlap(player1,  this.HpUp, collectHp1, null, this);
    this.physics.add.overlap(player2,  this.HpUp, collectHp2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan velocidad, les aumente la velocidad
    this.physics.add.overlap(player1,  this.SpeedUp, collectSpeed1, null, this);
    this.physics.add.overlap(player2,  this.SpeedUp, collectSpeed2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan daño, les aumente el daño
    this.physics.add.overlap(player1,  this.DmgUp, collectDmg1, null, this);
    this.physics.add.overlap(player2,  this.DmgUp, collectDmg2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan una caja random, les aumente una propiedad aleatoria
    this.physics.add.overlap(player1,  this.RandomUp, collectRandom1, null, this);
    this.physics.add.overlap(player2,  this.RandomUp, collectRandom2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan el cofre, les aumente un nivel cada propiedad
    this.physics.add.overlap(player1,  this.EveryUp, collectEvery1, null, this);
    this.physics.add.overlap(player2,  this.EveryUp, collectEvery2, null, this);



    //BALAS
    //Añade las colisiones y los metodos para quitar vida de los dos jugadores
    this.physics.add.overlap(player2, balls, quitarVida2, null, this);
    this.physics.add.collider(player2, balls);

    this.physics.add.overlap(player1, balls2, quitarVida1, null, this);
    this.physics.add.collider(player1, balls2);

    //Añade las colisiones de las balas con los muros
    this.physics.add.collider(muros, balls, rompeBala);
    this.physics.add.collider(muros, balls2, rompeBala);

   
    this.disparo= this.sound.add('disparo');
    this.disparo.setVolume(0.05);
    this.box= this.sound.add('box');
    this.box.setVolume(0.05);

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


// GAME OVER
if(hp1<=0 || hp2<=0){
  
  this.cameras.main.shake(500);
  
  this.time.delayedCall(250, function() {
    this.cameras.main.fade(250);
  }, [], this);

  if(hp1>hp2){
     V1++;
    }
  else{
     V2++;
    }
  
  if(Level<=4){
    Level ++;
   

      switch (Level){
        case(1):
        this.time.delayedCall(500, function() {
          this.registry.destroy(); // destroy registry
          this.events.off(); // disable all active events
        this.scene.start('game', { id: 1, vic1: V1, vic2: V2}); 
      }, [], this);
        break;
        case(2):
        this.time.delayedCall(500, function() {
          this.registry.destroy(); // destroy registry
          this.events.off(); // disable all active events
        this.scene.start('game', { id: 2, vic1: V1, vic2: V2}); 
      }, [], this);
        break;
        case(3):
        this.time.delayedCall(500, function() {
          this.registry.destroy(); // destroy registry
          this.events.off(); // disable all active events
        this.scene.start('game', { id: 3, vic1: V1, vic2: V2}); 
      }, [], this); 
        break;
        case(4):
        this.time.delayedCall(500, function() {
          this.registry.destroy(); // destroy registry
          this.events.off(); // disable all active events
        this.scene.start('game', { id: 4, vic1: V1, vic2: V2}); 
      }, [], this); 
        break;

      }
      
    

  }else{

    if(V1>V2){
      this.time.delayedCall(500, function() {
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.start('Final'); }, [], this);

    }
    else{

      this.time.delayedCall(500, function() {
        this.registry.destroy(); // destroy registry
        this.events.off(); // disable all active events
        this.scene.start('Final2'); }, [], this);
    }

    
  }
  

 /* 
 if(this.Level1<=4){
   this.Level1++
   this.Level1= this.Level1 + 1;
  this.time.delayedCall(500, function() {
    this.scene.start(this.key, { id: this.Level1});
  }, [], this);
  
}else{ 
  this.time.delayedCall(500, function() {
    this.scene.start('Final');
  }, [], this);

}  */

}

}
//FIN UPDATE
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
            playerLookingAt2 = 3;

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
            
           
          player2.setVelocityX(0);
          player2.setVelocityY(0);
          switch(playerLookingAt2){
            case(1):
            player2.anims.play('keyA', true);
            player2.anims.stop('keyA', true);
              break;
              case(2):
              player2.anims.play('keyD', true);
              player2.anims.stop('keyD', true);
              break;
              case(3):
              player2.anims.play('keyW', true);
              player2.anims.stop('keyW', true);
              break;
              case(4):
              player2.anims.play('keyS', true);
              player2.anims.stop('keyS', true);
              break;
              }
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
            
            
         
            player1.setVelocityX(0);
            player1.setVelocityY(0);
            switch(playerLookingAt){
              case(1):
              player1.anims.play('left', true);
              player1.anims.stop('left', true);
                break;
                case(2):
                player1.anims.play('right', true);
                player1.anims.stop('right', true);
                break;
                case(3):
                player1.anims.play('up', true);
                player1.anims.stop('up', true);
                break;
                case(4):
                player1.anims.play('down', true);
                player1.anims.stop('down', true);
                break;
                }
        }

}

 disparar(){
  
   if(this.time.now > shootTime1){
     this.disparo.play();
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

  shootTime1= this.time.now +600;

  
}


 }

 disparar2(){
   if(this.time.now>shootTime2){
     this.disparo.play();
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

      shootTime2=this.time.now + 600;
    }

 }


}


 function rompeBala(ball,muro){
  ball.disableBody(true,true);

}  

function quitarVida2(player,item){
  item.disableBody(true,true);
  hp2-= dmg1;
  NumeroVida2.setText('P2 Hp: '+hp2)
}

function quitarVida1(player,item){
  item.disableBody(true,true);
  hp1-= dmg2;
  NumeroVida.setText('P1 Hp: ' + hp1);
}



function collectHp1(player, item)
   {
      item.disableBody(true,true);
      hp1 +=100;
      NumeroVida.setText('P1 Hp: ' + hp1);
      this.box.play();
   }
function collectHp2(player, item)
   {
      item.disableBody(true,true);
      hp2 +=100;
      NumeroVida2.setText('P2 Hp: ' + hp2);
      this.box.play();
   }

function collectSpeed1(player, item)
   {
      item.disableBody(true,true);
      speed1 +=25;
      this.box.play();
   }
function collectSpeed2(player, item)
   {
      item.disableBody(true,true);
      speed2 +=25;
      this.box.play();
   }

   function collectDmg1(player, item)
   {
      item.disableBody(true,true);
      dmg1 +=20;
      this.box.play();
   }
function collectDmg2(player, item)
   {
      item.disableBody(true,true);
      dmg2 +=20;
      this.box.play();
   }

   function collectEvery1(player, item)
   {
      item.disableBody(true,true);
      dmg1 +=20;
      speed1 +=25;
      hp1 +=100;
      NumeroVida.setText('P1 Hp: ' + hp1);
      this.box.play();
   }
function collectEvery2(player, item)
   {
      item.disableBody(true,true);
      dmg2 +=20;
      speed2 +=25;
      hp2 +=100;
      NumeroVida2.setText('P2 Hp: ' + hp2);
      this.box.play();
   }

   function collectRandom1(player, item)
   {
      item.disableBody(true,true);
      let rand = random(1,3);
    if(rand === 1){
        speed1 +=25;
    }else if(rand === 2){
        hp1 += 100;
        NumeroVida.setText('P1 Hp: ' + hp1);
    }else{
        dmg1 += 20;
        
    }
    this.box.play();
   }

function collectRandom2(player, item)
   {
      item.disableBody(true,true);
      let rand = random(1,3);
    if(rand === 1){
        speed2 +=25;
    }else if(rand === 2){
        hp2 += 100;
        NumeroVida2.setText('P2 Hp: ' + hp2);
    }else{
        dmg2 += 20;
    }
    this.box.play();
   }
   function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  