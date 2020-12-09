import { boton } from "../components/boton.js";

export class Final extends Phaser.Scene {
  constructor() {
    super({ key: 'Final' });
    this.botonPlay = new boton(this, 'game');
  }

  preload() {
   
    this.load.image('background', 'assets/images/fondo.jpg');
    this.botonPlay.preload();
  }
  
  create() {
    this.add.image(410, 280, 'background');
    this.botonPlay.create();
    
}
}