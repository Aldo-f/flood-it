/**
 * Navigation module
 * Shared navigation functions for all games
 */

function goToDashboard() {
    // From games/flood-it/ -> ../../index.html
    // From games/queens/ -> ../../index.html
    window.location.href = '../../index.html';
}

function goToGame(gameName) {
    window.location.href = './' + gameName + '/index.html';
}
