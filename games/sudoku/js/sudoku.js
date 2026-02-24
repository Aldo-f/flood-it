/**
 * Sudoku Generator
 * Generates valid Sudoku puzzles
 */

class SudokuGenerator {
    generate(difficulty = 'normal') {
        const solution = this.generateSolution();
        if (!solution) return null;
        
        const puzzle = this.createPuzzle(solution, difficulty);
        
        return { puzzle, solution, size: 9 };
    }
    
    generateSolution() {
        const grid = Array(9).fill(null).map(() => Array(9).fill(0));
        
        if (this.solve(grid)) {
            return grid;
        }
        return null;
    }
    
    solve(grid) {
        const empty = this.findEmpty(grid);
        if (!empty) return true;
        
        const [row, col] = empty;
        const nums = [1,2,3,4,5,6,7,8,9].sort(() => Math.random() - 0.5);
        
        for (const num of nums) {
            if (this.isValid(grid, row, col, num)) {
                grid[row][col] = num;
                if (this.solve(grid)) return true;
                grid[row][col] = 0;
            }
        }
        
        return false;
    }
    
    findEmpty(grid) {
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (grid[r][c] === 0) return [r, c];
            }
        }
        return null;
    }
    
    isValid(grid, row, col, num) {
        // Check row
        for (let c = 0; c < 9; c++) {
            if (grid[row][c] === num) return false;
        }
        
        // Check column
        for (let r = 0; r < 9; r++) {
            if (grid[r][col] === num) return false;
        }
        
        // Check 3x3 box
        const boxRow = Math.floor(row / 3) * 3;
        const boxCol = Math.floor(col / 3) * 3;
        for (let r = boxRow; r < boxRow + 3; r++) {
            for (let c = boxCol; c < boxCol + 3; c++) {
                if (grid[r][c] === num) return false;
            }
        }
        
        return true;
    }
    
    createPuzzle(solution, difficulty) {
        const puzzle = solution.map(row => [...row]);
        
        // Remove numbers based on difficulty
        let attempts;
        switch(difficulty) {
            case 'easy': attempts = 35; break;
            case 'hard': attempts = 55; break;
            default: attempts = 45;
        }
        
        let removed = 0;
        while (removed < attempts) {
            const r = Math.floor(Math.random() * 9);
            const c = Math.floor(Math.random() * 9);
            if (puzzle[r][c] !== 0) {
                puzzle[r][c] = 0;
                removed++;
            }
        }
        
        return puzzle;
    }
    
    checkWin(grid) {
        // Check all cells filled
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (grid[r][c] === 0) return false;
            }
        }
        
        // Check rows
        for (let r = 0; r < 9; r++) {
            const nums = new Set();
            for (let c = 0; c < 9; c++) {
                if (nums.has(grid[r][c])) return false;
                nums.add(grid[r][c]);
            }
        }
        
        // Check columns
        for (let c = 0; c < 9; c++) {
            const nums = new Set();
            for (let r = 0; r < 9; r++) {
                if (nums.has(grid[r][c])) return false;
                nums.add(grid[r][c]);
            }
        }
        
        // Check 3x3 boxes
        for (let br = 0; br < 3; br++) {
            for (let bc = 0; bc < 3; bc++) {
                const nums = new Set();
                for (let r = br * 3; r < br * 3 + 3; r++) {
                    for (let c = bc * 3; c < bc * 3 + 3; c++) {
                        if (nums.has(grid[r][c])) return false;
                        nums.add(grid[r][c]);
                    }
                }
            }
        }
        
        return true;
    }
    
    getConflicts(grid) {
        const conflicts = new Set();
        
        // Check rows
        for (let r = 0; r < 9; r++) {
            const nums = new Map();
            for (let c = 0; c < 9; c++) {
                const num = grid[r][c];
                if (num !== 0) {
                    if (nums.has(num)) {
                        conflicts.add(`${r},${c}`);
                        conflicts.add(`${r},${nums.get(num)}`);
                    }
                    nums.set(num, c);
                }
            }
        }
        
        // Check columns
        for (let c = 0; c < 9; c++) {
            const nums = new Map();
            for (let r = 0; r < 9; r++) {
                const num = grid[r][c];
                if (num !== 0) {
                    if (nums.has(num)) {
                        conflicts.add(`${r},${c}`);
                        conflicts.add(`${nums.get(num)},${c}`);
                    }
                    nums.set(num, r);
                }
            }
        }
        
        // Check boxes
        for (let br = 0; br < 3; br++) {
            for (let bc = 0; bc < 3; bc++) {
                const nums = new Map();
                for (let r = br * 3; r < br * 3 + 3; r++) {
                    for (let c = bc * 3; c < bc * 3 + 3; c++) {
                        const num = grid[r][c];
                        if (num !== 0) {
                            if (nums.has(num)) {
                                conflicts.add(`${r},${c}`);
                                const [pr, pc] = nums.get(num).split(',').map(Number);
                                conflicts.add(`${pr},${pc}`);
                            }
                            nums.set(num, `${r},${c}`);
                        }
                    }
                }
            }
        }
        
        return conflicts;
    }
}

if (typeof window !== 'undefined') {
    window.SudokuGenerator = SudokuGenerator;
}
