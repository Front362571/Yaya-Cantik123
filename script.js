// Generate Floating Hearts Background
function generateFloatingHearts() {
    for(let i = 0; i < 10; i++) {
        let heart = document.createElement('div');
        heart.className = 'heart-bg';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDelay = Math.random() * 15 + 's';
        heart.style.animationDuration = (Math.random() * 10 + 10) + 's';
        document.body.appendChild(heart);
    }
}

// Section Navigation
function showSection(sectionName) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionName).classList.add('active');
}

// Letter Animation
let letterOpened = false;

function openLetter() {
    const envelope = document.getElementById('envelope');
    const instruction = document.getElementById('instruction');
    
    if (!letterOpened) {
        envelope.classList.add('open');
        instruction.style.display = 'none';
        letterOpened = true;
    } else {
        envelope.classList.remove('open');
        instruction.style.display = 'block';
        letterOpened = false;
    }
}

// ========== MEMORY CARD GAME ==========

const symbols = ['❤️', '💕', '💝', '💖', '🌹', '💐', '💗', '💓'];
let cards = [...symbols, ...symbols];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let canFlip = true;

// Shuffle Array Function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Create Game Board
function createGameBoard() {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.innerHTML = '';
    cards = shuffleArray([...symbols, ...symbols]);
    
    cards.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        card.dataset.index = index;
        card.innerHTML = `
            <div class="card-back">❓</div>
            <div class="card-front">${symbol}</div>
        `;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

// Flip Card Function
function flipCard() {
    if (!canFlip || this.classList.contains('flipped') || this.classList.contains('matched')) {
        return;
    }

    this.classList.add('flipped');
    flippedCards.push(this);

    if (flippedCards.length === 2) {
        canFlip = false;
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

// Check Match Function
function checkMatch() {
    const [card1, card2] = flippedCards;
    const symbol1 = card1.dataset.symbol;
    const symbol2 = card2.dataset.symbol;

    if (symbol1 === symbol2) {
        card1.classList.add('matched');
        card2.classList.add('matched');
        matchedPairs++;
        document.getElementById('matches').textContent = matchedPairs;
        flippedCards = [];
        canFlip = true;

        if (matchedPairs === 8) {
            setTimeout(() => {
                alert(`Selamat! 🎉 Kamu menyelesaikan game dalam ${moves} gerakan!`);
            }, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];
            canFlip = true;
        }, 1000);
    }
}

// Reset Game Function
function resetGame() {
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    canFlip = true;
    document.getElementById('moves').textContent = '0';
    document.getElementById('matches').textContent = '0';
    createGameBoard();
}

// Initialize when page loads
window.addEventListener('DOMContentLoaded', function() {
    generateFloatingHearts();
    createGameBoard();
});
