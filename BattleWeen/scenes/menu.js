import { boton } from "../components/boton.js";

export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    this.botonPlay = new boton(this, 'game');
  }

  preload() {
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('background', 'assets/images/fondo.jpg');
    this.botonPlay.preload();
    this.load.audio('intro','assets/sounds/DespacitoMal.mp3' )
  }
  
  create() {
    this.musica= this.sound.add('intro');
    this.add.image(410, 280, 'background');
    this.botonPlay.create();
    this.logo = this.add.image(400, 130, 'logo');
    this.logo.setScale(0.5);
    this.musica.play();
    
}
}