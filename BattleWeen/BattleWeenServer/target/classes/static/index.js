
/* import { Game } from './scenes/game.js';
import { Menu } from './scenes/menu.js';
import { Final } from './scenes/Final.js';
import { Tutorial } from './scenes/tutorial.js'; */
$(document).ready(function () {
  
/* var sceneConfig = {
  init: init,
  preload: preload,
  create: create,
  update: update,
};

  const config = {
    type: Phaser.AUTO,
    width: 864,
    height: 624,
    scene: sceneConfig,
    scale: {
      parent: 'CanvasDiv',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 864,
      height: 624,
    },
    key:'game',
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        
        debug: false
      }
    }
      
  
    
  } */
  
  var game = new Phaser.Game(864, 624, Phaser.AUTO, 'game', { init : init, preload: preload, create: create, update: update });
  
  connection = new WebSocket("ws://127.0.0.1:8080/prueba");
  connection.onerror = function (e) {
    console.log("WS error: " + e);
  };
  connection.onmessage = function (data) {
    console.log("WS message: " + data);
  };
  connection.onclose = function () {
    console.log("Closing socket");
  };




var player1;
var name1;
var name2;
var player2;
var collider1;
var collider2;
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
var shootTime1 = 0; //Controla el numero de balas que se pueden disparar en un periodo de tiempo
var shootTime2 = 0;

var Level;
var V1;
var V2;

var CanSume;
var CanSume2;

var NumeroUsers = "";
var ServerStatus = "";

var currentTime = 0;

var connection;




  
  
  
  function init(data) {
    game.id = data.id;
  }

 function preload() {
    game.load.spritesheet("collider", "assets/images/empty.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    game.load.image("witchBullet", "assets/images/witchBullet.png");
    game.load.image("zombieBullet", "assets/images/zombieBullet.png");
    game.load.spritesheet("scenery", "assets/images/scenery.png", {
      frameWidth: 17,
      frameHeight: 17,
    });
    game.load.spritesheet("player1", "assets/images/players.png", {
      frameWidth: 46.5,
      frameHeight: 48,
    });
    game.load.spritesheet("brujaSp", "assets/images/brujaSprite.png", {
      frameWidth: 46.5,
      frameHeight: 48,
    });
    game.load.spritesheet("zombieSp", "assets/images/zombieSprite.png", {
      frameWidth: 46.5,
      frameHeight: 48,
    });
    game.load.spritesheet("collectables", "assets/images/collectables.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    game.load.image("ground", "assets/images/ground.png");
    game.load.image("dmgBox", "assets/images/damagePU.png");
    game.load.image("lifeBox", "assets/images/lifePU.png");
    game.load.image("speedBox", "assets/images/speedPU.png");
    game.load.image("randomBox", "assets/images/randomPU.png");
    game.load.image("chest", "assets/images/chestPU.png");
    game.load.image("fondito", "assets/images/pointsBg.png");

    game.load.tilemapTiledJSON("map", "assets/tileMaps/level1.json");

    game.load.tilemapTiledJSON("map2", "assets/tileMaps/level2.json");

    game.load.tilemapTiledJSON("map3", "assets/tileMaps/level3.json");

    game.load.tilemapTiledJSON("map4", "assets/tileMaps/level4.json");

    game.load.tilemapTiledJSON("map5", "assets/tileMaps/level5.json");

    game.load.audio("disparo", "assets/sounds/disparo.wav");
    game.load.audio("disparo2", "assets/sounds/ZombieShot.mp3");
    game.load.audio("box", "assets/sounds/box.wav");
    game.load.audio("GameMusic", "assets/sounds/Music.mp3");
  } ////////////////////// FIN PRELOAD///////////////////////////////

  function create(data) {
    Level = data.id;
    V1 = data.vic1;
    V2 = data.vic2;

    //Para la musica del menu de inicio
    game.sound.stopAll();

    game.musica = game.sound.add("GameMusic");
    game.musica.setVolume(0.03);
    game.musica.play();
    //Crea el tilemap
    var map;
    switch (Level) {
      case 0:
        map = game.make.tilemap({ key: "map" });
        break;
      case 1:
        map = game.make.tilemap({ key: "map2" });
        break;
      case 2:
        map = game.make.tilemap({ key: "map3" });
        break;
      case 3:
        map = game.make.tilemap({ key: "map4" });
        break;
      case 4:
        map = game.make.tilemap({ key: "map5" });
        break;
    }

    //Añade el tileSet de la capa de Mazmorra que coge los elementos de escenario
    const tileset = map.addTilesetImage("Mazmorra", "scenery");
    //Crea el suelo y los muros en variables distintas para solo
    //Chocar con los muros
    const suelo = map.createStaticLayer("Suelo", tileset, 0, 0);
    const muros = map.createStaticLayer("Muros", tileset, 0, 0);
    //Colisiona todo lo que tenga un indice distinto de -1 (todos los muros)
    muros.setCollisionByExclusion(-1, true);

    //Aqui empiezan a crearse los objetos coleccionables que aumentan las estadisticas de los personajes

    //Añadimos HpUp, que viene dado del mapa a un grupo de fisicas sin gravedad e inamovible
    game.HpUp = game.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    //Aqui creamos cada caja individualmente con el sprite llamado desde lifeBox
    const hpBoxes = map.getObjectLayer("HpUp")["objects"];
    hpBoxes.forEach((hpBox) => {
      const hpup1 = game.HpUp.create(
        hpBox.x,
        hpBox.y - hpBox.height,
        "lifeBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con velocidad
    game.SpeedUp = game.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const speedBoxes = map.getObjectLayer("SpeedUp")["objects"];
    speedBoxes.forEach((speedBox) => {
      const speedup1 = game.SpeedUp.create(
        speedBox.x,
        speedBox.y - speedBox.height,
        "speedBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con daño
    game.DmgUp = game.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const dmgBoxes = map.getObjectLayer("DmgUp")["objects"];
    dmgBoxes.forEach((dmgBox) => {
      const dmgup1 = game.DmgUp.create(
        dmgBox.x,
        dmgBox.y - dmgBox.height,
        "dmgBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con las cajas Random
    game.RandomUp = game.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const randomBoxes = map.getObjectLayer("RandomUp")["objects"];
    randomBoxes.forEach((randomBox) => {
      const randomup1 = game.RandomUp.create(
        randomBox.x,
        randomBox.y - randomBox.height,
        "randomBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con la caja que aumenta todas las estadisticas
    game.EveryUp = game.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const everyBoxes = map.getObjectLayer("EveryUp")["objects"];
    everyBoxes.forEach((everyBox) => {
      const everyup1 = game.EveryUp.create(
        everyBox.x,
        everyBox.y - everyBox.height,
        "chest"
      ).setOrigin(0, 0);
    });

    //Aqui se crea el player y se inicializan sus sprites y propiedades
    collider1 = game.physics.add.sprite(70, 70, "collider");
    collider2 = game.physics.add.sprite(785, 554, "collider");

    player1 = game.physics.add.sprite(70, 70, "brujaSp");
    player2 = game.physics.add.sprite(785, 554, "zombieSp");
    player1.setScale(1);
    player2.setScale(1);
    speed1 = 160;
    speed2 = speed1;
    hp1 = 400;
    hp2 = hp1;
    dmg1 = 20;
    dmg2 = dmg1;
    /////////////////// Se muestran las vidas de ambos/////////////////////////////
    game.add.image(150, 5, "fondito").setScale(1.5, 1);
    game.add.image(720, 5, "fondito").setScale(1.5, 1);

    NumeroVida = game.add.text(50, 5, "P1 Hp: " + hp1, {
      fontSize: "32px",
      fill: "white",
      fontStyle: "bold",
    });
    NumeroVida2 = game.add.text(595, 5, "P2 Hp: " + hp2, {
      fontSize: "32px",
      fill: "white",
      fontStyle: "bold",
    });
    NumeroUsers = game.add.text(5, 600, "Hay activos: " + 0, {
      fontSize: "20px",
      fill: "white",
      fontStyle: "bold",
    });
    ServerStatus = game.add.text(550, 600, "Servidor: Conectando...", {
      fontSize: "20px",
      fill: "white",
      fontStyle: "bold",
    });
    name1 = game.add.text(0, 0, "Jugador 1", {
      fontSize: "15px",
      fill: "white",
      fontStyle: "bold",
    });
    name2 = game.add.text(0, 0, "Jugador 2", {
      fontSize: "15px",
      fill: "white",
      fontStyle: "bold",
    });
    /////////////////////////////////////////////////////////////////

    //Se crean las animaciones de los dos personajes
    game.anims.create({
      key: "down",
      frames: game.anims.generateFrameNumbers("brujaSp", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: "left",
      frames: game.anims.generateFrameNumbers("brujaSp", { start: 4, end: 7 }),
      frameRate: 10, //FPS para la animacion
      repeat: -1, //Bucle
    });
    game.anims.create({
      key: "right",
      frames: game.anims.generateFrameNumbers("brujaSp", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: "up",
      frames: game.anims.generateFrameNumbers("brujaSp", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: "turn",
      frames: [{ key: "brujaSp", frame: 0 }],
      frameRate: 20,
    });

    game.anims.create({
      key: "keyS",
      frames: game.anims.generateFrameNumbers("zombieSp", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: "keyA",
      frames: game.anims.generateFrameNumbers("zombieSp", {
        start: 8,
        end: 11,
      }),
      frameRate: 10, //FPS para la animacion
      repeat: -1, //Bucle
    });
    game.anims.create({
      key: "keyD",
      frames: game.anims.generateFrameNumbers("zombieSp", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: "keyW",
      frames: game.anims.generateFrameNumbers("zombieSp", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    game.anims.create({
      key: "turn2",
      frames: [{ key: "zombieSp", frame: 0 }],
      frameRate: 20,
    });

    //Se crean las fisicas de las balas
    balls = game.physics.add.group();
    balls2 = game.physics.add.group();

    //Entrada por teclado
    cursors = game.input.keyboard.createCursorKeys(); //Para las flechas
    keys = game.input.keyboard.addKeys("W,S,A,D,M,T"); //Para el resto del teclado (Le puedes meter el resto de letras)
    //// FISICAS ////
    //Fisica para colisionar con las platforms
    game.physics.add.collider(collider2, muros);
    game.physics.add.collider(collider1, muros);
    //Añade colisiones de player1 con player2
    //game.physics.add.collider(player1, player2);

    //Cajas
    //Añade los metodos para que cuando player1 o player 2 cojan vida, les aumente la vida
    game.physics.add.overlap(player1, game.HpUp, collectHp1, null, game);
    game.physics.add.overlap(player2, game.HpUp, collectHp2, null, game);

    //Añade los metodos para que cuando player1 o player 2 cojan velocidad, les aumente la velocidad
    game.physics.add.overlap(player1, game.SpeedUp, collectSpeed1, null, game);
    game.physics.add.overlap(player2, game.SpeedUp, collectSpeed2, null, game);

    //Añade los metodos para que cuando player1 o player 2 cojan daño, les aumente el daño
    game.physics.add.overlap(player1, game.DmgUp, collectDmg1, null, game);
    game.physics.add.overlap(player2, game.DmgUp, collectDmg2, null, game);

    //Añade los metodos para que cuando player1 o player 2 cojan una caja random, les aumente una propiedad aleatoria
    game.physics.add.overlap(
      player1,
      game.RandomUp,
      collectRandom1,
      null,
      game
    );
    game.physics.add.overlap(
      player2,
      game.RandomUp,
      collectRandom2,
      null,
      game
    );

    //Añade los metodos para que cuando player1 o player 2 cojan el cofre, les aumente un nivel cada propiedad
    game.physics.add.overlap(player1, game.EveryUp, collectEvery1, null, game);
    game.physics.add.overlap(player2, game.EveryUp, collectEvery2, null, game);

    //BALAS
    //Añade las colisiones y los metodos para quitar vida de los dos jugadores
    game.physics.add.overlap(player2, balls, quitarVida2, null, game);
    game.physics.add.collider(player2, balls);

    game.physics.add.overlap(player1, balls2, quitarVida1, null, game);
    game.physics.add.collider(player1, balls2);

    //Añade las colisiones de las balas con los muros
    game.physics.add.collider(muros, balls, rompeBala);
    game.physics.add.collider(muros, balls2, rompeBala);

    game.disparo = game.sound.add("disparo");
    game.disparo.setVolume(0.05);

    game.disparo2 = game.sound.add("disparo2");
    game.disparo2.setVolume(0.05);

    game.box = game.sound.add("box");
    game.box.setVolume(0.05);

    CanSume = false;
    CanSume2 = false;
  } ////////////////////////// FIN CREATE ///////////////////////////////////

  function update() {
    if (Date.now() - 300 > currentTime) {
      activeUsers();
      ping();
      updateNames();
      currentTime = Date.now();
    }

    if (keys.M.isDown) {
      disparar();
    }
    if (keys.T.isDown) {
      disparar2();
    }

    movimiento2();
    movimiento1();

    // GAME OVER
    if (hp1 <= 0 || hp2 <= 0) {
      game.sound.get("GameMusic").stop();

      game.cameras.main.shake(500);

      game.time.delayedCall(
        250,
        function () {
          game.cameras.main.fade(250);
        },
        [],
        game
      )

      if (hp1 > hp2 && CanSume == false) {
        V1++;
        CanSume = true;
      } else if (hp2 > hp1 && CanSume2 == false) {
        V2++;
        CanSume2 = true;
      }

      if (Level <= 4) {
        Level++;

        switch (Level) {
          case 1:
            game.time.delayedCall(
              500,
              function () {
                game.registry.destroy(); // destroy registry
                game.events.off(); // disable all active events
                game.scene.start("game", { id: 1, vic1: V1, vic2: V2 });
              },
              [],
              game
            );
            break;
          case 2:
            game.time.delayedCall(
              500,
              function () {
                game.registry.destroy(); // destroy registry
                game.events.off(); // disable all active events
                game.scene.start("game", { id: 2, vic1: V1, vic2: V2 });
              },
              [],
              game
            );
            break;
          case 3:
            game.time.delayedCall(
              500,
              function () {
                game.registry.destroy(); // destroy registry
                game.events.off(); // disable all active events
                game.scene.start("game", { id: 3, vic1: V1, vic2: V2 });
              },
              [],
              game
            );
            break;
          case 4:
            game.time.delayedCall(
              500,
              function () {
                game.registry.destroy(); // destroy registry
                game.events.off(); // disable all active events
                game.scene.start("game", { id: 4, vic1: V1, vic2: V2 });
              },
              [],
              game
            );
            break;
        }
      } else {
        if (V1 > V2) {
          game.time.delayedCall(
            500,
            function () {
              game.registry.destroy(); // destroy registry
              game.events.off(); // disable all active events
              game.scene.start("Final", { vic1: V1, vic2: V2 });
            },
            [],
            game
          );
        } else {
          game.time.delayedCall(
            500,
            function () {
              game.registry.destroy(); // destroy registry
              game.events.off(); // disable all active events
              game.scene.start("Final", { vic1: V1, vic2: V2 });
            },
            [],
            game
          );
        }
      }

                /* 
          if(game.Level1<=4){
            game.Level1++
            game.Level1= game.Level1 + 1;
            game.time.delayedCall(500, function() {
              game.scene.start(game.key, { id: game.Level1});
            }, [], game);
            
          }else{ 
            game.time.delayedCall(500, function() {
              game.scene.start('Final');
            }, [], game);

          }  */
    }
  }
  //FIN UPDATE

  function updateHost(){}

 function updateClient(){}

  



  
 function gameOver() {}


  function disparar() {
    if (game.time.now > shootTime1) {
      game.disparo.play();
      game.ball = balls.create(player1.x, player1.y, "witchBullet");
      game.ball.setCollideWorldBounds(true);
      game.ball.setScale(0.05);
      switch (playerLookingAt) {
        case 1:
          game.ball.setVelocityX(-300);
          break;
        case 2:
          game.ball.setVelocityX(300);
          break;
        case 3:
          game.ball.setVelocityY(-300);
          break;
        case 4:
          game.ball.setVelocityY(300);
          break;
      }

      shootTime1 = game.time.now + 600;
    }
  }

 function disparar2() {
    if (game.time.now > shootTime2) {
      game.disparo2.play();
      game.ball2 = balls2.create(player2.x, player2.y, "zombieBullet");
      game.ball2.setCollideWorldBounds(true);
      game.ball2.setScale(0.03);
      switch (playerLookingAt2) {
        case 1:
          game.ball2.setVelocityX(-300);
          break;
        case 2:
          game.ball2.setVelocityX(300);
          break;
        case 3:
          game.ball2.setVelocityY(-300);
          break;
        case 4:
          game.ball2.setVelocityY(300);
          break;
      }

      shootTime2 = game.time.now + 600;
    }
  }




connection.onmessage = function(data){
  var parsedData = JSON.parse(data.data);
  if(parsedData.ishost==1){
      host = 1;
  }
  
  else if (host==1){
      messageHost(parsedData);
  }
  else{
      messageHost(parsedData);
  
  }

  
}

function messageHost(parsedData){
  
 player2.x = parsedData.position.x;
 player2.y = parsedData.position.y;

}
function movimiento2() {
  if (keys.A.isDown) {
    
    var webSocketData =JSON.stringify({
      position:{
          x: player.position.x,
          y: player.position.y
      }
    });

    connection.send(webSocketData);

    collider2.setVelocityX(-speed2);
    collider2.setVelocityY(0);
    player2.x = collider2.x;
    player2.y = collider2.y - 7;

    player2.anims.play("keyA", true);
    playerLookingAt2 = 1;
  } else if (keys.D.isDown) {
    collider2.setVelocityX(speed2);
    collider2.setVelocityY(0);
    player2.x = collider2.x;
    player2.y = collider2.y - 7;

    player2.anims.play("keyD", true);
    playerLookingAt2 = 2;
  } else if (keys.W.isDown) {
    collider2.setVelocityY(-speed2);
    collider2.setVelocityX(0);
    player2.x = collider2.x;
    player2.y = collider2.y - 7;

    player2.anims.play("keyW", true);
    playerLookingAt2 = 3;
  } else if (keys.S.isDown) {
    collider2.setVelocityY(speed2);
    collider2.setVelocityX(0);
    player2.x = collider2.x;
    player2.y = collider2.y - 7;

    player2.anims.play("keyS", true);
    playerLookingAt2 = 4;
  } else {
    collider2.setVelocityX(0);
    collider2.setVelocityY(0);
    player2.x = collider2.x;
    player2.y = collider2.y - 7;

    switch (playerLookingAt2) {
      case 1:
        player2.anims.play("keyA", true);
        player2.anims.stop("keyA", true);
        break;
      case 2:
        player2.anims.play("keyD", true);
        player2.anims.stop("keyD", true);
        break;
      case 3:
        player2.anims.play("keyW", true);
        player2.anims.stop("keyW", true);
        break;
      case 4:
        player2.anims.play("keyS", true);
        player2.anims.stop("keyS", true);
        break;
    }
  }
  name2.x = player2.x - 30;
  name2.y = player2.y - 40;
}

function movimiento1() {
  if (cursors.left.isDown) {
    collider1.setVelocityX(-speed1);
    collider1.setVelocityY(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;
    console.log(name1.x);
    console.log(name2.y);

    player1.anims.play("left", true);
    playerLookingAt = 1;
  } else if (cursors.right.isDown) {
    collider1.setVelocityX(speed1);
    collider1.setVelocityY(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("right", true);
    playerLookingAt = 2;
  } else if (cursors.up.isDown) {
    collider1.setVelocityY(-speed1);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("up", true);
    playerLookingAt = 3;
  } else if (cursors.down.isDown) {
    collider1.setVelocityY(speed1);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("down", true);
    playerLookingAt = 4;
  } else {
    collider1.setVelocityY(0);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;
    switch (playerLookingAt) {
      case 1:
        player1.anims.play("left", true);
        player1.anims.stop("left", true);
        break;
      case 2:
        player1.anims.play("right", true);
        player1.anims.stop("right", true);
        break;
      case 3:
        player1.anims.play("up", true);
        player1.anims.stop("up", true);
        break;
      case 4:
        player1.anims.play("down", true);
        player1.anims.stop("down", true);
        break;
    }
  }
  name1.x = player1.x - 30;
  name1.y = player1.y - 40;
}
});



function rompeBala(ball, muro) {
  ball.disableBody(true, true);
}

function quitarVida2(player, item) {
  item.disableBody(true, true);
  hp2 -= dmg1;
  NumeroVida2.setText("P2 Hp: " + hp2);
}

function quitarVida1(player, item) {
  item.disableBody(true, true);
  hp1 -= dmg2;
  NumeroVida.setText("P1 Hp: " + hp1);
}

function collectHp1(player, item) {
  item.disableBody(true, true);
  hp1 += 100;
  NumeroVida.setText("P1 Hp: " + hp1);
  game.box.play();
}
function collectHp2(player, item) {
  item.disableBody(true, true);
  hp2 += 100;
  NumeroVida2.setText("P2 Hp: " + hp2);
  game.box.play();
}

function collectSpeed1(player, item) {
  item.disableBody(true, true);
  speed1 += 25;
  game.box.play();
}
function collectSpeed2(player, item) {
  item.disableBody(true, true);
  speed2 += 25;
  game.box.play();
}

function collectDmg1(player, item) {
  item.disableBody(true, true);
  dmg1 += 20;
  game.box.play();
}
function collectDmg2(player, item) {
  item.disableBody(true, true);
  dmg2 += 20;
  game.box.play();
}

function collectEvery1(player, item) {
  item.disableBody(true, true);
  dmg1 += 20;
  speed1 += 25;
  hp1 += 100;
  NumeroVida.setText("P1 Hp: " + hp1);
  game.box.play();
}
function collectEvery2(player, item) {
  item.disableBody(true, true);
  dmg2 += 20;
  speed2 += 25;
  hp2 += 100;
  NumeroVida2.setText("P2 Hp: " + hp2);
  game.box.play();
}

function collectRandom1(player, item) {
  item.disableBody(true, true);
  let rand = random(1, 3);
  if (rand === 1) {
    speed1 += 25;
  } else if (rand === 2) {
    hp1 += 100;
    NumeroVida.setText("P1 Hp: " + hp1);
  } else {
    dmg1 += 20;
  }
  game.box.play();
}

function collectRandom2(player, item) {
  item.disableBody(true, true);
  let rand = random(1, 3);
  if (rand === 1) {
    speed2 += 25;
  } else if (rand === 2) {
    hp2 += 100;
    NumeroVida2.setText("P2 Hp: " + hp2);
  } else {
    dmg2 += 20;
  }
  game.box.play();
}
function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function activeUsers() {
  $(document).ready(function () {
    //console.log('Mostrar users')
    $.ajax({
      url: "http://localhost:8080/clients",
      method: "GET",
      dataType: "json",
    }).done(function (data) {
      //console.log("hay los siguientes usuarios: " + data.length);
      NumeroUsers.setText("Hay activos: " + data.length);
    });
  });
}

function updateNames() {
  $(document).ready(function () {
    //console.log('Mostrar users')
    $.ajax({
      url: "http://localhost:8080/users",
      method: "GET",
      dataType: "json",
    }).done(function (data) {
      if (data.length) {
        name1.setText(data[0].name);
        console.log(data[0].name);
        if (data.length >= 2) {
          name2.setText(data[1].name);
          console.log(data[1].name);
        }
      }
    });
  });
}

function ping() {
  $(document).ready(function () {
    $.ajax({
      url: "http://localhost:8080/clients",
      method: "GET",
      dataType: "json",
    })
      .done(function (data) {
        ServerStatus.setText("Servidor: Activo");
      })
      .fail(function (data) {
        ServerStatus.setText("Servidor: Desconectado");
        game.deleteClient();
      });
  });
}

