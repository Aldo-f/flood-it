/**
 * Queens Puzzle Generator
 * Generates valid Queens puzzles
 */

class QueensGenerator {
    constructor() {
        this.directions = [
            [0, 1], [0, -1], [1, 0], [-1, 0],  // Horizontal/Vertical
            [1, 1], [1, -1], [-1, 1], [-1, -1] // Diagonal
        ];
    }
    
    generate(size = 8) {
        for (let attempt = 0; attempt < 100; attempt++) {
            const solution = this.solve(size);
            if (solution) {
                const puzzle = this.createPuzzle(solution, size);
                if (puzzle) return puzzle;
            }
        }
        return null;
    }
    
    solve(size) {
        const board = Array(size).fill(null).map(() => Array(size).fill(null));
        const regions = this.generateRegions(size);
        
        return this.placeQueens(board, regions, 0, size);
    }
    
    generateRegions(size) {
        const regions = Array(size).fill(null).map(() => Array(size).fill(0));
        let regionCount = 0;
        
        // Simple region generation - create random connected regions
        const filled = new Set();
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (!filled.has(`${x},${y}`)) {
                    regionCount++;
                    this.fillRegion(regions, x, y, regionCount, filled, size);
                }
            }
        }
        
        return regions;
    }
    
    fillRegion(regions, x, y, regionId, filled, size) {
        const stack = [[x, y]];
        
        while (stack.length > 0) {
            const [cx, cy] = stack.pop();
            const key = `${cx},${cy}`;
            
            if (filled.has(key)) continue;
            if (cx < 0 || cx >= size || cy < 0 || cy >= size) continue;
            if (regions[cy][cx] !== 0) continue;
            
            regions[cy][cx] = regionId;
            filled.add(key);
            
            // Random expansion
            const dirs = [[0,1],[0,-1],[1,0],[-1,0]].sort(() => Math.random() - 0.5);
            for (const [dx, dy] of dirs) {
                if (Math.random() > 0.3) {
                    stack.push([cx + dx, cy + dy]);
                }
            }
        }
    }
    
    placeQueens(board, regions, row, size) {
        if (row >= size) {
            // Check all regions have exactly one queen
            const regionQueens = {};
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (board[y][x] === 'Q') {
                        const r = regions[y][x];
                        if (regionQueens[r]) return null; // Region already has queen
                        regionQueens[r] = {x, y};
                    }
                }
            }
            return Object.keys(regionQueens).length === size ? board : null;
        }
        
        const possibleCols = this.getPossibleCols(board, row, size);
        
        for (const col of possibleCols) {
            board[row][col] = 'Q';
            
            // Check diagonal attacks
            if (this.isSafe(board, row, col, size)) {
                const result = this.placeQueens(board, regions, row + 1, size);
                if (result) return result;
            }
            
            board[row][col] = null;
        }
        
        return null;
    }
    
    getPossibleCols(board, row, size) {
        const cols = [];
        for (let c = 0; c < size; c++) {
            cols.push(c);
        }
        return cols.sort(() => Math.random() - 0.5);
    }
    
    isSafe(board, row, col, size) {
        // Check row
        for (let c = 0; c < size; c++) {
            if (c !== col && board[row][c] === 'Q') return false;
        }
        
        // Check column
        for (let r = 0; r < size; r++) {
            if (r !== row && board[r][col] === 'Q') return false;
        }
        
        // Check diagonals
        for (const [dx, dy] of this.directions) {
            let x = col + dx;
            let y = row + dy;
            while (x >= 0 && x < size && y >= 0 && y < size) {
                if (board[y][x] === 'Q') return false;
                x += dx;
                y += dy;
            }
        }
        
        return true;
    }
    
    createPuzzle(solution, size) {
        // Remove some queens to create puzzle (keep about 40%)
        const puzzle = solution.map(row => [...row]);
        const queens = [];
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (puzzle[y][x] === 'Q') {
                    queens.push({x, y});
                }
            }
        }
        
        // Keep 30-40% of queens
        const keepCount = Math.floor(size * 0.35);
        const toRemove = queens.sort(() => Math.random() - 0.5).slice(keepCount);
        
        for (const q of toRemove) {
            puzzle[q.y][q.x] = null;
        }
        
        // Generate regions
        const regions = this.generateRegions(size);
        
        return { puzzle, solution, regions, size };
    }
    
    checkWin(puzzle, regions) {
        const size = puzzle.length;
        let queenCount = 0;
        
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (puzzle[y][x] === 'Q') {
                    queenCount++;
                    
                    // Check row
                    for (let c = 0; c < size; c++) {
                        if (c !== x && puzzle[y][c] === 'Q') return false;
                    }
                    
                    // Check column
                    for (let r = 0; r < size; r++) {
                        if (r !== y && puzzle[r][x] === 'Q') return false;
                    }
                    
                    // Check diagonal attacks
                    for (const [dx, dy] of this.directions) {
                        let nx = x + dx;
                        let ny = y + dy;
                        while (nx >= 0 && nx < size && ny >= 0 && ny < size) {
                            if (puzzle[ny][nx] === 'Q') return false;
                            nx += dx;
                            ny += dy;
                        }
                    }
                }
            }
        }
        
        // Check each region has exactly one queen
        const regionQueens = {};
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (puzzle[y][x] === 'Q') {
                    const r = regions[y][x];
                    if (regionQueens[r]) return false;
                    regionQueens[r] = true;
                }
            }
        }
        
        return queenCount === size && Object.keys(regionQueens).length === size;
    }
}

if (typeof window !== 'undefined') {
    window.QueensGenerator = QueensGenerator;
}
