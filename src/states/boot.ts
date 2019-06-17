export class Boot extends Phaser.State {
    public create(): void {
        // set up input max pointers
        this.input.maxPointers = 1;
        this.game.stage.backgroundColor = '000000';
        // set up stage disable visibility change
        // this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation /
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        // this.game.scale.compatibility.forceMinimumDocumentHeight = true;
        // this.scale.compatibility.forceMinimumDocumentHeight = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape.
        // * Set second to true to force portrait.
        // this.scale.forceOrientation(false, true);
        // this.game.scale.compatibility.forceMinimumDocumentHeight = true;
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        // this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        // this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        this.scale.refresh();

        this.game.state.start('Preload');
    }
}