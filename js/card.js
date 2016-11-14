class Card {
    constructor(
        image,
        context,
        x,
        y,
        width,
        height) {
        this.image = randomCard;
        this.context = context;
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 70;
    }

    animation(startPositionX, startPositionY, endPositionX, endPositionY, speedX, speedY) {
        return function () {
            while (startPositionX === endPositionX || startPositionY === endPositionY) {
                if (endPositionY === startPositionY) {
                    startPositionX -= speedX;
                } else {
                    startPositionX -= speedX;
                    startPositionY -= speedY;
                }
            }
        };
    }
}

const randomCard = (function () {
    let random = 0;
    return function () {
        random = Math.floor(Math.random() * 52);
        return `img/play-cards${random}.png`;
    };
})();