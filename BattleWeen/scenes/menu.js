import { boton } from "../components/boton.js";

export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    this.boton = new boton(this);
  }

  preload() {
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('background', 'assets/images/fondo.jpg');
    this.boton.preload();
  }
  
  create() {
    this.add.image(410, 280, 'background');
    this.boton.create();
    this.logo = this.add.image(400, 130, 'logo');
    this.logo.setScale(0.5);
}
}