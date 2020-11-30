export class RestartButton {
  constructor(scene) {
    this.relatedScene = scene;
  }

  preload() {
    this.relatedScene.load.spritesheet('button', 'assets/boton.png', { frameWidth: 190, frameHeight: 49 });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(400, 230, 'button').setInteractive();

  
    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start('nivel1');
    });
  }