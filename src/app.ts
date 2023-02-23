import Phaser from 'phaser-ce';

import { Config } from './config';

import { Boot } from './states/boot';
import { Preload } from './states/preload';
import { Game } from './states/game';

class Template extends Phaser.Game {
  constructor() {
    const config = {
      width: Config.gameWidth,
      height: Config.gameHeight,
      renderer: Config.renderer,
      parent: 'content',
      state: null,
      enableDebug: Config.enableDebug,
    };

    super(config);

    this.state.add('Boot', Boot, false);
    this.state.add('Preload', Preload, false);
    this.state.add('Game', Game, false);

    this.state.start('Boot');
  }
}

window.onload = () => new Template();
