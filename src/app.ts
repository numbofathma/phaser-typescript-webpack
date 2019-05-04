const PIXI = require('phaser-ce/build/custom/pixi');
const p2 = require('phaser-ce/build/custom/p2');
const Phaser = require('phaser-ce/build/custom/phaser-arcade-physics');

import {Config} from './config';

import {Boot} from './states/boot';
import {Preload} from './states/preload';
import {Game} from './states/game';

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
    new Template();
};