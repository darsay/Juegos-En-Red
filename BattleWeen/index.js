
import { Game } from './scenes/game.js';
import { Menu } from './scenes/menu.js';
import { Final } from './scenes/Final.js';
import { Final2 } from './scenes/Final2.js';
import { Tutorial } from './scenes/tutorial.js';


const config = {
  type: Phaser.AUTO,
  width: 864,
  height: 624,
  scene: [Menu, Game, Final, Final2, Tutorial],
  physics: {
    default: 'arcade',
    arcade: {
      
      debug: false
    }
  }
  
}

var game = new Phaser.Game(config);