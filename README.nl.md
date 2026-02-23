# Flood-It

Een kleurenspel gebouwd met HTML, CSS en JavaScript. Doel is om het hele bord in zo weinig mogelijk zetten te vullen met één kleur.

## Spelregels

1. Voer je naam in (3 tekens, bijv. "ABC")
2. Kies een moeilijkheidsgraad (1-10)
3. Kies speelmodus:
   - **Quick Play**: Speel 1 bord
   - **Challenge**: Speel 3 borden, je score is het gemiddelde
4. Optioneel: Timer inschakelen
5. Klik op de kleuren om het bord te vullen vanaf de linker bovenhoek

## Speel online

- **GitHub Pages**: https://aldo-f.github.io/flood-it
- **Lokaal**: http://localhost:5000 (na docker compose up)

## Lokaal ontwikkelen

### Met Docker

```bash
docker compose up -d
# Open http://localhost:5000
```

### Handmatig

Open `index.html` in je browser.

## Tests runnen

```bash
pip install pytest playwright
playwright install chromium
python -m pytest tests/ -v
```

## Architectuur

- **Frontend**: Pure HTML/CSS/JS (geen dependencies)
- **Opslag**: localStorage voor scores
- **Docker**: Nginx voor static hosting
- **Deployment**: GitHub Pages + Docker

## Features

- [x] Difficulty slider (1-10)
- [x] Quick Play & Challenge modus
- [x] Timer (optioneel)
- [x] Leaderboard per moeilijkheidsgraad
- [x] Naam onthouden
- [x] Meertalig (Engels, Nederlands)
- [x] Flood fill algoritme
- [x] Greedy solver voor max_moves berekening
- [x] E2E tests met Playwright

## Licentie

MIT
