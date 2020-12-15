import { boton } from "../components/boton.js";

export class Final2 extends Phaser.Scene {
  constructor() {
    super({ key: 'Final2' });
    this.botonAgain = new boton(this, 'menu', 'tutorialBoton', 400, 400);
  }

  preload() {
   
    this.load.image('background', 'assets/images/fondo.jpg');
    this.botonAgain.preload();
    this.load.audio('intro','assets/sounds/Music.mp3' )
  }
  
  create(data) {
    this.Punt= data.vic1;
    this.Punt2= data.vic2
    this.add.text(200,500, 'HA GANADO EL PLAYER 2',{ fontSize: '35px', fill: '#000', backgroundColor: 'white', })
    this.NumeroVida= this.add.text(50,5,'Victorias P1: ' + this.Punt, { fontSize: '32px', fill: '#000', backgroundColor: 'pink', });
    this.NumeroVida2= this.add.text(500,5,'Victorias P2: ' + this.Punt2, { fontSize: '32px', fill: '#000', backgroundColor: 'powderblue', }); 
    this.add.image(410, 280, 'background');
    this.botonAgain.create();
    
}
}