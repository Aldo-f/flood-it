/**
 * Word Search Grid Generator
 * Generates valid word search puzzles with solver validation
 */

class WordSearchGenerator {
    constructor() {
        this.directions = [
            { dx: 1, dy: 0 },   // Horizontal right
            { dx: -1, dy: 0 },  // Horizontal left
            { dx: 0, dy: 1 },   // Vertical down
            { dx: 0, dy: -1 },  // Vertical up
            { dx: 1, dy: 1 },   // Diagonal down-right
            { dx: -1, dy: -1 }, // Diagonal up-left
            { dx: 1, dy: -1 },  // Diagonal up-right
            { dx: -1, dy: 1 }   // Diagonal down-left
        ];
    }
    
    /**
     * Generate a word search puzzle
     * @param {string[]} words - Array of words to place
     * @param {number} gridSize - Size of the grid (8, 10, 12, 14)
     * @param {number} maxAttempts - Max attempts to place words
     * @returns {object|null} - Puzzle object or null if failed
     */
    generate(words, gridSize, maxAttempts = 100) {
        // Filter and clean words
        const validWords = words
            .map(w => w.toUpperCase().replace(/[^A-Z]/g, ''))
            .filter(w => w.length >= 3 && w.length <= gridSize);
        
        if (validWords.length < 3) return null;
        
        for (let attempt = 0; attempt < maxAttempts; attempt++) {
            const puzzle = this.tryGenerate(validWords, gridSize);
            if (puzzle) {
                // Validate with solver
                if (this.validatePuzzle(puzzle)) {
                    return puzzle;
                }
            }
        }
        
        return null;
    }
    
