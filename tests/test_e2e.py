"""E2E Tests for Flood-It Game"""
import pytest
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def test_index_page_loads(playwright_page):
    """Test that the main page loads correctly"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Check title
    assert page.title() == "Flood-It"
    
    # Check main elements exist
    assert page.locator("h1").text_content() == "Flood-It"
    assert page.locator("#nickname").is_visible()
    assert page.locator("#difficulty").is_visible()
    assert page.locator("button:has-text('START SPEL')").is_visible()


def test_nickname_validation(playwright_page):
    """Test nickname input validation"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Try to start without nickname
    page.click("button:has-text('START SPEL')")
    assert page.locator("#nickname-error").is_visible()
    
    # Enter valid nickname
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START SPEL')")
    
    # Should now be in game
    assert page.locator("#game-grid").is_visible()
    assert page.locator("#moves").text_content() == "0"


def test_game_grid_renders(playwright_page):
    """Test that game grid renders correctly"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START SPEL')")
    
    # Check grid renders
    grid = page.locator("#game-grid")
    assert grid.is_visible()
    
    # Check cells exist
    cells = grid.locator(".cell")
    assert cells.count() > 0


def test_color_buttons_render(playwright_page):
    """Test that color buttons render"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START SPEL')")
    
    # Check color buttons
    color_buttons = page.locator(".color-btn")
    assert color_buttons.count() >= 4  # At least 4 colors


def test_make_move(playwright_page):
    """Test making a move in the game"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START SPEL')")
    
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
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Check initial value
    assert page.locator("#difficulty-label").text_content() == "5"
    
    # Change slider
    page.fill("#difficulty", "8")
    assert page.locator("#difficulty-label").text_content() == "8"


def test_mode_selection(playwright_page):
    """Test mode selection buttons"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Quick play should be active by default
    assert page.locator('.mode-btn[data-mode="quick"]').evaluate("el => el.classList.contains('active')")
    
    # Click challenge mode
    page.click('.mode-btn[data-mode="challenge"]')
    assert page.locator('.mode-btn[data-mode="challenge"]').evaluate("el => el.classList.contains('active')")


def test_timer_toggle(playwright_page):
    """Test timer toggle"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Initially hidden
    assert page.locator("#timer-info").is_hidden()
    
    # Toggle on
    page.check("#timer-toggle")
    assert page.locator("#timer-info").is_visible()
    
    # Toggle off
    page.uncheck("#timer-toggle")
    assert page.locator("#timer-info").is_hidden()


def test_new_game_button(playwright_page):
    """Test new game button returns to start screen"""
    page = playwright_page
    page.goto(f"file://{os.path.dirname(os.path.dirname(__file__))}/templates/index.html")
    
    # Start game
    page.fill("#nickname", "ABC")
    page.click("button:has-text('START SPEL')")
    
    # Click new game
    page.click("button:has-text('NIEUW SPEL')")
    
    # Should be back at start screen
    assert page.locator("#start-screen").is_visible()
