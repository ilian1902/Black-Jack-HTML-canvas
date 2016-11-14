function createCard(options) {

    'use strict';

    var clearOffset = 10;

    function render(drawCoordinates, clearCoordinates) {
        // { x: Number, y: Number }
        var self = this;

        self.context.clearRect(
            clearCoordinates.x - clearOffset,
            clearCoordinates.y - clearOffset,
            self.width + clearOffset * 2,
            self.height + clearOffset * 2
        );

        self.context.drawImage(
            self.spritesheet,
            self.randomX * self.spritesheet.width / self.numberOfFramesX,
            self.randomY * self.spritesheet.height / self.numberOfFramesY,
            self.spritesheet.width / self.numberOfFramesX,
            self.spritesheet.height / self.numberOfFramesY,
            drawCoordinates.x,
            drawCoordinates.y,
            self.width,
            self.height
        );

        return self;
    }

    function update() {

        var self = this;

        if (self.startPositionX > self.endPositionX && self.startPositionY === self.endPositionY) {
            self.startPositionX -= self.speedX;
        } else if (self.startPositionX > self.endPositionX && self.startPositionY < self.endPositionY) {
            self.startPositionX -= self.speedX;
            self.startPositionY += self.speedY;
        }

        return self;
    }

    var card = {
        spritesheet: options.spritesheet,
        context: options.context, // drawing context
        randomX: options.randomX,
        randomY: options.randomY,
        width: options.width, 
        height: options.height, 
        numberOfFramesX: options.numberOfFramesX,
        numberOfFramesY: options.numberOfFramesY,
        startPositionX: options.startPositionX,
        startPositionY: options.startPositionY,
        endPositionX: options.endPositionX,
        endPositionY: options.endPositionY,
        speedX: options.speedX,
        speedY: options.speedY,
        render: render,
        update: update
    };

    return card;
}