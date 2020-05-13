/* eslint-disable import/no-extraneous-dependencies */
import 'pixi';
import 'p2';
import Phaser from 'phaser-ce';

import { Config } from './config';

import { Boot } from './states/boot';
import { Preload } from './states/preload';
import { Game } from './states/game';

class Template extends Phaser.Game {
  constructor() {
    super(Config.gameWidth, Config.gameHeight, Phaser.CANVAS, 'content', null);

    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('Game', Game, false);

    this.state.start('Boot');
  }
}

window.onload = () => {
  // eslint-disable-next-line no-new
  new Template();
};
