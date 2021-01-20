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
var clientList;

var clientidx;
var id;
var refreshTime = 200;
var prevTime = 0;



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
    
    this.getId();
    this.background = this.add.image(410, 280, 'background');
    this.background.setScale(2);
    this.botonPlay.create();
    this.botonTutorial.create();
    this.logo = this.add.image(400, 130, 'logo');
    this.logo.setScale(0.5);
    NumeroUsers= this.add.text(5,600, "Hay activos: " + 0, { fontSize: '20px', fill: 'white', fontStyle:'bold' });
    ServerStatus= this.add.text(550,600, "Servidor: Conectando...", { fontSize: '20px', fill: 'white', fontStyle:'bold' });
    clientList= this.add.text(550,300, "Clientes conectados: \n", { fontSize: '20px', fill: 'white', fontStyle:'bold' });

      
  }

  update(){
    
    if(Date.now()-prevTime > refreshTime){
      this.activeUsers();
      this.ping();
      this.ping2();
      this.clientesConectados();
      prevTime = Date.now();
    }
    
    


  }

  clientesConectados(){
    $(document).ready(function(){
      //console.log('Mostrar users')
      $.ajax({
      url: 'http://localhost:8080/clients',
      method: 'GET',
      dataType: 'json'
      }).done(function(data) {
        if(data.length){
          var cadena = "Clientes conectados: \n"
          for(var i = 0; i<data.length; i++){
            cadena += "Cliente " + data[i].id + "\n";
          }
          clientList.setText(cadena);
        }
      });
      }); 
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
        NumeroUsers.setText("Hay activos: " + data.length + " clientes.");
      });
      }); 
  }

  getId(){
    $(document).ready(function(){
      //console.log('Mostrar users')
      $.ajax({
      url: 'http://localhost:8080/clients',
      method: 'GET',
      dataType: 'json'
      }).done(function(data) {
        //console.log("hay los siguientes usuarios: " + data.length);
        if(data.length){
          clientidx = data.length-1;
          id = data[clientidx].id;
        }
        console.log("Tu id es " + id);
        console.log("Tu idx es " + clientidx);
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

        if(data.length){  
          updateClientTime();
          //console.log(data[clientidx].time)
        }       
      });
      }); 
  }
  
}

//ESTO SERÍA LA FUNCION QUE COMPRUEBA EL TIEMPO QUE LLEVA SIN RESPONDER EL CLIENTE MAS O MENOS EN PSEUDOCODIGO
function comprobarClient(){
  $(document).ready(function(){
    
    $.ajax({
    url: 'http://localhost:8080/clients',
    method: 'GET',
    dataType: 'json'
    }).done(function(data) {
      //console.log(Date.now());
      //console.log(data[1].time);
      //console.log(Date.now() -data[1].time);
      if(data.length){
        for(var i = 0; i<=data.length-1; i++){
          
          if((Date.now() - data[i].time) > 5000 && data[i].time !=0){
            deleteClient(data[i].id);
            //console.log("Se va a borrar");
          }
        }
      }
    });
    }); 

}

//A ESTO SE LLAMA EN CUANTO EL CLIENTE LLEVE UN TIEMPO SIN MANDAR PETIS
function deleteClient(idborrar){
  $.ajax({
    url: ('http://localhost:8080/clients/' + idborrar),
    method: 'DELETE',
    dataType: 'json'
    }).done(function(data) {
      console.log('Cliente '+ idborrar +' borrado')

    }); 
}

function updateClientTime(){
  $(document).ready(function() {
    let data = {"time": Date.now()}
  $.ajax({
      type: 'PUT',
      url: ('http://localhost:8080/clients/' + id),
      contentType: 'application/json',
      data: JSON.stringify(data), // access in body
  }).done(function () {
    comprobarClient();
  });
  });
}