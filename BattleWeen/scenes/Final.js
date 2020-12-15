import { boton } from "../components/boton.js";

export class Final extends Phaser.Scene {
  constructor() {
    super({ key: 'Final' });
    this.botonAgain = new boton(this, 'menu', 'BotonBack', 400, 550);
  }

  preload() {
   
    this.load.image('background', 'assets/images/fondo.jpg');
    this.load.image('BotonBack', 'assets/images/botonMenu.png');
    this.load.image('Bruja', 'assets/images/Bruja.png');
    this.load.image('Zombie', 'assets/images/Zombie.png');
    this.botonAgain.preload();
    this.load.audio('intro','assets/sounds/Music.mp3' )
  }
  
  create(data) {
    this.sound.stopAll();
    this.Punt= data.vic1;
    this.Punt2= data.vic2
    
    this.background= this.add.image(410, 280, 'background');
    this.background.setScale(2);
    if(this.Punt>this.Punt2){
      this.Bruja= this.add.image(410, 300, 'Bruja');
      this.Bruja.setScale(0.7);
      this.add.text(200,80, 'HA GANADO EL PLAYER 1',{ fontSize: '35px', fill: '#000', backgroundColor: 'white', })

    }
    else{
      this.Zombie= this.add.image(410, 300, 'Zombie');
      this.Zombie.setScale(0.7);
      this.add.text(200,80, 'HA GANADO EL PLAYER 2',{ fontSize: '35px', fill: '#000', backgroundColor: 'white', })
    }
    this.NumeroVida= this.add.text(50,5,'Victorias P1: ' + this.Punt, { fontSize: '32px', fill: '#000', backgroundColor: 'pink', });
    this.NumeroVida2= this.add.text(500,5,'Victorias P2: ' + this.Punt2, { fontSize: '32px', fill: '#000', backgroundColor: 'powderblue', }); 

    
    this.botonAgain.create();
    
}
}