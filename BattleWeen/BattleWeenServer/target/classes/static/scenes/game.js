var player1;
var name1;
var name2;
var player2;
var collider1;
var collider2;
var playerLookingAt = 0;
var playerLookingAt2 = 0;
var speed1, speed2;
var hp1, hp2;
var dmg1, dmg2;
var cursors;
var keys;

var balls;
var balls2;
var balls3;
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
var parsedData;
var isSocketOpen;
var isGameStarted;
var isShootingC = 0;

var host;


var currentPlayerAnimation = "left";

var newX = 0;
var newY = 0;
var anim = "left";

var bola2;
var balita;

var HpUp;
var muros;
let escena = 0;

  class Game extends Phaser.Scene {
  constructor() {
    super({ key: "game" });
  }

  init(data) {
    this.id = data.id;
  }

  preload() {
    this.load.spritesheet("collider", "assets/images/empty.png", {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.image("witchBullet", "assets/images/witchBullet.png");
    this.load.image("zombieBullet", "assets/images/zombieBullet.png");
    this.load.spritesheet("scenery", "assets/images/scenery.png", {
      frameWidth: 17,
      frameHeight: 17,
    });
    this.load.spritesheet("player1", "assets/images/players.png", {
      frameWidth: 46.5,
      frameHeight: 48,
    });
    this.load.spritesheet("brujaSp", "assets/images/brujaSprite.png", {
      frameWidth: 46.5,
      frameHeight: 48,
    });
    this.load.spritesheet("zombieSp", "assets/images/zombieSprite.png", {
      frameWidth: 46.5,
      frameHeight: 48,
    });
    this.load.spritesheet("collectables", "assets/images/collectables.png", {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.image("ground", "assets/images/ground.png");
    this.load.image("dmgBox", "assets/images/damagePU.png");
    this.load.image("lifeBox", "assets/images/lifePU.png");
    this.load.image("speedBox", "assets/images/speedPU.png");
    this.load.image("randomBox", "assets/images/randomPU.png");
    this.load.image("chest", "assets/images/chestPU.png");
    this.load.image("fondito", "assets/images/pointsBg.png");

    this.load.tilemapTiledJSON("map", "assets/tileMaps/level1.json");

    this.load.tilemapTiledJSON("map2", "assets/tileMaps/level2.json");

    this.load.tilemapTiledJSON("map3", "assets/tileMaps/level3.json");

    this.load.tilemapTiledJSON("map4", "assets/tileMaps/level4.json");

    this.load.tilemapTiledJSON("map5", "assets/tileMaps/level5.json");

    this.load.audio("disparo", "assets/sounds/disparo.wav");
    this.load.audio("disparo2", "assets/sounds/ZombieShot.mp3");
    this.load.audio("box", "assets/sounds/box.wav");
    this.load.audio("GameMusic", "assets/sounds/Music.mp3");
  } ////////////////////// FIN PRELOAD///////////////////////////////

  create(data) {
    escena = this;
    

    Level = data.id;
    V1 = data.vic1;
    V2 = data.vic2;

    //Para la musica del menu de inicio
    this.sound.stopAll();

    this.musica = this.sound.add("GameMusic");
    this.musica.setVolume(0.03);
    this.musica.play();
    //Crea el tilemap
    var map;
    switch (Level) {
      case 0:
        map = this.make.tilemap({ key: "map" });
        break;
      case 1:
        map = this.make.tilemap({ key: "map2" });
        break;
      case 2:
        map = this.make.tilemap({ key: "map3" });
        break;
      case 3:
        map = this.make.tilemap({ key: "map4" });
        break;
      case 4:
        map = this.make.tilemap({ key: "map5" });
        break;
    }

    //Añade el tileSet de la capa de Mazmorra que coge los elementos de escenario
    const tileset = map.addTilesetImage("Mazmorra", "scenery");
    //Crea el suelo y los muros en variables distintas para solo
    //Chocar con los muros
    const suelo = map.createStaticLayer("Suelo", tileset, 0, 0);
    muros = map.createStaticLayer("Muros", tileset, 0, 0);
    //Colisiona todo lo que tenga un indice distinto de -1 (todos los muros)
    muros.setCollisionByExclusion(-1, true);

    //Aqui empiezan a crearse los objetos coleccionables que aumentan las estadisticas de los personajes

    //Añadimos HpUp, que viene dado del mapa a un grupo de fisicas sin gravedad e inamovible
    HpUp = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    //Aqui creamos cada caja individualmente con el sprite llamado desde lifeBox
    const hpBoxes = map.getObjectLayer("HpUp")["objects"];
    hpBoxes.forEach((hpBox) => {
      const hpup1 = HpUp.create(
        hpBox.x,
        hpBox.y - hpBox.height,
        "lifeBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con velocidad
    this.SpeedUp = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const speedBoxes = map.getObjectLayer("SpeedUp")["objects"];
    speedBoxes.forEach((speedBox) => {
      const speedup1 = this.SpeedUp.create(
        speedBox.x,
        speedBox.y - speedBox.height,
        "speedBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con daño
    this.DmgUp = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const dmgBoxes = map.getObjectLayer("DmgUp")["objects"];
    dmgBoxes.forEach((dmgBox) => {
      const dmgup1 = this.DmgUp.create(
        dmgBox.x,
        dmgBox.y - dmgBox.height,
        "dmgBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con las cajas Random
    this.RandomUp = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const randomBoxes = map.getObjectLayer("RandomUp")["objects"];
    randomBoxes.forEach((randomBox) => {
      const randomup1 = this.RandomUp.create(
        randomBox.x,
        randomBox.y - randomBox.height,
        "randomBox"
      ).setOrigin(0, 0);
    });

    //Lo mismo con la caja que aumenta todas las estadisticas
    this.EveryUp = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    const everyBoxes = map.getObjectLayer("EveryUp")["objects"];
    everyBoxes.forEach((everyBox) => {
      const everyup1 = this.EveryUp.create(
        everyBox.x,
        everyBox.y - everyBox.height,
        "chest"
      ).setOrigin(0, 0);
    });

    //Aqui se crea el player y se inicializan sus sprites y propiedades
    
    //collider2 = this.physics.add.sprite(785, 554, "collider");

    
    if (host == 1) {
      player1 = this.physics.add.sprite(70, 70, "brujaSp");
      collider1 = this.physics.add.sprite(70, 70, "collider");
      collider2 = this.physics.add.sprite(70, 70, "collider");
      player2 = this.add.sprite(785, 554, "zombieSp");
    } else {
      player1 = this.physics.add.sprite(785, 554, "zombieSp");
      collider1 = this.physics.add.sprite(785, 554, "collider");
      collider2 = this.physics.add.sprite(70, 70, "collider");
      player2 = this.add.sprite(70, 70, "brujaSp");
    }
    player1.setScale(1);
    player2.setScale(1);
    //// FISICAS ////
      //Fisica para colisionar con las platforms
      //this.physics.add.collider(collider2, muros);
    this.physics.add.collider(collider1, muros);

     //Añade colisiones de player1 con player2
      //this.physics.add.collider(player1, player2);

    //Cajas
    //Añade los metodos para que cuando player1 o player 2 cojan vida, les aumente la vida
    this.physics.add.overlap(collider1, HpUp, collectHp1, null, this);
    this.physics.add.overlap(collider2, HpUp, collectHp2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan velocidad, les aumente la velocidad
    this.physics.add.overlap(
      collider1,
      this.SpeedUp,
      collectSpeed1,
      null,
      this
    );
    this.physics.add.overlap(collider2, this.SpeedUp, collectSpeed2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan daño, les aumente el daño
    this.physics.add.overlap(collider1, this.DmgUp, collectDmg1, null, this);
    this.physics.add.overlap(collider2, this.DmgUp, collectDmg2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan una caja random, les aumente una propiedad aleatoria
    this.physics.add.overlap(
      collider1,
      this.RandomUp,
      collectRandom1,
      null,
      this
    );
    this.physics.add.overlap(
      collider2,
      this.RandomUp,
      collectRandom2,
      null,
      this
    );

    //Añade los metodos para que cuando player1 o player 2 cojan el cofre, les aumente un nivel cada propiedad
    this.physics.add.overlap(
      collider1,
      this.EveryUp,
      collectEvery1,
      null,
      this
    );
    this.physics.add.overlap(collider2, this.EveryUp, collectEvery2, null, this);

    //BALAS
    //Añade las colisiones y los metodos para quitar vida de los dos jugadores
    this.physics.add.overlap(collider2, balls, quitarVida2, null, this);
    this.physics.add.collider(collider2, balls);

    this.physics.add.overlap(collider1, balls2, quitarVida1, null, this);
      this.physics.add.collider(collider1, balls2);
     
      
    

    //player1 = this.physics.add.sprite(70, 70, "brujaSp");
    //player2 = this.physics.add.sprite(785, 554, "zombieSp");
    speed1 = 160;
    speed2 = speed1;
    hp1 = 400;
    hp2 = 400;
    dmg1 = 20;
    dmg2 = dmg1;
    /////////////////// Se muestran las vidas de ambos/////////////////////////////
    this.add.image(150, 5, "fondito").setScale(1.5, 1);
    this.add.image(720, 5, "fondito").setScale(1.5, 1);

    NumeroVida = this.add.text(50, 5, "P1 Hp: " + hp1, {
      fontSize: "32px",
      fill: "white",
      fontStyle: "bold",
    });
    NumeroVida2 = this.add.text(595, 5, "P2 Hp: " + hp2, {
      fontSize: "32px",
      fill: "white",
      fontStyle: "bold",
    });
    name1 = this.add.text(0, 0, "Jugador 1", {
      fontSize: "15px",
      fill: "white",
      fontStyle: "bold",
    });
    name2 = this.add.text(0, 0, "Jugador 2", {
      fontSize: "15px",
      fill: "white",
      fontStyle: "bold",
    });
    /////////////////////////////////////////////////////////////////

    //Se crean las animaciones de los dos personajes
    this.anims.create({
      key: "down",
      frames: this.anims.generateFrameNumbers("brujaSp", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("brujaSp", { start: 4, end: 7 }),
      frameRate: 10, //FPS para la animacion
      repeat: -1, //Bucle
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("brujaSp", { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers("brujaSp", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn",
      frames: [{ key: "brujaSp", frame: 0 }],
      frameRate: 20,
    });

    this.anims.create({
      key: "keyS",
      frames: this.anims.generateFrameNumbers("zombieSp", { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "keyA",
      frames: this.anims.generateFrameNumbers("zombieSp", {
        start: 8,
        end: 11,
      }),
      frameRate: 10, //FPS para la animacion
      repeat: -1, //Bucle
    });
    this.anims.create({
      key: "keyD",
      frames: this.anims.generateFrameNumbers("zombieSp", { start: 4, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "keyW",
      frames: this.anims.generateFrameNumbers("zombieSp", {
        start: 12,
        end: 15,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "turn2",
      frames: [{ key: "zombieSp", frame: 0 }],
      frameRate: 20,
    });

    //Se crean las fisicas de las balas

    balls = this.physics.add.group();
    balls2 = this.physics.add.group();

    //Entrada por teclado
    cursors = this.input.keyboard.createCursorKeys(); //Para las flechas
    keys = this.input.keyboard.addKeys("W,S,A,D,M,T"); //Para el resto del teclado (Le puedes meter el resto de letras)
    
    this.physics.add.collider(collider1, muros);

     //Añade colisiones de player1 con player2
      //this.physics.add.collider(player1, player2);

    //Cajas
    //Añade los metodos para que cuando player1 o player 2 cojan vida, les aumente la vida
    this.physics.add.overlap(collider1, HpUp, collectHp1, null, this);
    this.physics.add.overlap(collider2, HpUp, collectHp2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan velocidad, les aumente la velocidad
    this.physics.add.overlap(
      collider1,
      this.SpeedUp,
      collectSpeed1,
      null,
      this
    );
    this.physics.add.overlap(collider2, this.SpeedUp, collectSpeed2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan daño, les aumente el daño
    this.physics.add.overlap(collider1, this.DmgUp, collectDmg1, null, this);
    this.physics.add.overlap(collider2, this.DmgUp, collectDmg2, null, this);

    //Añade los metodos para que cuando player1 o player 2 cojan una caja random, les aumente una propiedad aleatoria
    this.physics.add.overlap(
      collider1,
      this.RandomUp,
      collectRandom1,
      null,
      this
    );
    this.physics.add.overlap(
      collider2,
      this.RandomUp,
      collectRandom2,
      null,
      this
    );

    //Añade los metodos para que cuando player1 o player 2 cojan el cofre, les aumente un nivel cada propiedad
    this.physics.add.overlap(
      collider1,
      this.EveryUp,
      collectEvery1,
      null,
      this
    );
    this.physics.add.overlap(collider2, this.EveryUp, collectEvery2, null, this);

    //BALAS
    //Añade las colisiones y los metodos para quitar vida de los dos jugadores
    this.physics.add.overlap(collider2, balls, quitarVida2, null, this);
    this.physics.add.collider(collider2, balls);

    this.physics.add.overlap(collider1, balls2, quitarVida1, null, this);
      this.physics.add.collider(collider1, balls2);
     
    //Añade las colisiones de las balas con los muros
    this.physics.add.collider(muros, balls, rompeBala);
    this.physics.add.collider(muros, balls2, rompeBala);

    this.disparo = this.sound.add("disparo");
    this.disparo.setVolume(0.05);

    this.disparo2 = this.sound.add("disparo2");
    this.disparo2.setVolume(0.05);

    this.box = this.sound.add("box");
    this.box.setVolume(0.05);

    CanSume = false;
    CanSume2 = false;

    ConectarWebSocket();
  } ////////////////////////// FIN CREATE ///////////////////////////////////

  update() {

   

    if (isSocketOpen) {
      /*  if (Date.now() - 300 > currentTime) {
      activeUsers();
      ping();
      updateNames();
      currentTime = Date.now();
    } */

      if (keys.M.isDown) {
        this.disparar();
      }
      /* 
    if(isShootingC==true){

      console.log("PIUM");

      this.disparar2();
      isShootingC=false;
      
      
     
      
    } */

      if (host == 1) {
        movimientoHost();
      } else {
        movimientoClient();
      }

      //hp2 = parsedData.hp;
      // GAME OVER
      if (hp1 <= 0 || hp2 <= 0) {
        this.sound.get("GameMusic").stop();

        this.cameras.main.shake(500);

        this.time.delayedCall(
          250,
          function () {
            this.cameras.main.fade(250);
          },
          [],
          this
        );

        if (hp1 > hp2 && CanSume == false) {
          V1++;
          CanSume = true;
        } else if (hp2 > hp1 && CanSume2 == false) {
          V2++;
          CanSume2 = true;
        }

        if (Level <= -1) {
          Level++;

          switch (Level) {
            case 1:
              this.time.delayedCall(
                500,
                function () {
                  this.registry.destroy(); // destroy registry
                  this.events.off(); // disable all active events
                  this.scene.start("game", { id: 1, vic1: V1, vic2: V2 });
                },
                [],
                this
              );
              break;
            case 2:
              this.time.delayedCall(
                500,
                function () {
                  this.registry.destroy(); // destroy registry
                  this.events.off(); // disable all active events
                  this.scene.start("game", { id: 2, vic1: V1, vic2: V2 });
                },
                [],
                this
              );
              break;
            case 3:
              this.time.delayedCall(
                500,
                function () {
                  this.registry.destroy(); // destroy registry
                  this.events.off(); // disable all active events
                  this.scene.start("game", { id: 3, vic1: V1, vic2: V2 });
                },
                [],
                this
              );
              break;
            case 4:
              this.time.delayedCall(
                500,
                function () {
                  this.registry.destroy(); // destroy registry
                  this.events.off(); // disable all active events
                  this.scene.start("game", { id: 4, vic1: V1, vic2: V2 });
                },
                [],
                this
              );
              break;
          }
        } else {
          if (V1 > V2) {
            this.time.delayedCall(
              500,
              function () {
                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.start("Final", { vic1: V1, vic2: V2 });
              },
              [],
              this
            );
          } else {
            this.time.delayedCall(
              500,
              function () {
                this.registry.destroy(); // destroy registry
                this.events.off(); // disable all active events
                this.scene.start("Final", { vic1: V1, vic2: V2 });
              },
              [],
              this
            );
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
  }
  //FIN UPDATE

  updateHost() {}

  updateClient() {}

  gameOver() {}

  disparar() {
    if (this.time.now > shootTime1) {
      connection.send(
        JSON.stringify({
          x: player1.x,
          y: player1.y,
          animation: currentPlayerAnimation,
          pLook: playerLookingAt,
          isShooting: 1,
          hp: hp1,
          dg : dmg1
        })
      );
      this.disparo.play();
      if(host==1){
        this.ball = balls.create(player1.x, player1.y, "witchBullet");
      }else{
        this.ball = balls.create(player1.x, player1.y, "zombieBullet");
      }
      //this.ball = balls.create(player1.x, player1.y, "witchBullet");
      this.ball.setCollideWorldBounds(true);
      this.ball.setScale(0.05);
      switch (playerLookingAt) {
        case 1:
          this.ball.setVelocityX(-300);
          break;
        case 2:
          this.ball.setVelocityX(300);
          break;
        case 3:
          this.ball.setVelocityY(-300);
          break;
        case 4:
          this.ball.setVelocityY(300);
          break;
      }
      
      if(this.ball.x == player2.x && this.ball.y ==player2.y){
        console.log('rompete');
        this.ball.disableBody(true,true);
      }

      shootTime1 = this.time.now + 600;
      //Send
    }

    connection.send(
      JSON.stringify({
        x: player1.x,
        y: player1.y,
        animation: currentPlayerAnimation,
        pLook: playerLookingAt,
        isShooting: 2,
        hp: hp1,
        dg : dmg1
      })
    );
  }

  dispararr2() {
    //console.log(player2.x, player2.y);
    if(host==1){
      var bolaN = this.physics.add.sprite(parseFloat(player2.x), parseFloat(player2.y), "zombieBullet");
    }else{
      var bolaN = this.physics.add.sprite(parseFloat(player2.x), parseFloat(player2.y), "witchBullet");
    }
    
    //console.log(bolaN);
    balls2.add(bolaN);
    bolaN.setCollideWorldBounds(true);
    bolaN.setScale(0.05);
    switch (parseInt(playerLookingAt2)) {
      case 1:
        bolaN.setVelocityX(-300);
        break;
      case 2:
        bolaN.setVelocityX(300);
        break;
      case 3:
        bolaN.setVelocityY(-300);
        break;
      case 4:
        bolaN.setVelocityY(300);
        break;
        default:
          //console.log(playerLookingAt2);
          break;
    }


  }
}

function ConectarWebSocket() {
  connection = new WebSocket("ws://127.0.0.1:8080/prueba");
  connection.onerror = function (e) {
    console.log("WS error: " + e);
  };
  connection.onclose = function () {
    console.log("Closing socket");
  };

  isSocketOpen = false;
  isGameStarted = false;
  connection.onopen = function () {
    //console.log('Hola')
    isSocketOpen = true;
  };

  connection.onmessage = function (data) {
    //console.log('Mensaje recibido: '+data.data);

    parsedData = JSON.parse(data.data);
    if (parsedData.ishost == 1) {
      host = 1;
    } else if (parsedData.isready == 1) {
      isGameStarted = true;
    } else if (host == 1) {
      //console.log('Soy Host');
      messageHost(parsedData);
    } else {
      host = 0;
      // console.log('No soy Host');
      messageClient(parsedData);
    }
  };
}

function messageHost(parsedData) {
  
  player2.x = parsedData.x;
  player2.y = parsedData.y;
  name2.x = player2.x - 30;
  name2.y = player2.y - 40;
  collider2.x= player2.x;
  collider2.y = player2.y;

  player2.anims.play(parsedData.animation, true);

  playerLookingAt2 = parsedData.pLook;

  isShootingC = parsedData.isShooting;

  if (isShootingC == 1) {
    escena.dispararr2();
  }
  hp2 = parsedData.hp
  dmg2 = parsedData.dg
  NumeroVida2.setText("P2 Hp: " + parsedData.hp);

}

function messageClient(parsedData) {
  
  player2.x = parsedData.x;
  player2.y = parsedData.y;
  name2.x = player2.x - 30;
  name2.y = player2.y - 40;
  collider2.x= player2.x;
  collider2.y = player2.y;

  player2.anims.play(parsedData.animation, true);

  playerLookingAt2 = parsedData.pLook;

  if (parsedData.isShooting == true) {
    escena.dispararr2();
  }
  hp2 = parsedData.hp
  dmg2 = parsedData.dg
  NumeroVida2.setText("P2 Hp: " + parsedData.hp);

}

function movimientoHost() {
  if (cursors.left.isDown) {
    collider1.setVelocityX(-speed1);
    collider1.setVelocityY(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;
    //console.log(name1.x);
    //console.log(name2.y);

    player1.anims.play("left", true);
    currentPlayerAnimation = "left";
    playerLookingAt = 1;
  } else if (cursors.right.isDown) {
    collider1.setVelocityX(speed1);
    collider1.setVelocityY(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("right", true);
    currentPlayerAnimation = "right";
    playerLookingAt = 2;
  } else if (cursors.up.isDown) {
    collider1.setVelocityY(-speed1);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("up", true);
    currentPlayerAnimation = "up";
    playerLookingAt = 3;
  } else if (cursors.down.isDown) {
    collider1.setVelocityY(speed1);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("down", true);
    currentPlayerAnimation = "down";
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

  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}
function movimientoClient() {
  if (cursors.left.isDown) {
    collider1.setVelocityX(-speed1);
    collider1.setVelocityY(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;
    //console.log(name1.x);
    //console.log(name2.y);

    player1.anims.play("keyA", true);
    currentPlayerAnimation = "keyA";
    playerLookingAt = 1;
  } else if (cursors.right.isDown) {
    collider1.setVelocityX(speed1);
    collider1.setVelocityY(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("keyD", true);
    currentPlayerAnimation = "keyD";
    playerLookingAt = 2;
  } else if (cursors.up.isDown) {
    collider1.setVelocityY(-speed1);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("keyW", true);
    currentPlayerAnimation = "keyW";
    playerLookingAt = 3;
  } else if (cursors.down.isDown) {
    collider1.setVelocityY(speed1);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;

    player1.anims.play("keyS", true);
    currentPlayerAnimation = "keyS";
    playerLookingAt = 4;
  } else {
    collider1.setVelocityY(0);
    collider1.setVelocityX(0);
    player1.x = collider1.x;
    player1.y = collider1.y - 7;
    switch (playerLookingAt) {
      case 1:
        player1.anims.play("keyA", true);
        player1.anims.stop("keyA", true);
        break;
      case 2:
        player1.anims.play("keyD", true);
        player1.anims.stop("keyD", true);
        break;
      case 3:
        player1.anims.play("keyW", true);
        player1.anims.stop("keyW", true);
        break;
      case 4:
        player1.anims.play("keyS", true);
        player1.anims.stop("keyS", true);
        break;
    }
  }
  name1.x = player1.x - 30;
  name1.y = player1.y - 40;

  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}

function rompeBala(ball, muro) {
  //console.log("rompe");
  ball.disableBody(true, true);
}

function quitarVida2(player, item) {
  item.disableBody(true, true);
}

function quitarVida1(player, item) {
  item.disableBody(true, true);
  hp1 -= dmg2;
  NumeroVida.setText("P1 Hp: " + hp1);
  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}

function collectHp1(player, item) {
  item.disableBody(true, true);
  hp1 += 100;
  NumeroVida.setText("P1 Hp: " + hp1);
  this.box.play();
  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}
function collectHp2(player, item) {
  item.disableBody(true, true);
  this.box.play();
}

function collectSpeed1(player, item) {
  item.disableBody(true, true);
  speed1 += 25;
  this.box.play();
}
function collectSpeed2(player, item) {
  item.disableBody(true, true);
  this.box.play();
}

function collectDmg1(player, item) {
  item.disableBody(true, true);
  dmg1 += 20;
  this.box.play();
  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}
function collectDmg2(player, item) {
  item.disableBody(true, true);
  this.box.play();
}

function collectEvery1(player, item) {
  item.disableBody(true, true);
  dmg1 += 20;
  speed1 += 25;
  hp1 += 100;
  NumeroVida.setText("P1 Hp: " + hp1);
  this.box.play();
  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}
function collectEvery2(player, item) {
  item.disableBody(true, true);
  this.box.play();
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

  this.box.play();
  connection.send(
    JSON.stringify({
      x: player1.x,
      y: player1.y,
      animation: currentPlayerAnimation,
      pLook: playerLookingAt,
      isShooting: 0,
      hp: hp1,
      dg : dmg1
    })
  );
}

function resetBullet() {
  balls3.kill();
}

function collectRandom2(player, item) {
  item.disableBody(true, true);
  
  this.box.play();
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
        this.deleteClient();
      });
  });
}
