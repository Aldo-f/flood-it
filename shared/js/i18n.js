/**
 * i18n - Internationalization module
 * Handles language switching for all games
 */

const i18n = {
    en: {
        // General
        subtitle: "Color the whole board in as few moves as possible",
        nickname_label: "YOUR NAME (3 CHARS)",
        nickname_error: "Enter exactly 3 characters",
        start_game: "START GAME",
        leaderboard: "Leaderboard",
        all: "All",
        moves: "Moves",
        name: "Name",
        new_game: "NEW GAME",
        next_board: "NEXT BOARD",
        play_again: "PLAY AGAIN",
        won: "WON!",
        lost: "LOST",
        too_many_moves: "Too many moves needed",
        challenge_completed: "CHALLENGE COMPLETED!",
        time_up: "TIME'S UP",
        average: "Average",
        moves_count: "moves",
        no_scores: "No scores yet",
        
        // Flood-It specific
        quick_play: "QUICK PLAY",
        challenge: "CHALLENGE",
        challenge_info: "Play 3 boards (10x10, 6 colors). Your score is the average of the 3 boards.",
        difficulty: "Difficulty",
        easy: "Easy",
        hard: "Hard",
        timer_enable: "Enable timer",
        timer: "Timer",
        seconds: "seconds",
        undo: "UNDO",
        hint: "HINT",
        display_mode: "Display",
        colors: "Colors",
        numbers: "Numbers",
        dice: "Dice",
        brightness: "Brightness",
        normal: "Normal",
        high: "High",
        contrast_mode: "Contrast",
        color: "Color",
        bw: "B&W",
        compact: "COMPACT",
        
        // Word Search specific
        word_search: "Word Search",
        wordsearch_subtitle: "Find all the hidden words",
        category: "Category",
        grid_size: "Grid Size",
        daily: "DAILY",
        daily_puzzle: "Daily Puzzle",
        bonus: "BONUS",
        bonus_unlocked: "Bonus Unlocked!",
        bonus_locked: "Complete the week to unlock",
        play: "PLAY",
        back_to_menu: "BACK TO MENU",
        found_words: "Found",
        time: "Time",
        words_remaining: "Words Remaining",
        congratulations: "Congratulations!",
        you_found_all_words: "You found all the words!",
        no_words_found: "No words found",
        categories: {
            animals_nl: "Animals (NL)",
            animals_en: "Animals (EN)",
            food_nl: "Food (NL)",
            food_en: "Food (EN)",
            sports: "Sports",
            latin_insects: "Latin - Insects",
            latin_mushrooms: "Latin - Mushrooms",
            latin_plants: "Latin - Plants",
            random: "Random"
        },
        grid_sizes: {
            small: "Small (8x8)",
            medium: "Medium (10x10)",
            large: "Large (12x12)",
            xlarge: "Extra Large (14x14)"
        },
        days: {
            monday: "Monday",
            tuesday: "Tuesday", 
            wednesday: "Wednesday",
            thursday: "Thursday",
            friday: "Friday",
            saturday: "Saturday",
            sunday: "Sunday"
        },
        week_complete: "Week Complete!",
        start_week: "Start a new week",
        
        // Account
        account: "Account",
        local: "Local",
        cloud: "Cloud",
        coming_soon: "Coming Soon",
        login: "Login",
        logout: "Logout"
    },
    nl: {
        // General
        subtitle: "Kleur het hele bord in zo weinig mogelijk zetten",
        nickname_label: "JOUW NAAM (3 TEKENS)",
        nickname_error: "Voer precies 3 tekens in",
        start_game: "START SPEL",
        leaderboard: "Leaderboard",
        all: "Alle",
        moves: "Zetten",
        name: "Naam",
        new_game: "NIEUW SPEL",
        next_board: "VOLGEND BORD",
        play_again: "OPNIEUW SPELEN",
        won: "GEWONNEN!",
        lost: "VERLOREN",
        too_many_moves: "Teveel zetten nodig",
        challenge_completed: "CHALLENGE GEHAALD!",
        time_up: "TIJD VOORBIJ",
        average: "Gemiddelde",
        moves_count: "zetten",
        no_scores: "Nog geen scores",
        
        // Flood-It specific
        quick_play: "QUICK PLAY",
        challenge: "CHALLENGE",
        challenge_info: "Speel 3 borden (10x10, 6 kleuren). Je score is het gemiddelde van de 3 borden.",
        difficulty: "Moeilijkheid",
        easy: "Easy",
        hard: "Hard",
        timer_enable: "Timer inschakelen",
        timer: "Timer",
        seconds: "seconden",
        undo: "ONGEDAAN",
        hint: "HINT",
        display_mode: "Weergave "Kleuren",
        colors:",
        numbers: "Cijfers",
        dice: "Dobbel",
        brightness: "Helderheid",
        normal: "Normaal",
        high: "Hoog",
        contrast_mode: "Contrast",
        color: "Kleur",
        bw: "Z&W",
        compact: "COMPACT",
        
        // Word Search specific
        word_search: "Woordzoeker",
        wordsearch_subtitle: "Vind alle verborgen woorden",
        category: "Categorie",
        grid_size: "Grid Grootte",
        daily: "DAGELIJKS",
        daily_puzzle: "Dagelijkse Puzzle",
        bonus: "BONUS",
        bonus_unlocked: "Bonus Ontgrendeld!",
        bonus_locked: "Voltooi de week om te ontgrendelen",
        play: "SPELEN",
        back_to_menu: "TERUG NAAR MENU",
        found_words: "Gevonden",
        time: "Tijd",
        words_remaining: "Woorden Over",
        congratulations: "Gefeliciteerd!",
        you_found_all_words: "Je hebt alle woorden gevonden!",
        no_words_found: "Geen woorden gevonden",
        categories: {
            animals_nl: "Dieren (NL)",
            animals_en: "Dieren (EN)",
            food_nl: "Eten (NL)",
            food_en: "Eten (EN)",
            sports: "Sport",
            latin_insects: "Latijn - Insecten",
            latin_mushrooms: "Latijn - Paddenstoelen",
            latin_plants: "Latijn - Planten",
            random: "Willekeurig"
        },
        grid_sizes: {
            small: "Klein (8x8)",
            medium: "Medium (10x10)",
            large: "Groot (12x12)",
            xlarge: "Extra Groot (14x14)"
        },
        days: {
            monday: "Maandag",
            tuesday: "Dinsdag",
            wednesday: "Woensdag",
            thursday: "Donderdag",
            friday: "Vrijdag",
            saturday: "Zaterdag",
            sunday: "Zondag"
        },
        week_complete: "Week Voltooid!",
        start_week: "Start een nieuwe week",
        
        // Account
        account: "Account",
        local: "Lokaal",
        cloud: "Cloud",
        coming_soon: "Binnenkort",
        login: "Inloggen",
        logout: "Uitloggen"
    }
};

