# Flood-It

A color-filling puzzle game built with HTML, CSS, and JavaScript. Goal is to flood the entire board with a single color in as few moves as possible.

## How to Play

1. Enter your name (3 characters, e.g., "ABC")
2. Choose difficulty (1-10)
3. Choose game mode:
   - **Quick Play**: Play 1 board
   - **Challenge**: Play 3 boards, score is the average
4. Optional: Enable timer
5. Click colors to flood the board starting from the top-left corner

## Play Online

- **GitHub Pages**: https://aldo-f.github.io/flood-it
- **Local**: http://localhost:5000 (after docker compose up)

## Local Development

### With Docker

```bash
docker compose up -d
# Open http://localhost:5000
```

### Manual

Open `index.html` in your browser.

## Run Tests

```bash
pip install pytest playwright
playwright install chromium
python -m pytest tests/ -v
```

## Architecture

- **Frontend**: Pure HTML/CSS/JS (no dependencies)
- **Storage**: localStorage for scores
- **Docker**: Nginx for static hosting
- **Deployment**: GitHub Pages + Docker

## Features

- [x] Difficulty slider (1-10)
- [x] Quick Play & Challenge mode
- [x] Timer (optional)
- [x] Leaderboard (localStorage)
- [x] Flood fill algorithm
- [x] Greedy solver for max_moves calculation
- [x] E2E tests with Playwright

## License

MIT

---

Also available in: [Nederlands](README.nl.md)
