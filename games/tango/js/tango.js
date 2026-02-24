/**
 * Tango Puzzle Generator
 * Binary puzzle: suns and moons with constraints
 */

class TangoGenerator {
    constructor(size = 6) {
        this.size = size;
        this.sun = '☀️';
        this.moon = '🌙';
    }
    
    generate() {
        // Generate valid solution
        const solution = this.generateSolution();
        if (!solution) return null;
        
        // Create puzzle with constraints
        const puzzle = this.createPuzzle(solution);
        
        return puzzle;
    }
    
    generateSolution() {
        // Simple approach: generate random grid with correct balance
        for (let attempt = 0; attempt < 100; attempt++) {
            const grid = Array(this.size).fill(null).map(() => Array(this.size).fill(null));
            
            if (this.fillGrid(grid, 0, 0)) {
                return grid;
            }
        }
        return null;
    }
    
    fillGrid(row, col) {
        if (row >= this.size) return true;
        
        const nextRow = col === this.size - 1 ? row + 1 : row;
        const nextCol = col === this.size - 1 ? 0 : col + 1;
        
        const values = [this.sun, this.moon].sort(() => Math.random() - 0.5);
        
        for (const value of values) {
            if (this.canPlace(row, col, value)) {
                this.grid[row][col] = value;
                if (this.fillGrid(nextRow, nextCol)) return true;
                this.grid[row][col] = null;
            }
        }
        
        return false;
    }
    
    canPlace(row, col, value) {
        // Check row - no 3 in a row
        let count = 1;
        if (col > 0 && this.grid[row][col - 1] === value) count++;
        if (col > 1 && this.grid[row][col - 2] === value && this.grid[row][col - 1] === value) return false;
        
        // Check column - no 3 in a row
        count = 1;
        if (row > 0 && this.grid[row - 1][col] === value) count++;
        if (row > 1 && this.grid[row - 2][col] === value && this.grid[row - 1][col] === value) return false;
        
        // Check row balance (exactly size/2)
        const rowCount = this.grid[row].filter(c => c === value).length;
        if (rowCount >= this.size / 2) return false;
        
        // Check column balance
        let colCount = 0;
        for (let r = 0; r < this.size; r++) {
            if (this.grid[r][col] === value) colCount++;
        }
        if (colCount >= this.size / 2) return false;
        
        return true;
    }
    
    createPuzzle(solution) {
        this.grid = solution.map(row => [...row]);
        
        const puzzle = {
            grid: solution.map(row => [...row]),
            size: this.size,
            constraints: []
        };
        
        // Add some fixed cells (about 30%)
        const cells = [];
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                cells.push({x, y});
            }
        }
        
        cells.sort(() => Math.random() - 0.5);
        const keepCount = Math.floor(this.size * this.size * 0.3);
        
        // Clear most cells but keep some
        for (let i = 0; i < cells.length; i++) {
            const {x, y} = cells[i];
            if (i < keepCount) {
                // Keep this cell as fixed
            } else {
                puzzle.grid[y][x] = null;
            }
        }
        
        // Add some = and × constraints
        const constraintCount = Math.floor(this.size * 1.5);
        for (let i = 0; i < constraintCount; i++) {
            const x1 = Math.floor(Math.random() * (this.size - 1));
            const y1 = Math.floor(Math.random() * (this.size - 1));
            
            // Horizontal or vertical neighbor
            if (Math.random() > 0.5 && x1 < this.size - 1) {
                const type = solution[y1][x1] === solution[y1][x1 + 1] ? '=' : '×';
                puzzle.constraints.push({x1, y1, x2: x1 + 1, y2: y1, type});
            } else if (y1 < this.size - 1) {
                const type = solution[y1][x1] === solution[y1 + 1][x1] ? '=' : '×';
                puzzle.constraints.push({x1, y1, x2: x1, y2: y1 + 1, type});
            }
        }
        
        // Replace nulls with empty string for display
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (puzzle.grid[y][x] === null) {
                    puzzle.grid[y][x] = '';
                }
            }
        }
        
        return puzzle;
    }
    
    toggleCell(grid, row, col) {
        if (grid[row][col] === this.sun) return this.moon;
        if (grid[row][col] === this.moon) return '';
        return this.sun;
    }
    
    checkWin(grid, puzzle) {
        // Check all cells filled
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (!grid[y][x] || grid[y][x] === '') return false;
            }
        }
        
        // Check row balance
        for (let y = 0; y < this.size; y++) {
            const suns = grid[y].filter(c => c === this.sun).length;
            if (suns !== this.size / 2) return false;
        }
        
        // Check column balance
        for (let x = 0; x < this.size; x++) {
            let suns = 0;
            for (let y = 0; y < this.size; y++) {
                if (grid[y][x] === this.sun) suns++;
            }
            if (suns !== this.size / 2) return false;
        }
        
        // Check no 3 in a row
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size - 2; x++) {
                if (grid[y][x] && grid[y][x] === grid[y][x + 1] && grid[y][x] === grid[y][x + 2]) {
                    return false;
                }
            }
        }
        
        for (let x = 0; x < this.size; x++) {
            for (let y = 0; y < this.size - 2; y++) {
                if (grid[y][x] && grid[y][x] === grid[y + 1][x] && grid[y][x] === grid[y + 2][x]) {
                    return false;
                }
            }
        }
        
        // Check constraints
        for (const c of puzzle.constraints) {
            const v1 = grid[c.y1][c.x1];
            const v2 = grid[c.y2][c.x2];
            if (c.type === '=' && v1 !== v2) return false;
            if (c.type === '×' && v1 === v2) return false;
        }
        
        return true;
    }
}

if (typeof window !== 'undefined') {
    window.TangoGenerator = TangoGenerator;
}
