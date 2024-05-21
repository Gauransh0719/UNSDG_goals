document.addEventListener('DOMContentLoaded', function () {
    const container = document.querySelector('.container');
    const man = document.querySelector('.man');
    const food = document.querySelector('.food');
    const gameOver = document.querySelector('.game-over');
    const restartBtn = document.querySelector('.restart');
    const scoreDisplay = document.querySelector('.score span');

    let score = 0;
    let isGameOver = false;
    let foodInterval;

    // Touch drag variables
    let isDragging = false;
    let touchX = 0;
    let manStartX = 0;

    function getRandomPosition() {
        const containerWidth = container.offsetWidth;
        const foodWidth = food.offsetWidth;
        const maxX = containerWidth - foodWidth;
        return Math.floor(Math.random() * (maxX + 1));
    }

    function dropFood() {
        const posX = getRandomPosition();
        food.style.left = `${posX}px`;
        food.style.top = '0';
        food.style.display = 'block';

        const fallInterval = setInterval(() => {
            if (isGameOver) {
                clearInterval(fallInterval);
                return;
            }

            const posY = food.offsetTop;
            const containerHeight = container.offsetHeight;
            const foodHeight = food.offsetHeight;

            if (posY + foodHeight >= containerHeight) {
                clearInterval(fallInterval);
                endGame();
                return;
            }

            food.style.top = `${posY + 1}px`;

            if (isManCatchingFood()) {
                score++;
                updateScore();
                food.style.display = 'none';
                clearInterval(fallInterval);
                dropFood();
            }
        }, 10);
    }

    function isManCatchingFood() {
        const manRect = man.getBoundingClientRect();
        const foodRect = food.getBoundingClientRect();
        return (
            foodRect.bottom >= manRect.top &&
            foodRect.top <= manRect.bottom &&
            foodRect.right >= manRect.left &&
            foodRect.left <= manRect.right
        );
    }

    function updateScore() {
        scoreDisplay.textContent = score;
    }

    function endGame() {
        isGameOver = true;
        clearInterval(foodInterval);
        gameOver.style.display = 'block';
    }

    function restartGame() {
        score = 0;
        isGameOver = false;
        gameOver.style.display = 'none';
        updateScore();
        dropFood();
    }

    function onTouchStart(event) {
        const touch = event.touches[0];
        touchX = touch.clientX;
        manStartX = man.offsetLeft;
        isDragging = true;
    }

    function onTouchMove(event) {
        if (!isDragging) return;
        const touch = event.touches[0];
        const deltaX = touch.clientX - touchX;
        let newManX = manStartX + deltaX;
        const containerWidth = container.offsetWidth;
        const manWidth = man.offsetWidth;
        newManX = Math.min(Math.max(0, newManX), containerWidth - manWidth);
        man.style.left = `${newManX}px`;
    }

    function onTouchEnd(event) {
        isDragging = false;
    }

    restartBtn.addEventListener('click', restartGame);

    document.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    dropFood();
});
