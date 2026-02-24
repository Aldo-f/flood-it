/**
 * Leaderboard module
 * Handles score storage and retrieval (localStorage for now)
 */

class Leaderboard {
    constructor(gameId) {
        this.gameId = gameId;
        this.storageKey = `${gameId}_leaderboard`;
    }
    
    getStorageKey() {
        return this.storageKey;
    }
    
    load() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : [];
        } catch (e) {
            console.error('Failed to load leaderboard:', e);
            return [];
        }
    }
    
    save(data) {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Failed to save leaderboard:', e);
            return false;
        }
    }
    
    addEntry(entry) {
        const data = this.load();
        
        // entry format: { nickname, score, mode, difficulty, hints, undos, timestamp }
        const newEntry = {
            ...entry,
            timestamp: Date.now()
        };
        
        data.push(newEntry);
        
        // Sort by score (ascending for most games, but some might want descending)
        data.sort((a, b) => a.score - b.score);
        
        // Keep only top 100
        const trimmed = data.slice(0, 100);
        
        return this.save(trimmed);
    }
    
    getTop(limit = 10, difficulty = 'all') {
        let data = this.load();
        
        if (difficulty !== 'all') {
            const diff = parseInt(difficulty);
            data = data.filter(e => e.difficulty === diff);
        }
        
        return data.slice(0, limit);
    }
    
    getPersonalBest(nickname) {
        const data = this.load();
        const playerEntries = data.filter(e => 
            e.nickname && e.nickname.toUpperCase() === nickname.toUpperCase()
        );
        
        if (playerEntries.length === 0) return null;
        
        return playerEntries.reduce((best, entry) => 
            entry.score < best.score ? entry : best
        );
    }
    
    clear() {
        return this.save([]);
    }
}

/**
 * Account module (mock for now)
 * Handles local vs cloud storage
 */

class AccountManager {
    constructor() {
        this.storageKey = 'games_account';
        this.currentMode = localStorage.getItem('games_account_mode') || 'local';
        this.userData = this.loadUserData();
    }
    
    loadUserData() {
        try {
            const data = localStorage.getItem(this.storageKey);
            return data ? JSON.parse(data) : { local: {}, cloud: {} };
        } catch (e) {
            return { local: {}, cloud: {} };
        }
    }
    
    saveUserData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.userData));
            return true;
        } catch (e) {
            console.error('Failed to save user data:', e);
            return false;
        }
    }
    
    getMode() {
        return this.currentMode;
    }
    
    setMode(mode) {
        this.currentMode = mode;
        localStorage.setItem('games_account_mode', mode);
    }
    
    getData(gameId) {
        return this.userData[this.currentMode][gameId] || null;
    }
    
    setData(gameId, data) {
        if (!this.userData[this.currentMode][gameId]) {
            this.userData[this.currentMode][gameId] = {};
        }
        this.userData[this.currentMode][gameId] = {
            ...this.userData[this.currentMode][gameId],
            ...data
        };
        return this.saveUserData();
    }
    
    updateGameProgress(gameId, key, value) {
        const current = this.getData(gameId) || {};
        current[key] = value;
        return this.setData(gameId, current);
    }
    
    getNickname() {
        const localNickname = localStorage.getItem('floodit_nickname') || 
                              localStorage.getItem('wordsearch_nickname') ||
                              localStorage.getItem('games_nickname');
        return localNickname || '';
    }
    
    setNickname(nickname) {
        localStorage.setItem('games_nickname', nickname);
    }
    
    // Check if cloud is available
    isCloudAvailable() {
        return false; // Mock - will be implemented later
    }
}

// Global instance
const accountManager = new AccountManager();