    tryGenerate(words, gridSize) {
        const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
        const placedWords = [];
        
        // Sort words by length (longest first - harder to place)
        const sortedWords = [...words].sort((a, b) => b.length - a.length);
        
        for (const word of sortedWords) {
            const placement = this.placeWord(grid, word, gridSize);
            if (!placement) {
                return null; // Can't place this word, restart
            }
            placedWords.push(placement);
        }
        
        // Fill remaining cells with random letters
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (grid[y][x] === '') {
                    grid[y][x] = letters[Math.floor(Math.random() * letters.length)];
                }
            }
        }
        
        return {
            grid,
            words: placedWords,
            gridSize
        };
    }
    
    placeWord(grid, word, gridSize) {
        // Shuffle directions
        const shuffledDirs = [...this.directions].sort(() => Math.random() - 0.5);
        
        // Try each direction
        for (const dir of shuffledDirs) {
            const positions = this.getPossiblePositions(grid, word, dir, gridSize);
            
            if (positions.length > 0) {
                // Pick random position
                const pos = positions[Math.floor(Math.random() * positions.length)];
                
                // Place word
                for (let i = 0; i < word.length; i++) {
                    const x = pos.x + (dir.dx * i);
                    const y = pos.y + (dir.dy * i);
                    grid[y][x] = word[i];
                }
                
                return {
                    word,
                    startX: pos.x,
                    startY: pos.y,
                    endX: pos.x + (dir.dx * (word.length - 1)),
                    endY: pos.y + (dir.dy * (word.length - 1)),
                    direction: dir
                };
            }
        }
        
        return null;
    }
    
    getPossiblePositions(grid, word, dir, gridSize) {
        const positions = [];
        
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                if (this.canPlace(grid, word, x, y, dir, gridSize)) {
                    positions.push({ x, y });
                }
            }
        }
        
        return positions;
    }
    
    canPlace(grid, word, startX, startY, dir, gridSize) {
        const endX = startX + (dir.dx * (word.length - 1));
        const endY = startY + (dir.dy * (word.length - 1));
        
        // Check bounds
        if (endX < 0 || endX >= gridSize || endY < 0 || endY >= gridSize) {
            return false;
        }
        
        // Check for conflicts
        for (let i = 0; i < word.length; i++) {
            const x = startX + (dir.dx * i);
            const y = startY + (dir.dy * i);
            const current = grid[y][x];
            
            if (current !== '' && current !== word[i]) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Validate that each word can only be found once
     * @param {object} puzzle - The puzzle object
     * @returns {boolean} - True if valid
     */
    validatePuzzle(puzzle) {
        const { grid, words } = puzzle;
        const gridSize = grid.length;
        
        for (const placedWord of words) {
            const foundPositions = this.findWord(grid, placedWord.word, gridSize);
            
            // Word should be found exactly once
            if (foundPositions.length !== 1) {
                console.log(`Word "${placedWord.word}" found ${foundPositions.length} times`);
                return false;
            }
            
            // Found position should match original placement
            const found = foundPositions[0];
            const matchesStart = (found.startX === placedWord.startX && found.startY === placedWord.startY);
            const matchesEnd = (found.endX === placedWord.endX && found.endY === placedWord.endY);
            
            // Allow for reverse matches too
            if (!matchesStart && !matchesEnd) {
                console.log(`Word "${placedWord.word}" position mismatch`);
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Find all positions where a word appears in the grid
     * @param {string[][]} grid - The grid
     * @param {string} word - The word to find
     * @param {number} gridSize - Grid size
     * @returns {array} - Array of found positions
     */
    findWord(grid, word, gridSize) {
        const found = [];
        const target = word.toUpperCase();
        
        for (const dir of this.directions) {
            // Try starting from each cell
            for (let y = 0; y < gridSize; y++) {
                for (let x = 0; x < gridSize; x++) {
                    if (this.checkWordAt(grid, target, x, y, dir, gridSize)) {
                        const endX = x + (dir.dx * (target.length - 1));
                        const endY = y + (dir.dy * (target.length - 1));
                        found.push({
                            startX: x,
                            startY: y,
                            endX,
                            endY,
                            direction: dir,
                            word: target
                        });
                    }
                }
            }
        }
        
        return found;
    }
    
    checkWordAt(grid, word, startX, startY, dir, gridSize) {
        const endX = startX + (dir.dx * (word.length - 1));
        const endY = startY + (dir.dy * (word.length - 1));
        
        // Check bounds
        if (endX < 0 || endX >= gridSize || endY < 0 || endY >= gridSize) {
            return false;
        }
        
        // Check each letter
        for (let i = 0; i < word.length; i++) {
            const x = startX + (dir.dx * i);
            const y = startY + (dir.dy * i);
            if (grid[y][x] !== word[i]) {
                return false;
            }
        }
        
        return true;
    }
    
    /**
     * Check if user selection matches a word
     * @param {object} puzzle - The puzzle
     * @param {number} startX - Start X
     * @param {number} startY - Start Y  
     * @param {number} endX - End X
     * @param {number} endY - End Y
     * @returns {object|null} - Matched word or null
     */
    checkSelection(puzzle, startX, startY, endX, endY) {
        const { grid, words, gridSize } = puzzle;
        
        // Get direction
        const dx = Math.sign(endX - startX);
        const dy = Math.sign(endY - startY);
        
        // Calculate length
        const length = Math.max(
            Math.abs(endX - startX),
            Math.abs(endY - startY)
        ) + 1;
        
        // Extract selected letters
        let selectedWord = '';
        for (let i = 0; i < length; i++) {
            const x = startX + (dx * i);
            const y = startY + (dy * i);
            if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
                selectedWord += grid[y][x];
            }
        }
        
        // Check if it matches any word (forward or backward)
        for (const wordObj of words) {
            if (wordObj.word === selectedWord || wordObj.word === selectedWord.split('').reverse().join('')) {
                return wordObj;
            }
        }
        
        return null;
    }
}

/**
 * Daily Puzzle Generator
 * Generates consistent puzzles based on date
 */
class DailyPuzzle {
    constructor(seed) {
        this.seed = seed;
    }
    
    // Simple hash function for seeding
    hash(str) {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            const char = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
    
    // Seeded random number generator
    seededRandom(seed) {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }
    
    getDailySeed(date) {
        const dateStr = date.toISOString().split('T')[0];
        return this.hash(dateStr);
    }
    
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return `${d.getUTCFullYear()}-W${Math.ceil((((d - yearStart) / 86400000) + 1) / 7)}`;
    }
}

// Export for use in other files
if (typeof window !== 'undefined') {
    window.WordSearchGenerator = WordSearchGenerator;
    window.DailyPuzzle = DailyPuzzle;
}
