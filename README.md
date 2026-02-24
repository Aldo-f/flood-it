# Games

A collection of browser-based puzzle games.

## Available Games

- **Flood-It** - Color the whole board in as few moves as possible
- **Word Search** - Find all hidden words in the grid

## Playing

Open `index.html` in a web browser to start playing.

## Local Development

```bash
# Using Python
python3 -m http.server 8000

# Using PHP
php -S localhost:8000
```

Then open http://localhost:8000

## Structure

```
games/
├── index.html              # Dashboard
├── games/
│   ├── flood-it/         # Flood-It game
│   └── word-search/      # Word Search game
└── shared/
    ├── css/              # Shared styles
    └── js/               # Shared JavaScript
```

## Technology

- Pure HTML/CSS/JavaScript (no frameworks)
- LocalStorage for progress/score saving
- Responsive design for mobile and desktop

## License

MIT
