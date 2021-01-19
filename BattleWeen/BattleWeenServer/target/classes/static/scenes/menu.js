import { boton } from "../components/boton.js";

$(document).ready(function(){
  console.log('El DOM está cargado')
  });
  
  /* $(document).ready(function() {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/users",
      data: JSON.stringify({
        name: "David",
        password: "urjc123"
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      success: function(data) {
        console.log(data);
      }
});
  });
 */

var NumeroUsers = "";
var ServerStatus = "";

var clientTime;

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
    
    this.musica= this.sound.add('intro');
    this.musica.setVolume(0.1);
    this.musica.play();
    this.background = this.add.image(410, 280, 'background');
    this.background.setScale(2);
    this.botonPlay.create();
    this.botonTutorial.create();
    this.logo = this.add.image(400, 130, 'logo');
    this.logo.setScale(0.5);
    NumeroUsers= this.add.text(5,550, "Hay activos: " + 0, { fontSize: '32px', fill: 'white', fontStyle:'bold' });
    ServerStatus= this.add.text(400,550, "Servidor: Conectando...", { fontSize: '32px', fill: 'white', fontStyle:'bold' });
  }

  update(){
    if(!this.sound.get('intro').isPlaying){
      this.musica.play();        
    }
    
    this.activeUsers();
    this.ping();

  }

  activeUsers(){
    $(document).ready(function(){
      //console.log('Mostrar users')
      $.ajax({
      url: 'http://localhost:8080/clients',
      method: 'GET',
      dataType: 'json'
      }).done(function(data) {
        //console.log("hay los siguientes usuarios: " + data.length);
        NumeroUsers.setText("Hay activos: " + data.length);
        return data.length;
      });
      }); 
  }

  connect(){
    $(document).ready(function() {
      $.ajax({
        type: "POST",
        url: "http://localhost:8080/users",
        data: 'json',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        success: function(data) {
          console.log(data);
        }
  });
    });
  }

  ping(){
    $(document).ready(function(){
      
      $.ajax({
      url: 'http://localhost:8080/clients',
      method: 'GET',
      dataType: 'json'
      }).done(function(data) {
        ServerStatus.setText("Servidor: Activo");

      }).fail(function (data){
        ServerStatus.setText("Servidor: Desconectado");
        this.deleteClient();
      });
      }); 
  }


  //CON ESTA FUNCION HACES LAS LLAMADAS DEL GET PA IR GUARDANDO EL TIEMPO
  ping2(){
    $(document).ready(function(){
      
      $.ajax({
      url: 'http://localhost:8080/clients',
      method: 'GET',
      dataType: 'json'
      }).done(function(data) {

       // clientTime= a lo que sea;
       //AQUI GUARDARIAS UN TIEMPO NUEVO CON EL THIS TIME NOW

     
      });
      }); 
  }

  //ESTO SERÍA LA FUNCION QUE COMPRUEBA EL TIEMPO QUE LLEVA SIN RESPONDER EL CLIENTE MAS O MENOS EN PSEUDOCODIGO

  comprobarClient(){

     clientTime;

    if(this.time.now-clientTime > 1000) {


    }else{ this.deleteClient(); }

  }

  //A ESTO SE LLAMA EN CUANTO EL CLIENTE LLEVE UN TIEMPO SIN MANDAR PETIS
  deleteClient(){
    $.ajax({
      url: ('http://localhost:8080/clients/' + clientId),
      method: 'DELETE',
      dataType: 'json'
      }).done(function(data) {
        console.log('Usuario '+clientId+' borrado')

      }); 
  }
}