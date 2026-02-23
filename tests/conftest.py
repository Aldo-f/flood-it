"""Pytest configuration for Flood-It E2E tests"""
import pytest
from playwright.sync_api import sync_playwright


@pytest.fixture(scope="session")
def browser():
    """Launch browser for tests"""
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        yield browser
        browser.close()


@pytest.fixture
def playwright_page(browser):
    """Create a new page for each test"""
    page = browser.new_page()
    yield page
    page.close()
