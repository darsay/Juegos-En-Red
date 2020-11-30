
import { menuinicio } from './scenes/menuinicio.js';
import { nivel1 } from './scenes/nivel1.js';

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  scene: [menuinicio, nivel1],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

var game = new Phaser.Game(config);