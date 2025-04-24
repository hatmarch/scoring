// Hearts Score Tracker Application
document.addEventListener('DOMContentLoaded', function() {
    // App state
    const appState = {
        players: [],
        currentRound: 1,
        scores: [],
        maxScore: 100,
        shootingMoonEnabled: true,
        gameActive: false
    };

    // DOM elements
    const elements = {
        screens: {
            playerSetup: document.getElementById('player-setup'),
            gamePlay: document.getElementById('game-play'),
            gameOver: document.getElementById('game-over')
        },
        playerSetup: {
            numPlayersSelect: document.getElementById('num-players'),
            playerNamesContainer: document.getElementById('player-names-container'),
            maxScoreInput: document.getElementById('max-score'),
            shootingMoonCheckbox: document.getElementById('shooting-moon'),
            startGameBtn: document.getElementById('start-game')
        },
        gamePlay: {
            currentRoundSpan: document.getElementById('current-round'),
            scoreTable: document.getElementById('score-table'),
            playerHeaderRow: document.getElementById('player-header-row'),
            scoreBody: document.getElementById('score-body'),
            totalRow: document.getElementById('total-row'),
            roundInput: document.getElementById('round-input'),
            inputRoundNum: document.getElementById('input-round-num'),
            roundScoreInputs: document.getElementById('round-score-inputs'),
            saveRoundBtn: document.getElementById('save-round'),
            newRoundBtn: document.getElementById('new-round'),
            undoRoundBtn: document.getElementById('undo-round'),
            resetGameBtn: document.getElementById('reset-game')
        },
        gameOver: {
            finalResults: document.getElementById('final-results'),
            winnerName: document.getElementById('winner-name'),
            newGameBtn: document.getElementById('new-game')
        }
    };

    // Initialize the application
    function init() {
        setupEventListeners();
        updatePlayerInputs();
        checkForSavedGame();
    }

    // Check local storage for saved game
    function checkForSavedGame() {
        const savedGame = localStorage.getItem('heartsScoreTracker');
        if (savedGame) {
            try {
                const parsedGame = JSON.parse(savedGame);
                
                // Prompt user to continue saved game
                if (window.confirm('A saved game was found. Would you like to continue?')) {
                    loadSavedGame(parsedGame);
                } else {
                    localStorage.removeItem('heartsScoreTracker');
                }
            } catch (e) {
                console.error('Error loading saved game:', e);
                localStorage.removeItem('heartsScoreTracker');
            }
        }
    }

    // Load a saved game
    function loadSavedGame(savedGame) {
        // Restore app state
        appState.players = savedGame.players;
        appState.currentRound = savedGame.currentRound;
        appState.scores = savedGame.scores;
        appState.maxScore = savedGame.maxScore;
        appState.shootingMoonEnabled = savedGame.shootingMoonEnabled;
        appState.gameActive = savedGame.gameActive;

        // Update UI based on the game state
        elements.playerSetup.numPlayersSelect.value = appState.players.length;
        elements.playerSetup.maxScoreInput.value = appState.maxScore;
        elements.playerSetup.shootingMoonCheckbox.checked = appState.shootingMoonEnabled;
        
        // Update player names inputs
        updatePlayerInputs();
        appState.players.forEach((player, index) => {
            document.getElementById(`player${index+1}`).value = player;
        });

        // If game is active, switch to game play screen
        if (appState.gameActive) {
            updateScoreTable();
            showScreen('gamePlay');
        }
    }

    // Save current game to local storage
    function saveGameToLocalStorage() {
        localStorage.setItem('heartsScoreTracker', JSON.stringify(appState));
    }

    // Set up event listeners
    function setupEventListeners() {
        // Player setup screen
        elements.playerSetup.numPlayersSelect.addEventListener('change', updatePlayerInputs);
        elements.playerSetup.startGameBtn.addEventListener('click', startGame);

        // Game play screen
        elements.gamePlay.newRoundBtn.addEventListener('click', startNewRound);
        elements.gamePlay.saveRoundBtn.addEventListener('click', saveRound);
        elements.gamePlay.undoRoundBtn.addEventListener('click', undoLastRound);
        elements.gamePlay.resetGameBtn.addEventListener('click', confirmResetGame);

        // Game over screen
        elements.gameOver.newGameBtn.addEventListener('click', resetGame);
    }

    // Update player input fields based on selected number of players
    function updatePlayerInputs() {
        const numPlayers = parseInt(elements.playerSetup.numPlayersSelect.value);
        const container = elements.playerSetup.playerNamesContainer;
        
        // Clear existing inputs
        container.innerHTML = '';
        
        // Create inputs for each player
        for (let i = 1; i <= numPlayers; i++) {
            const div = document.createElement('div');
            div.className = 'player-name';
            
            const label = document.createElement('label');
            label.setAttribute('for', `player${i}`);
            label.textContent = `Player ${i}:`;
            
            const input = document.createElement('input');
            input.type = 'text';
            input.id = `player${i}`;
            input.placeholder = 'Name';
            
            div.appendChild(label);
            div.appendChild(input);
            container.appendChild(div);
        }
    }

    // Start a new game
    function startGame() {
        // Get player names
        const numPlayers = parseInt(elements.playerSetup.numPlayersSelect.value);
        const playerNames = [];
        
        for (let i = 1; i <= numPlayers; i++) {
            const nameInput = document.getElementById(`player${i}`);
            const name = nameInput.value.trim() || `Player ${i}`;
            playerNames.push(name);
        }
        
        // Get game options
        const maxScore = parseInt(elements.playerSetup.maxScoreInput.value) || 100;
        const shootingMoonEnabled = elements.playerSetup.shootingMoonCheckbox.checked;
        
        // Initialize app state
        appState.players = playerNames;
        appState.currentRound = 1;
        appState.scores = [];
        appState.maxScore = maxScore;
        appState.shootingMoonEnabled = shootingMoonEnabled;
        appState.gameActive = true;
        
        // Update UI
        updateScoreTable();
        showScreen('gamePlay');
        
        // Save to local storage
        saveGameToLocalStorage();
    }

    // Update the score table with current game data
    function updateScoreTable() {
        // Update round number
        elements.gamePlay.currentRoundSpan.textContent = appState.currentRound;
        
        // Clear existing headers (except Round header)
        const headerRow = elements.gamePlay.playerHeaderRow;
        while (headerRow.children.length > 1) {
            headerRow.removeChild(headerRow.lastChild);
        }
        
        // Add player headers
        appState.players.forEach(player => {
            const th = document.createElement('th');
            th.textContent = player;
            headerRow.appendChild(th);
        });
        
        // Clear existing score rows
        elements.gamePlay.scoreBody.innerHTML = '';
        
        // Add score rows
        appState.scores.forEach((roundScores, roundIndex) => {
            const roundNumber = roundIndex + 1;
            const row = document.createElement('tr');
            
            const roundCell = document.createElement('td');
            roundCell.textContent = roundNumber;
            row.appendChild(roundCell);
            
            roundScores.forEach(score => {
                const cell = document.createElement('td');
                cell.textContent = score;
                row.appendChild(cell);
            });
            
            elements.gamePlay.scoreBody.appendChild(row);
        });
        
        // Update totals
        updateTotalScores();
    }

    // Update the total scores in the table footer
    function updateTotalScores() {
        // Clear existing totals (except Total header)
        const totalRow = elements.gamePlay.totalRow;
        while (totalRow.children.length > 1) {
            totalRow.removeChild(totalRow.lastChild);
        }
        
        // Calculate and add total for each player
        const totals = calculateTotalScores();
        
        totals.forEach(total => {
            const cell = document.createElement('td');
            cell.textContent = total;
            
            // Highlight players close to max score
            if (total >= appState.maxScore * 0.8) {
                cell.style.color = 'var(--danger-color)';
                cell.style.fontWeight = 'bold';
            }
            
            totalRow.appendChild(cell);
        });
        
        // Check if game is over
        checkForGameOver(totals);
    }

    // Calculate total scores for all players
    function calculateTotalScores() {
        const playerCount = appState.players.length;
        const totals = new Array(playerCount).fill(0);
        
        appState.scores.forEach(roundScores => {
            roundScores.forEach((score, playerIndex) => {
                totals[playerIndex] += score;
            });
        });
        
        return totals;
    }

    // Start entering scores for a new round
    function startNewRound() {
        const roundInputsContainer = elements.gamePlay.roundScoreInputs;
        roundInputsContainer.innerHTML = '';
        
        // Create input for each player
        appState.players.forEach((player, index) => {
            const div = document.createElement('div');
            div.className = 'round-score-input';
            
            const label = document.createElement('label');
            label.setAttribute('for', `score-player-${index}`);
            label.textContent = player;
            
            const input = document.createElement('input');
            input.type = 'number';
            input.id = `score-player-${index}`;
            input.min = '0';
            input.max = '26';
            input.value = '0';
            
            div.appendChild(label);
            div.appendChild(input);
            roundInputsContainer.appendChild(div);
        });
        
        // Update round number in the input section
        elements.gamePlay.inputRoundNum.textContent = appState.currentRound;
        
        // Show the round input section
        elements.gamePlay.roundInput.classList.remove('hidden');
    }

    // Save scores for the current round
    function saveRound() {
        const roundScores = [];
        
        // Get scores from inputs
        appState.players.forEach((_, index) => {
            const input = document.getElementById(`score-player-${index}`);
            const score = parseInt(input.value) || 0;
            roundScores.push(score);
        });
        
        // Check for shooting the moon
        if (appState.shootingMoonEnabled) {
            const moonShooterIndex = roundScores.findIndex(score => score === 26);
            
            if (moonShooterIndex !== -1) {
                // If someone shot the moon, all other players get 26 points
                roundScores.forEach((_, index) => {
                    if (index !== moonShooterIndex) {
                        roundScores[index] = 26;
                    } else {
                        roundScores[index] = 0;
                    }
                });
                
                alert(`${appState.players[moonShooterIndex]} shot the moon! All other players get 26 points.`);
            }
        }
        
        // Add scores to game state
        appState.scores.push(roundScores);
        appState.currentRound++;
        
        // Update UI
        updateScoreTable();
        elements.gamePlay.roundInput.classList.add('hidden');
        
        // Save to local storage
        saveGameToLocalStorage();
    }

    // Undo the last round
    function undoLastRound() {
        if (appState.scores.length > 0) {
            if (confirm('Are you sure you want to undo the last round?')) {
                appState.scores.pop();
                appState.currentRound--;
                updateScoreTable();
                saveGameToLocalStorage();
            }
        } else {
            alert('No rounds to undo.');
        }
    }

    // Check if any player has reached or exceeded the max score
    function checkForGameOver(totals) {
        const maxTotal = Math.max(...totals);
        if (maxTotal >= appState.maxScore) {
            endGame(totals);
        }
    }

    // End the game and show final results
    function endGame(totals) {
        // Find the winner (player with lowest score)
        const minScore = Math.min(...totals);
        const winnerIndex = totals.indexOf(minScore);
        const winner = appState.players[winnerIndex];
        
        // Update game over screen
        elements.gameOver.winnerName.textContent = winner;
        
        // Create final results table
        const resultsTable = document.createElement('table');
        const headerRow = document.createElement('tr');
        
        const rankHeader = document.createElement('th');
        rankHeader.textContent = 'Rank';
        headerRow.appendChild(rankHeader);
        
        const playerHeader = document.createElement('th');
        playerHeader.textContent = 'Player';
        headerRow.appendChild(playerHeader);
        
        const scoreHeader = document.createElement('th');
        scoreHeader.textContent = 'Score';
        headerRow.appendChild(scoreHeader);
        
        resultsTable.appendChild(headerRow);
        
        // Create an array of player indices sorted by score
        const playerIndices = Array.from({ length: appState.players.length }, (_, i) => i);
        playerIndices.sort((a, b) => totals[a] - totals[b]);
        
        // Add rows for each player
        playerIndices.forEach((playerIndex, rank) => {
            const row = document.createElement('tr');
            
            const rankCell = document.createElement('td');
            rankCell.textContent = rank + 1;
            row.appendChild(rankCell);
            
            const playerCell = document.createElement('td');
            playerCell.textContent = appState.players[playerIndex];
            row.appendChild(playerCell);
            
            const scoreCell = document.createElement('td');
            scoreCell.textContent = totals[playerIndex];
            row.appendChild(scoreCell);
            
            // Highlight the winner
            if (rank === 0) {
                row.className = 'winner';
                row.style.fontWeight = 'bold';
                row.style.color = 'var(--success-color)';
            }
            
            resultsTable.appendChild(row);
        });
        
        // Add table to results
        elements.gameOver.finalResults.innerHTML = '';
        elements.gameOver.finalResults.appendChild(resultsTable);
        
        // Show game over screen
        showScreen('gameOver');
        
        // Mark game as inactive
        appState.gameActive = false;
        saveGameToLocalStorage();
    }

    // Confirm before resetting game
    function confirmResetGame() {
        if (confirm('Are you sure you want to reset the game? All progress will be lost.')) {
            resetGame();
        }
    }

    // Reset the game and return to player setup
    function resetGame() {
        // Reset app state
        appState.players = [];
        appState.currentRound = 1;
        appState.scores = [];
        appState.gameActive = false;
        
        // Clear local storage
        localStorage.removeItem('heartsScoreTracker');
        
        // Show player setup screen
        showScreen('playerSetup');
    }

    // Show a specific screen and hide others
    function showScreen(screenName) {
        // Hide all screens
        Object.values(elements.screens).forEach(screen => {
            screen.classList.remove('active');
        });
        
        // Show requested screen
        elements.screens[screenName].classList.add('active');
    }

    // Initialize app
    init();
});

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}