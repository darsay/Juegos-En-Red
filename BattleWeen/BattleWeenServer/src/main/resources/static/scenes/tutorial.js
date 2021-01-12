import { boton } from "../components/boton.js";

export class Tutorial extends Phaser.Scene {
  constructor() {
    super({ key: 'tuto' });
    this.botonAtras = new boton(this, 'menu', 'back', 65, 45);
  }

  preload() {
    this.load.image('tutorial', 'assets/images/PantallaTuto.png');
    this.load.image('background', 'assets/images/background.jpg');
    this.botonAtras.preload();
    this.back = this.load.image('back', 'assets/images/atras.png');
  }
  
  create() {
    
   
    this.background = this.add.image(410, 280, 'background');
    this.background.setScale(2);
    this.tuto = this.add.image(432, 312, 'tutorial');
    this.botonAtras.create();

    

  }


}