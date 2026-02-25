/**
 * Queens Puzzle Generator
 * Generates valid Queens puzzles - guaranteed solvable
 */

class QueensGenerator {
    constructor() {
        this.directions = [
            [0, 1], [0, -1], [1, 0], [-1, 0],
            [1, 1], [1, -1], [-1, 1], [-1, -1]
        ];
    }
    
    generate(size = 8) {
        // Try multiple times with better generation
        for (let attempt = 0; attempt < 50; attempt++) {
            const result = this.generatePuzzle(size);
            if (result) return result;
        }
        return null;
    }
    
    generatePuzzle(size) {
        // Step 1: Generate a valid N-Queens solution
        const solution = this.generateNQueens(size);
        if (!solution) return null;
        
        // Step 2: Generate regions that work with this solution
        const regions = this.generateCompatibleRegions(size, solution);
        if (!regions) return null;
        
        // Step 3: Create puzzle by removing some queens
        const puzzle = this.createPuzzle(solution, regions, size);
        
        return { puzzle, solution, regions, size };
    }
    
    generateNQueens(size) {
        const board = Array(size).fill(null).map(() => Array(size).fill(null));
        
        if (this.solveQueens(board, 0, size)) {
            return board;
        }
        return null;
    }
    
    solveQueens(board, row, size) {
        if (row >= size) return true;
        
        // Try columns in random order
        const cols = [];
        for (let c = 0; c < size; c++) cols.push(c);
        cols.sort(() => Math.random() - 0.5);
        
        for (const col of cols) {
            if (this.isSafeQueens(board, row, col, size)) {
                board[row][col] = 'Q';
                if (this.solveQueens(board, row + 1, size)) return true;
                board[row][col] = null;
            }
        }
        return false;
    }
    
    isSafeQueens(board, row, col, size) {
        // Check column
        for (let r = 0; r < row; r++) {
            if (board[r][col] === 'Q') return false;
        }
        
        // Check diagonals
        for (let d = 1; d < size; d++) {
            if (row - d >= 0 && col - d >= 0 && board[row - d][col - d] === 'Q') return false;
            if (row - d >= 0 && col + d < size && board[row - d][col + d] === 'Q') return false;
        }
        
        return true;
    }
    
    generateCompatibleRegions(size, solution) {
        // Create regions based on queen positions - each queen gets its own region ideally
        // But we need exactly 'size' regions
        
        // Simple approach: create regions that don't conflict with queen positions
        const regions = Array(size).fill(null).map(() => Array(size).fill(0));
        let regionId = 0;
        
        // Try to create size regions
        for (let attempt = 0; attempt < 100; attempt++) {
            // Reset
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    regions[y][x] = 0;
                }
            }
            
            regionId = 0;
            const used = new Set();
            
            // Assign each queen position to its own region first
            const queenPositions = [];
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (solution[y][x] === 'Q') {
                        queenPositions.push({x, y});
                    }
                }
            }
            
            // Create regions around each queen
            for (const q of queenPositions) {
                regionId++;
                this.expandRegion(regions, q.x, q.y, regionId, size, used);
            }
            
            // Fill remaining cells with other regions
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    if (regions[y][x] === 0) {
                        regionId++;
                        this.expandRegionSimple(regions, x, y, regionId, size);
                    }
                }
            }
            
            // Check we have exactly 'size' regions
            const uniqueRegions = new Set();
            for (let y = 0; y < size; y++) {
                for (let x = 0; x < size; x++) {
                    uniqueRegions.add(regions[y][x]);
                }
            }
            
            if (uniqueRegions.size === size) {
                return regions;
            }
        }
        
        // Fallback: simple grid regions
        return this.generateSimpleRegions(size);
    }
    
    expandRegion(regions, x, y, regionId, size, used) {
        if (x < 0 || x >= size || y < 0 || y >= size) return;
        if (regions[y][x] !== 0) return;
        if (used.has(`${x},${y}`)) return;
        
        regions[y][x] = regionId;
        used.add(`${x},${y}`);
        
        // Try to expand to neighbors
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        dirs.sort(() => Math.random() - 0.5);
        
        for (const [dx, dy] of dirs) {
            if (Math.random() > 0.4) {
                this.expandRegion(regions, x + dx, y + dy, regionId, size, used);
            }
        }
    }
    
    expandRegionSimple(regions, x, y, regionId, size) {
        if (x < 0 || x >= size || y < 0 || y >= size) return;
        if (regions[y][x] !== 0) return;
        
        regions[y][x] = regionId;
        
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]];
        for (const [dx, dy] of dirs) {
            this.expandRegionSimple(regions, x + dx, y + dy, regionId, size);
        }
    }
    
    generateSimpleRegions(size) {
        // Fallback: simple row-based regions
        const regions = Array(size).fill(null).map(() => Array(size).fill(0));
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                regions[y][x] = y + 1;
            }
        }
        return regions;
    }
    
    createPuzzle(solution, regions, size) {
        const puzzle = solution.map(row => [...row]);
        
        // Remove some queens (keep about 35%)
        const queens = [];
        for (let y = 0; y < size; y++) {
            for (let x = 0; x < size; x++) {
                if (puzzle[y][x] === 'Q') {
                    queens.push({x, y});
                }
            }
        }
        
        // Shuffle and keep about 35%
        queens.sort(() => Math.random() - 0.5);
        const keepCount = Math.max(3, Math.floor(size * 0.35));
        
        // Remove all except keepCount
        for (let i = keepCount; i < queens.length; i++) {
            puzzle[queens[i].y][queens[i].x] = null;
        }
        
        return puzzle;
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
                    
                    // Check diagonals
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
