
import { Game } from './scenes/game.js';
import { Menu } from './scenes/menu.js';
import { Final } from './scenes/Final.js';
import { Tutorial } from './scenes/tutorial.js';



const config = {
  type: Phaser.AUTO,
  width: 864,
  height: 624,
  scene: [Menu, Game, Final, Tutorial],
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
  }
    

  
}

var game = new Phaser.Game(config);

game.config.idx = 0;
game.config.id = 0;