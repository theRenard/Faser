import {
  Scene
} from 'phaser';
import debug from '~/debug';
import Lampo from '~/lampo';
import {
  LAMPO_GENERAZIONI,
  LAMPO_MAXOFFSET,
  LAMPO_SCALA,
  LAMPO_DURATA
} from '~/constants.json';
import { createRecurringFunctionLast } from './recurring';

export default class Game extends Scene {
  private fpsText!: Phaser.GameObjects.Text;
  private pointer!: Phaser.Input.Pointer;
  private style!: Phaser.GameObjects.Graphics;
  private style1!: Phaser.GameObjects.Graphics;

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
    //setInterval(() => {
      this.style = this.add.graphics({
        lineStyle: {
            width: 3,
            color: 0xff0000
        }
      });
      this.style1 = this.add.graphics({
        lineStyle: {
            width: 2,
            color: 0xffff00,
          //  alpha: 0.
        }
      });
     const lampo = new Lampo(this, LAMPO_GENERAZIONI, LAMPO_MAXOFFSET, LAMPO_SCALA);
     const segmentoIniziale = lampo.generazione2(300, 300, 1000, 300, 1);
     const generazioneRecorsiva = createRecurringFunctionLast(lampo.funzioneT, lampo);
     const risultato = generazioneRecorsiva(segmentoIniziale, 2);
     for (let index = 0; index < risultato.length; index++) {
       const segmento = risultato[index];
       segmento.draw(this.style, this.style1);
     }
   //}, LAMPO_DURATA);
  }


  update (time: number, delta): void {
    if (debug) this.fpsText.setText('FPS: ' + (1000/delta).toFixed(3) + '\n');
  }
}