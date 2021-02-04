import {
  Scene
} from 'phaser';

export default class Game extends Scene {

  constructor() {
    super({
      key: 'game',
      active: false,
    });
  }
}