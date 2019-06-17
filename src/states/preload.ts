import { Sound } from '../helpers/sound';

export class Preload extends Phaser.State {
    private ready: boolean;

    public preload(): void {
        // Load awesome fonts
        this.game.load.bitmapFont('font', 'assets/fonts/font.png', 'assets/fonts/font.xml');

        // Load sprite
        this.game.load.image('mushroom', 'assets/sprites/mushroom.png');

        // Initialize Howler
        Sound.load();

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    }

    public create(): void {

    }

    public update(): void {
        if ( (this.ready === true) && (Sound.loaded === true) ) {
            this.game.state.start('Game');
        }
    }

    private onLoadComplete(): void {
        this.ready = true;
    }
}