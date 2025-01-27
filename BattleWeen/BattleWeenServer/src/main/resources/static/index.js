

$(document).ready(function(){

   var config = {
    type: Phaser.AUTO,
    width: 864,
    height: 624,
    scene: 
      [Menu, Game, Tutorial, Final]
      ,
    scale: {
      parent: 'CanvasDiv',
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: 864,
      height: 624,
    },
    dom: {
      createContainer: true
    },
    physics: {
      default: 'arcade',
      arcade: {
        
        debug: false
      }
    }, fps: {
      target: 30,
      forceSetTimeOut: true
  }
      
  
    
  }
   
  var game = new Phaser.Game(config); 
});