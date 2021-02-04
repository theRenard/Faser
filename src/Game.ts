import {
  Scene
} from 'phaser';
import debug from '~/debug';
import Lampo from '~/lampo';
import {
  LAMPO_GENERAZIONI,
  LAMPO_MAXOFFSET,
  LAMPO_SCALA
} from '~/constants.json';
import createRecurringFunction from './recurring';

export default class Game extends Scene {
  private scoreText!: Phaser.GameObjects.DynamicBitmapText;
  private fpsText!: Phaser.GameObjects.Text;
  private pointer!: Phaser.Input.Pointer;

  constructor() {
    super({
      key: 'game',
      active: false,
    });
  }

  create(): void {
    if (debug) {
      this.fpsText = this.add.text(10, 550, 'FPS: -- \n-- Particles', {
        font: 'bold 26px Arial',
      });
    }
    this.pointer = this.input.activePointer;
  }


  update (time, delta): void {
    if (debug) this.fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n');
    if (time % 60 === 0) {
      const lampo = new Lampo(this, LAMPO_GENERAZIONI, LAMPO_MAXOFFSET, LAMPO_SCALA);
      const segmentoIniziale = lampo.generazione2(this.scale.width / 2, this.scale.height / 2, this.pointer.x, this.pointer.y, 1);
      const generazioneRecorsiva = createRecurringFunction(lampo.funzioneT);
      const risultato = generazioneRecorsiva(segmentoIniziale, 10);

      risultato?.forEach((segmento) => {
        segmento.draw();
      });
    }
  }
}