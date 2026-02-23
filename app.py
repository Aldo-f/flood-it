#!/usr/bin/env python3
"""Flood-It - Flask Web Game"""

import json
import random
from collections import deque
from pathlib import Path
from flask import Flask, render_template, request, jsonify

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)
LEADERBOARD_FILE = DATA_DIR / "leaderboard.json"

COLORS = [
    "#e74c3c",  # Red
    "#3498db",  # Blue
    "#2ecc71",  # Green
    "#f39c12",  # Orange
    "#9b59b6",  # Purple
    "#1abc9c",  # Teal
    "#e91e63",  # Pink
    "#ff5722",  # Deep Orange
    "#795548",  # Brown
    "#607d8b",  # Blue Grey
]

DIFFICULTY_SETTINGS = {
    1: {"grid": 8, "colors": 4, "time": 45},
    2: {"grid": 9, "colors": 4, "time": 50},
    3: {"grid": 10, "colors": 5, "time": 55},
    4: {"grid": 11, "colors": 5, "time": 60},
    5: {"grid": 12, "colors": 5, "time": 65},
    6: {"grid": 13, "colors": 6, "time": 70},
    7: {"grid": 14, "colors": 6, "time": 75},
    8: {"grid": 16, "colors": 7, "time": 85},
    9: {"grid": 18, "colors": 7, "time": 95},
    10: {"grid": 20, "colors": 8, "time": 105},
}

app = Flask(__name__)
app.secret_key = "flood-it-secret-key"


def load_leaderboard():
    if LEADERBOARD_FILE.exists():
        with open(LEADERBOARD_FILE) as f:
            return json.load(f)
    return []


def save_leaderboard(data):
    with open(LEADERBOARD_FILE, "w") as f:
        json.dump(data, f, indent=2)


def flood_fill(grid, x, y, old_color, new_color):
    if old_color == new_color:
        return grid
    n = len(grid)
    if x < 0 or x >= n or y < 0 or y >= n:
        return grid
    if grid[y][x] != old_color:
        return grid
    grid[y][x] = new_color
    queue = deque([(x, y)])
    while queue:
        cx, cy = queue.popleft()
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < n and 0 <= ny < n and grid[ny][nx] == old_color:
                grid[ny][nx] = new_color
                queue.append((nx, ny))
    return grid


def get_connected(grid, x, y):
    n = len(grid)
    visited = set()
    queue = deque([(x, y)])
    color = grid[y][x]
    while queue:
        cx, cy = queue.popleft()
        if (cx, cy) in visited:
            continue
        visited.add((cx, cy))
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = cx + dx, cy + dy
            if 0 <= nx < n and 0 <= ny < n and grid[ny][nx] == color:
                queue.append((nx, ny))
    return visited


def count_expansion(grid, color):
    temp_grid = [row[:] for row in grid]
    connected = get_connected(temp_grid, 0, 0)
    for x, y in connected:
        temp_grid[y][x] = color
    new_connected = get_connected(temp_grid, 0, 0)
    return len(new_connected) - len(connected)


def greedy_solver(grid, max_colors):
    temp_grid = [row[:] for row in grid]
    moves = 0
    n = len(temp_grid)
    while moves < 50:
        connected = get_connected(temp_grid, 0, 0)
        if len(connected) == n * n:
            break
        best_color = None
        best_expansion = -1
        for color in range(max_colors):
            if temp_grid[0][0] == color:
                continue
            expansion = count_expansion(temp_grid, color)
            if expansion > best_expansion:
                best_expansion = expansion
                best_color = color
        if best_color is None or best_expansion <= 0:
            break
        flood_fill(temp_grid, 0, 0, temp_grid[0][0], best_color)
        moves += 1
    return moves


def calculate_max_moves(grid_size, num_colors):
    test_grid = [
        [random.randint(0, num_colors - 1) for _ in range(grid_size)]
        for _ in range(grid_size)
    ]
    scores = []
    for _ in range(3):
        score = greedy_solver(test_grid, num_colors)
        scores.append(score)
        test_grid = [
            [random.randint(0, num_colors - 1) for _ in range(grid_size)]
            for _ in range(grid_size)
        ]
    return max(int(sum(scores) / len(scores)) + 8, 10)


def generate_grid(grid_size, num_colors):
    return [
        [random.randint(0, num_colors - 1) for _ in range(grid_size)]
        for _ in range(grid_size)
    ]


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/api/new-game", methods=["POST"])
def new_game():
    data = request.get_json()
    mode = data.get("mode", "quick")
    difficulty = data.get("difficulty", 5)
    timer_enabled = data.get("timer", False)

    difficulty = max(1, min(10, difficulty))
    settings = DIFFICULTY_SETTINGS[difficulty]
    grid_size = settings["grid"]
    num_colors = settings["colors"]

    if mode == "challenge":
        grid_size = 10
        num_colors = 6

    max_moves = calculate_max_moves(grid_size, num_colors)

    game_data = {
        "grid": generate_grid(grid_size, num_colors),
        "grid_size": grid_size,
        "num_colors": num_colors,
        "max_moves": max_moves,
        "moves": 0,
        "difficulty": difficulty,
        "mode": mode,
        "timer_enabled": timer_enabled,
        "timer_duration": settings["time"] if timer_enabled else 0,
    }

    if mode == "challenge":
        game_data["boards"] = [
            {
                "grid": generate_grid(10, 6),
                "moves": 0,
                "completed": False,
            }
            for _ in range(3)
        ]
        game_data["current_board"] = 0

    return jsonify(game_data)


@app.route("/api/move", methods=["POST"])
def make_move():
    data = request.get_json()
    game = data.get("game")
    color = data.get("color")

    grid = game["grid"]
    current_color = grid[0][0]

    if color == current_color:
        return jsonify({"game": game, "valid": False})

    flood_fill(grid, 0, 0, current_color, color)
    game["moves"] += 1

    n = len(grid)
    connected = get_connected(grid, 0, 0)
    won = len(connected) == n * n

    return jsonify({"game": game, "valid": True, "won": won})


@app.route("/api/challenge-next", methods=["POST"])
def challenge_next():
    data = request.get_json()
    game = data.get("game")

    game["current_board"] += 1
    if game["current_board"] >= 3:
        scores = [b["moves"] for b in game["boards"]]
        avg_score = sum(scores) / len(scores)
        return jsonify({"game": game, "completed": True, "avg_score": avg_score})

    return jsonify({"game": game, "completed": False})


@app.route("/api/leaderboard", methods=["GET"])
def get_leaderboard():
    leaderboard = load_leaderboard()
    leaderboard.sort(key=lambda x: x["score"])
    return jsonify(leaderboard[:20])


@app.route("/api/score", methods=["POST"])
def submit_score():
    data = request.get_json()
    nickname = data.get("nickname", "").upper()[:3]
    score = data.get("score")
    mode = data.get("mode", "quick")

    if not nickname or score is None:
        return jsonify({"error": "Invalid data"}), 400

    leaderboard = load_leaderboard()

    entry = {
        "nickname": nickname,
        "score": round(score, 1),
        "mode": mode,
    }

    leaderboard.append(entry)
    save_leaderboard(leaderboard)

    return jsonify({"success": True})


if __name__ == "__main__":
    print("Starting Flood-It...")
    print("Go to http://localhost:5000")
    app.run(debug=True, host="0.0.0.0", port=5000)
