
import { Game } from './scenes/game.js';
import { Menu } from './scenes/menu.js';

const config = {
  type: Phaser.AUTO,
  width: 817,
  height: 578,
  scene: [Menu, Game],
  physics: {
    default: 'arcade',
    arcade: {
      
      debug: false
    }
  }
}

var game = new Phaser.Game(config);