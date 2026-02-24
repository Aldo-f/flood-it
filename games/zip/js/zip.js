/**
 * Zip Puzzle Generator
 * Generates valid Zip puzzles (path through grid in numerical order)
 */

class ZipGenerator {
    generate(size = 5) {
        // Simple path generation - create a Hamiltonian path
        const path = this.generatePath(size);
        if (!path) return null;
        
        // Create puzzle by removing some numbers
        const puzzle = this.createPuzzle(path, size);
        
        return puzzle;
    }
    
    generatePath(size) {
        const visited = new Set();
        const path = [];
        
        // Start from random position
        const startX = Math.floor(Math.random() * size);
        const startY = Math.floor(Math.random() * size);
        
        if (!this.dfs(startX, startY, visited, path, size)) {
            return null;
        }
        
        return path;
    }
    
    dfs(x, y, visited, path, size) {
        const key = `${x},${y}`;
        if (visited.has(key)) return false;
        
        visited.add(key);
        path.push({x, y});
        
        if (path.length === size * size) return true;
        
        // Random directions
        const dirs = [[0,1],[0,-1],[1,0],[-1,0]].sort(() => Math.random() - 0.5);
        
        for (const [dx, dy] of dirs) {
            const nx = x + dx;
            const ny = y + dy;
            
            if (nx >= 0 && nx < size && ny >= 0 && ny < size && !visited.has(`${nx},${ny}`)) {
                if (this.dfs(nx, ny, visited, path, size)) return true;
            }
        }
        
        // Backtrack
        visited.delete(key);
        path.pop();
        return false;
    }
    
    createPuzzle(path, size) {
        const grid = Array(size).fill(null).map(() => Array(size).fill(0));
        const numbers = [];
        
        // Place numbers along path
        for (let i = 0; i < path.length; i++) {
            const {x, y} = path[i];
            grid[y][x] = i + 1;
            numbers.push({x, y, value: i + 1});
        }
        
        // Keep about 40% of numbers
        const keepCount = Math.floor(size * size * 0.4);
        const sortedNumbers = numbers.sort(() => Math.random() - 0.5);
        
        const puzzle = grid.map(row => [...row]);
        for (let i = keepCount; i < numbers.length; i++) {
            const {x, y} = numbers[i];
            puzzle[y][x] = 0;
        }
        
        return {
            puzzle,
            size,
            maxNumber: path.length
        };
    }
    
    validateMove(path, nextNumber, size) {
        if (path.length === 0) return nextNumber === 1;
        
        const last = path[path.length - 1];
        return nextNumber === last.value + 1;
    }
    
    checkWin(path, grid, size) {
        // Check if all cells filled
        if (path.length !== size * size) return false;
        
        // Check if last number is correct
        const last = path[path.length - 1];
        return last.value === size * size;
    }
}

if (typeof window !== 'undefined') {
    window.ZipGenerator = ZipGenerator;
}
