import { boton } from "../components/boton.js";

export class nivel1 extends Phaser.Scene {
  constructor() {
    super({ key: 'nivel1' });
    this.boton = new boton(this);
  }

  preload() {
    this.load.image('nivel1', 'assets/star.png');
    this.load.image('background', 'assets/sky.png');
  }
  
  create() {
 this.add.image(410, 250, 'background');
  this.congratsImage = this.add.image(400, 90, 'nivel1');
  }
}

