import { boton } from "../components/boton.js";

export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    this.boton = new boton(this);
  }

  preload() {
    this.load.image('menu', 'images/hola.png');
    this.load.image('background', 'images/original.jpg');
    this.boton.preload();
  }
  
  create() {
    this.add.image(410, 280, 'background');
    this.boton.create();
    this.gameoverImage = this.add.image(400, 130, 'menu');
    this.gameoverImage.setScale(0.5);
}
}