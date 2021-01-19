import { boton } from "../components/boton.js";

var refreshTime = 200;
var prevTime = 0;

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
    
    $(document).ready(function(){
      $.ajax({
      url: 'http://localhost:8080/users/3',
      method: 'DELETE',
      dataType: 'json'
      }).done(function(data) {
      });
      });  
   
    this.background = this.add.image(410, 280, 'background');
    this.background.setScale(2);
    this.tuto = this.add.image(432, 312, 'tutorial');
    this.botonAtras.create();

    var NumeroUsers= this.add.text(5,600, "Hay activos: " + 0, { fontSize: '20px', fill: 'white', fontStyle:'bold' });
    var ServerStatus= this.add.text(550,600, "Servidor: Conectando...", { fontSize: '20px', fill: 'white', fontStyle:'bold' });

  }

  update(){
    if(Date.now()-prevTime > refreshTime){
      this.activeUsers();
      this.ping();
      this.ping2();
      prevTime = Date.now();
    }
  }


}