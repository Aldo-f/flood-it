"""E2E Tests for Flood-It Game"""
import pytest
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def test_index_page_loads(playwright_page):
    """Test that the main page loads correctly"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Check title
    assert page.title() == "Flood-It"
    
    # Check main elements exist
    assert page.locator("h1").text_content() == "Flood-It"
    assert page.locator("#nickname").is_visible()
    assert page.locator("#difficulty").is_visible()
    assert page.locator("button:has-text('START GAME')").is_visible()


def test_nickname_validation(playwright_page):
    """Test nickname input validation"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Try to start without nickname
    page.click("button:has-text('START GAME')")
    assert page.locator("#nickname-error").is_visible()
    
    # Enter valid nickname
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START GAME')")
    
    # Should now be in game
    assert page.locator("#game-grid").is_visible()
    assert page.locator("#moves").text_content() == "0"


def test_game_grid_renders(playwright_page):
    """Test that game grid renders correctly"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START GAME')")
    
    # Check grid renders
    grid = page.locator("#game-grid")
    assert grid.is_visible()
    
    # Check cells exist
    cells = grid.locator(".cell")
    assert cells.count() > 0


def test_color_buttons_render(playwright_page):
    """Test that color buttons render"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START GAME')")
    
    # Check color buttons
    color_buttons = page.locator(".color-btn")
    assert color_buttons.count() >= 4


def test_make_move(playwright_page):
    """Test making a move in the game"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START GAME')")
    
    # Get initial moves
    initial_moves = int(page.locator("#moves").text_content())
    
    # Click a color button (not the current one)
    color_buttons = page.locator(".color-btn")
    count = color_buttons.count()
    if count > 1:
        color_buttons.nth(1).click()
    
    # Check moves increased
    new_moves = int(page.locator("#moves").text_content())
    assert new_moves == initial_moves + 1


def test_difficulty_slider(playwright_page):
    """Test difficulty slider updates label"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Check initial value
    assert page.locator("#difficulty-label").text_content() == "5"
    
    # Change slider
    page.fill("#difficulty", "8")
    assert page.locator("#difficulty-label").text_content() == "8"


def test_mode_selection(playwright_page):
    """Test mode selection buttons"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Quick play should be active by default
    assert page.locator('.mode-btn[data-mode="quick"]').evaluate("el => el.classList.contains('active')")
    
    # Click challenge mode
    page.click('.mode-btn[data-mode="challenge"]')
    assert page.locator('.mode-btn[data-mode="challenge"]').evaluate("el => el.classList.contains('active')")
    
    # Challenge info should be visible
    assert page.locator("#challenge-info").is_visible()


def test_timer_toggle(playwright_page):
    """Test timer toggle"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Initially hidden
    assert page.locator("#timer-info").is_hidden()
    
    # Toggle on via JavaScript
    page.evaluate("document.getElementById('timer-toggle').checked = true; document.getElementById('timer-toggle').dispatchEvent(new Event('change'))")
    assert page.locator("#timer-info").is_visible()


def test_new_game_button(playwright_page):
    """Test new game button returns to start screen"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START GAME')")
    
    # Click new game
    page.click("button:has-text('NEW GAME')")
    
    # Should be back at start screen
    assert page.locator("#start-screen").is_visible()


def test_nickname_persists_after_game(playwright_page):
    """Test that nickname stays filled after game ends"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Enter nickname
    page.fill("#nickname", "XYZ")
    page.click("button:has-text('START GAME')")
    
    # Wait for game to load
    page.wait_for_selector("#game-grid")
    
    # Click new game to go back
    page.click("button:has-text('NEW GAME')")
    
    # Nickname should still be filled in
    assert page.locator("#nickname").input_value() == "XYZ"


def test_language_switch(playwright_page):
    """Test language switching works"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Check default is English
    assert page.locator("button:has-text('START GAME')").is_visible()
    
    # Switch to Dutch
    page.click(".lang-btn[data-lang='nl']")
    
    # Check Dutch text
    assert page.locator("button:has-text('START SPEL')").is_visible()


def test_leaderboard_tabs(playwright_page):
    """Test leaderboard difficulty tabs exist"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Check tabs exist
    tabs = page.locator(".leaderboard-tab")
    assert tabs.count() >= 11  # All + 1-10
    
    # Click difficulty 5
    page.click(".leaderboard-tab[data-diff='5']")
    assert page.locator('.leaderboard-tab[data-diff="5"]').evaluate("el => el.classList.contains('active')")


def test_score_no_decimals(playwright_page):
    """Test that score displays without decimal places"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/index.html")
    
    # Fill some test scores in localStorage via JavaScript
    page.evaluate("""
        localStorage.setItem('floodit_leaderboard', JSON.stringify([
            {nickname: 'AAA', score: 15.5, mode: 'quick', difficulty: 5},
            {nickname: 'BBB', score: 20, mode: 'challenge', difficulty: 5}
        ]));
    """)
    
    # Reload page to show leaderboard
    page.reload()
    
    # Check leaderboard scores don't have decimals
    score = page.locator(".leaderboard-score").first.text_content()
    assert "." not in score