class I18n {
    constructor(defaultLang = 'en') {
        this.currentLang = localStorage.getItem('games_lang') || defaultLang;
    }
    
    t(key) {
        const langData = i18n[this.currentLang];
        if (!langData) return key;
        
        // Handle nested keys like "categories.animals_nl"
        if (key.includes('.')) {
            const keys = key.split('.');
            let value = langData;
            for (const k of keys) {
                value = value?.[k];
            }
            return value || key;
        }
        
        return langData[key] || key;
    }
    
    setLanguage(lang) {
        if (i18n[lang]) {
            this.currentLang = lang;
            localStorage.setItem('games_lang', lang);
            this.updateAll();
            return true;
        }
        return false;
    }
    
    getLanguage() {
        return this.currentLang;
    }
    
    updateAll() {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (el.tagName === 'INPUT') {
                el.placeholder = this.t(key + '_placeholder') || '';
            } else {
                el.textContent = this.t(key);
            }
        });
        
        // Dispatch event for custom updates
        window.dispatchEvent(new CustomEvent('i18n-updated', { detail: { lang: this.currentLang } }));
    }
    
    getAvailableLanguages() {
        return Object.keys(i18n);
    }
}

// Create global instance
const i18nInstance = new I18n();

// Helper function
function t(key) {
    return i18nInstance.t(key);
}
