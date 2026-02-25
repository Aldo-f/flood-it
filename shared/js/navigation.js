/**
 * Navigation module
 * Shared navigation functions for all games
 */

function goToDashboard() {
    window.location.href = '../index.html';
}

function goToGame(gameName) {
    window.location.href = './' + gameName + '/index.html';
}
