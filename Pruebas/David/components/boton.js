export class boton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('button', 'assets/images/restart1.png', { frameWidth: 1024, frameHeight: 1024 });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(400, 400, 'button').setInteractive();
    this.startButton.setScale(0.1);

  
    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start('game');
    });
  }
}