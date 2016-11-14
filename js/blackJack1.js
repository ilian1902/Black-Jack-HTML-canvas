'use strict';

function createGame(blackJackSelector, tableSelector) {

    const framesWidthCount = 13,
        framesHeightCount = 5,
        sizeCardX = 50,
        sizeCardY = 70,
        nextPosition = 60,
        dealText = 'DEAL',
        playerText = 'PLAYER',
        deckPosition = {
            "x": 1000,
            "y": 50
        };

    var blackJackCanvas = document.querySelector(blackJackSelector),
        blackJackCtx = blackJackCanvas.getContext('2d'),
        tableCanvas = document.querySelector(tableSelector),
        tableCtx = tableCanvas.getContext("2d"),
        button = document.getElementById("hit"),
        pause = false,
        speed = {
            x: 10,
            y: 5
        },
        imgCard = document.getElementById("cardImage"),
        imgTable = document.getElementById("tableImage"),
        dealCardPosition = {
            "x": 540,
            "y": 50
        },
        playerCardPosition = {
            "x": 540,
            "y": 150
        },
        dealCardIndex = 0,
        playerCardIndex = 0,
        playerCard = 2,
        hasDealCard = false,
        hasPlayerCard = false;

    blackJackCtx.fillStyle = "#4A0705";
    blackJackCtx.font = "30px Arial";
    blackJackCtx.fillText(dealText, 550, 30);

    blackJackCtx.font = "30px Arial";
    blackJackCtx.fillText(playerText, 550, 260);
// tuk e tableCtx
    blackJackCtx.drawImage(imgTable, 0, 0, blackJackCtx.width, blackJackCtx.height);
    blackJackCtx.drawImage(
        imgCard,
        0 * imgCard.width / framesWidthCount,
        4 * imgCard.height / framesHeightCount,
        imgCard.width / framesWidthCount,
        imgCard.height / framesHeightCount,
        deckPosition.x,
        deckPosition.y,
        sizeCardX,
        sizeCardY);

    var card = createCard({
        spritesheet: imgCard,
        randomX: getRandomCard(framesWidthCount),
        randomY: getRandomCard(framesHeightCount - 1),
        context: blackJackCtx,
        numberOfFramesX: framesWidthCount,
        numberOfFramesY: framesHeightCount,
        startPositionX: deckPosition.x,
        startPositionY: deckPosition.y,
        endPositionX: dealCardPosition.x,
        endPositionY: dealCardPosition.y,
        speedX: speed.x,
        speedY: speed.y,
        width: sizeCardX,
        height: sizeCardY

    });

    button.addEventListener("click", function () {
        if (playerCard !== 5) {
            playerCard += 1;
            pause = false;
            hasPlayerCard = false;
            gameLoop();
        }
    }, false);

    function gameLoop() {

        card.render({ x: card.startPositionX, y: card.startPositionY }, { x: card.startPositionX, y: card.startPositionY });
        card.update();

        if (!hasDealCard) {

            if (dealCardPosition.x === card.startPositionX) {

                card.render({ x: card.endPositionX, y: card.endPositionY }, { x: card.endPositionX, y: card.endPositionY });

                card.endPositionX = dealCardPosition.x + nextPosition;
                card.endPositionY = dealCardPosition.y;
                card.startPositionX = deckPosition.x;
                card.startPositionY = deckPosition.y;
                card.randomX = getRandomCard(framesWidthCount);
                card.randomY = getRandomCard(framesHeightCount - 1);
                dealCardIndex += 1;
                dealCardPosition.x = dealCardPosition.x + nextPosition;

                if (dealCardIndex === 2) {
                    hasDealCard = true;
                    card.endPositionX = playerCardPosition.x;
                    card.endPositionY = playerCardPosition.y;
                    card.startPositionX = deckPosition.x;
                    card.startPositionY = deckPosition.y;
                    card.randomX = getRandomCard(framesWidthCount);
                    card.randomY = getRandomCard(framesHeightCount - 1);
                }
            }
        } else if (!hasPlayerCard) {

            if (playerCardPosition.x === card.startPositionX && playerCardPosition.y === card.startPositionY) {

                card.render({ x: card.endPositionX, y: card.endPositionY }, { x: card.endPositionX, y: card.endPositionY });

                card.endPositionX = playerCardPosition.x + nextPosition;
                card.endPositionY = playerCardPosition.y;
                card.startPositionX = deckPosition.x;
                card.startPositionY = deckPosition.y;
                card.randomX = getRandomCard(framesWidthCount);
                card.randomY = getRandomCard(framesHeightCount - 1);
                playerCardIndex += 1;
                playerCardPosition.x = playerCardPosition.x + nextPosition;

                if (playerCardIndex === playerCard) {
                    pause = true;
                    hasPlayerCard = true;

                }

                if (playerCard === 5) {
                    drawText('Game Over', 140, 140);
                }
            }
        }

        if (!pause) {
            window.requestAnimationFrame(gameLoop);
        }
    }

    // TODO: Don't work for 2 times!!!
    function drawText(text, x, y, sizeAndFonds) {
        blackJackCtx.fillStyle = "#fff";
        blackJackCtx.rect(x - 10, y - 30, text.length * 20, 40);
        blackJackCtx.fill();
        blackJackCtx.fillStyle = "#4A0705";
        blackJackCtx.font = sizeAndFonds;
        blackJackCtx.fillText(text, x, y);
    }

    function getRandomCard(count) {
        let random = Math.floor(Math.random() * count);
        return random;
    }

    return {
        "start": function () {
            gameLoop();
        }
    }
}
