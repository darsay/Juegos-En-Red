import { boton } from "../components/boton.js";

$(document).ready(function(){
  console.log('El DOM está cargado')
  });

  $(document).ready(function(){
    console.log('Mostrar users')
    $.ajax({
    url: 'http://localhost:8080/users',
    method: 'GET',
    dataType: 'json'
    }).done(function(data) {
    console.log(data);
    });
    });  

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
    this.load.audio('intro','assets/sounds/MenuMusic.mp3' )
    this.load.image('button', 'assets/images/play.png');
    this.load.image('tutorialBoton', 'assets/images/tutorial_boton.png');
  }
  
  
  create() {
    
    this.musica= this.sound.add('intro');
    this.musica.setVolume(0.1);
    this.musica.play();
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