import { boton } from "../components/boton.js";

export class Menu extends Phaser.Scene {
  constructor() {
    super({ key: 'menu' });
    this.botonPlay = new boton(this, 'game', 'button', 400, 400);
    this.botonTutorial = new boton(this, 'tuto', 'tutorialBoton', 400, 500);
  }

  preload() {
    this.load.image('logo', 'assets/images/logo.png');
    this.load.image('background', 'assets/images/background.jpg');
    this.botonPlay.preload();
    this.botonTutorial.preload();
    this.load.audio('intro','assets/sounds/Music.mp3' )
    this.load.image('button', 'assets/images/play.png');
    this.load.image('tutorialBoton', 'assets/images/tutorial_boton.png');
  }
  
  
  create() {
    this.musica= this.sound.add('intro');
    this.background = this.add.image(410, 280, 'background');
    this.background.setScale(2);
    this.botonPlay.create();
    this.botonTutorial.create();
    this.logo = this.add.image(400, 130, 'logo');
    this.logo.setScale(0.5);
    
  }

  update(){
    if(!this.sound.get('intro').isPlaying){
      this.musica.play();
      
      
    }
    
  }
}