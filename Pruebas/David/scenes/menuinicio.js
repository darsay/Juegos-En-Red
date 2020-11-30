import { boton } from "../components/boton.js";

export class menuinicio extends Phaser.Scene {
  constructor() {
    super({ key: 'menuinicio' });
    this.boton = new boton(this);
  }

  preload() {
    this.load.image('menuinicio', 'assets/bomb.png');
    this.load.image('background', 'assets/sky.png');
    this.boton.preload();
  }
  
  create() {
    this.add.image(400, 250, 'background');
    this.boton.create();
    this.menuinicio = this.add.image(400, 90, 'menuinicio');
  }
}
