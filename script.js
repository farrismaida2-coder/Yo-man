// 1000 Games Database
const allGames = generateGames();

let currentPage = 1;
const gamesPerPage = 12;
let filteredGames = [...allGames];
let currentFilter = 'all';
let currentGame = null;

// Generate 1000 games
function generateGames() {
    const gameNames = [
        'Space Blaster', 'Puzzle Quest', 'Adventure Lands', 'Racing Thunder',
        'Chess Master', 'Word Challenge', 'Brick Breaker', 'Dino Run',
        'Pac Man', 'Tetris', 'Snake Game', 'Flappy Bird',
        'Memory Match', 'Sudoku', 'Minesweeper', 'Solitaire',
        'Marble Madness', 'Tower Defense', 'Zombie Shooter', 'Galaxy Fight',
        'Pirate Quest', 'Monster Hunt', 'Ninja Runner', 'Dragon Slayer',
        'Bouncy Ball', 'Tap Tap Tap', 'Swipe Master', 'Color Match',
        'Number Crunch', 'Pattern Play', 'Block Blast', 'Grid Master',
        'Pixel Quest', 'Retro Runner', 'Arcade Classic', 'Sonic Speed',
        'Super Jump', 'Wall Jump', 'Sky Runner', 'Endless Runner',
        'Zombie Defense', 'Tower Build', 'City Sim', 'Farm Tycoon',
        'Poker Night', 'Blackjack Pro', 'Rummy Master', 'Bingo Bash'
    ];

    const categories = ['action', 'puzzle', 'adventure', 'sports', 'strategy'];
    const emojis = ['🎮', '🚀', '⚔️', '🎯', '🧩', '🏃', '🎲', '👾', '🎪', '🎨', '⭐', '🏆', '💎', '🔥', '❄️', '⚡'];

    const games = [];
    for (let i = 1; i <= 1000; i++) {
        games.push({
            id: i,
            name: `${gameNames[(i - 1) % gameNames.length]} ${Math.floor(i / gameNames.length) + 1}`,
            category: categories[(i - 1) % categories.length],
            emoji: emojis[Math.floor(Math.random() * emojis.length)],
            description: `Experience the ultimate gaming adventure! Get ready for non-stop action and excitement.`
        });
    }
    return games;
}

// Display games on the page
function displayGames() {
    const gamesGrid = document.getElementById('gamesGrid');
    gamesGrid.innerHTML = '';

    const startIndex = (currentPage - 1) * gamesPerPage;
    const endIndex = startIndex + gamesPerPage;
    const gamesToDisplay = filteredGames.slice(startIndex, endIndex);

    if (gamesToDisplay.length === 0) {
        gamesGrid.innerHTML = '<div class="empty-state">No games found. Try a different search!</div>';
        updatePagination();
        return;
    }

    gamesToDisplay.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-icon">${game.emoji}</div>
            <div class="game-name">${game.name}</div>
            <div class="game-category">${game.category}</div>
        `;
        gameCard.addEventListener('click', () => openModal(game));
        gamesGrid.appendChild(gameCard);
    });

    updatePagination();
}

// Update pagination
function updatePagination() {
    const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${totalPages}`;
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage === totalPages;
}

// Filter games
function filterGames(category) {
    currentFilter = category;
    currentPage = 1;
    
    if (category === 'all') {
        filteredGames = [...allGames];
    } else {
        filteredGames = allGames.filter(game => game.category === category);
    }
    
    displayGames();
}

// Search games
function searchGames(query) {
    currentPage = 1;
    const searchTerm = query.toLowerCase();
    
    if (currentFilter === 'all') {
        filteredGames = allGames.filter(game =>
            game.name.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredGames = allGames.filter(game =>
            game.category === currentFilter &&
            game.name.toLowerCase().includes(searchTerm)
        );
    }
    
    displayGames();
}

// Modal functions
function openModal(game) {
    currentGame = game;
    const modal = document.getElementById('gameModal');
    document.getElementById('modalTitle').textContent = game.emoji + ' ' + game.name;
    document.getElementById('modalDescription').textContent = game.description;
    document.getElementById('modalCategory').textContent = `Category: ${game.category.toUpperCase()}`;
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('gameModal').style.display = 'none';
}

function playGame() {
    if (currentGame) {
        // Keep modal open and show game is launching
        const modal = document.getElementById('gameModal');
        const playBtn = document.getElementById('playBtn');
        const originalText = playBtn.textContent;
        
        playBtn.textContent = '🎮 LOADING GAME...';
        playBtn.disabled = true;
        
        // Simulate game loading
        setTimeout(() => {
            alert(`🎮 ${currentGame.name} has started!\n\nHave fun playing!\n\n${currentGame.description}`);
            closeModal();
            playBtn.textContent = originalText;
            playBtn.disabled = false;
        }, 1500);
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayGames();

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', () => {
        const searchTerm = document.getElementById('searchInput').value;
        searchGames(searchTerm);
    });

    document.getElementById('searchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const searchTerm = document.getElementById('searchInput').value;
            searchGames(searchTerm);
        }
    });

    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            filterGames(e.target.dataset.filter);
            document.getElementById('searchInput').value = '';
        });
    });

    // Pagination
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayGames();
            window.scrollTo(0, 0);
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredGames.length / gamesPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayGames();
            window.scrollTo(0, 0);
        }
    });

    // Modal controls
    document.querySelector('.close').addEventListener('click', closeModal);
    
    document.getElementById('playBtn').addEventListener('click', playGame);

    window.addEventListener('click', (e) => {
        const modal = document.getElementById('gameModal');
        if (e.target === modal) {
            closeModal();
        }
    });
});

// Add stars to background
window.addEventListener('load', () => {
    const starsContainer = document.querySelector('.stars');
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.width = Math.random() * 3 + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.animationDelay = Math.random() * 3 + 's';
        starsContainer.appendChild(star);
    }
});
