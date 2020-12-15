export class boton {
  constructor(scene, where, sprite, x, y) {
    this.relatedScene = scene;
    this.destination = where;
    this.sprite = sprite;
    this.x = x;
    this.y = y;
  }

  preload() {
    this.relatedScene.load.image('button', 'assets/images/play.png', { frameWidth: 1024, frameHeight: 1024 });
  }

  create() {
    this.startButton = this.relatedScene.add.sprite(this.x, this.y, this.sprite).setInteractive();
    //this.startButton.setScale(0.1);

  
    this.startButton.on('pointerdown', () => {
      this.relatedScene.scene.start(this.destination, { id: 0}); 
    });
  }
}