import { boton } from "../components/boton.js";

export class Final extends Phaser.Scene {
  constructor() {
    super({ key: 'Final' });
    this.botonAgain = new boton(this, 'menu', 'button', 400, 400);
  }

  preload() {
   
    this.load.image('background', 'assets/images/fondo.jpg');
    this.botonAgain.preload();
    this.load.audio('intro','assets/sounds/Music.mp3' )
  }
  
  create() {
    this.add.image(410, 280, 'background');
    this.botonAgain.create();
    
}
}