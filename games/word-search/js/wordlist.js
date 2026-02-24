/**
 * Word Search Word Lists
 * Categories and words for the word search game
 */

const WORD_LISTS = {
    // Dutch Animals
    animals_nl: [
        'KAT', 'HOND', 'KONIJN', 'VOGEL', 'VIS', 'LEEUW', 'TIJGER', 'OLIFANT',
        'PAARD', 'KOE', 'SCHAAP', 'GEIT', 'VARKEN', 'EEND', 'GIER', 'KRAAI',
        'MUIS', 'RAT', 'Eekhoorn', 'HAAS', 'VOS', 'WOLF', 'BEER', 'PANDA',
        'GIRAFFE', 'AAP', 'GORILLA', 'CHIMPANSJE', 'DOLFijn', 'WALVIS', 'HAai',
        'KIKKER', 'PAD', 'Slang', 'Hagedis', 'SCHILDPAD', 'KROKODIL', 'IJSBEER',
        'PINGUIN', 'STRUISVOGEL', 'UIL', 'VALK', 'SPERWER', 'REIGER', 'ZWANEN',
        ' flamingo', 'KOLIBRIE', 'MEEUW', 'ALBATROS', 'KIEST', 'KOOKOELOEK'
    ],
    
    // English Animals
    animals_en: [
        'CAT', 'DOG', 'RABBIT', 'BIRD', 'FISH', 'LION', 'TIGER', 'ELEPHANT',
        'HORSE', 'COW', 'SHEEP', 'GOAT', 'PIG', 'DUCK', 'GOOSE', 'CHICKEN',
        'MOUSE', 'RAT', 'SQUIRREL', 'HARE', 'FOX', 'WOLF', 'BEAR', 'PANDA',
        'GIRAFFE', 'MONKEY', 'GORILLA', 'CHIMPANZEE', 'DOLPHIN', 'WHALE', 'SHARK',
        'FROG', 'TOAD', 'SNAKE', 'LIZARD', 'TURTLE', 'CROCODILE', 'POLARBEAR',
        'PENGUIN', 'OSTRICH', 'OWL', 'HAWK', 'FALCON', 'HERON', 'SWAN',
        'FLAMINGO', 'HUMMINGBIRD', 'SEAGULL', 'ALBATROSS', 'KIWI', 'CUCKOO'
    ],
    
    // Dutch Food
    food_nl: [
        'APPEL', 'BANAAN', 'BROOD', 'KAAS', 'EI', 'MELK', 'PIZZA', 'SUSHI',
        'PASTA', 'RIJS', 'AARDAPPEL', 'GROENTE', 'FRUIT', 'TOMAT', 'UI',
        'KNOFLOOK', 'PEEN', 'SELDERIJ', 'BLOEMKOOL', 'BROCCOLI', 'SLAP',
        'KOMKOMMER', 'PAPRIKA', 'CHAMPIGNON', 'NOTEN', 'AMANDEL', 'PISTACHE',
        'CHOCOLADE', 'KOEK', 'TAART', 'IJS', 'CANDY', 'STROOP', 'HONING',
        'JAM', 'BOTER', 'ROOM', 'YOGHURT', 'KWARK', 'VERSE', 'KOFFIE', 'THEE',
        'LIMONADE', 'BIER', 'WIJN', 'SPIRITS'
    ],
    
    // English Food
    food_en: [
        'APPLE', 'BANANA', 'BREAD', 'CHEESE', 'EGG', 'MILK', 'PIZZA', 'SUSHI',
        'PASTA', 'RICE', 'POTATO', 'VEGETABLE', 'FRUIT', 'TOMATO', 'ONION',
        'GARLIC', 'CARROT', 'CELERY', 'BROCCOLI', 'LETTUCE', 'CUCUMBER',
        'PEPPER', 'MUSHROOM', 'NUT', 'ALMOND', 'PISTACHIO', 'CHOCOLATE',
        'COOKIE', 'CAKE', 'ICE', 'CREAM', 'CANDY', 'SYRUP', 'HONEY',
        'JAM', 'BUTTER', 'CREAM', 'YOGURT', 'QUARK', 'FRESH', 'COFFEE', 'TEA',
        'LEMONADE', 'BEER', 'WINE', 'VODKA', 'WHISKEY'
    ],
    
    // Sports (Dutch/English mix)
    sports: [
        'VOETBAL', 'TENNIS', 'HOCKEY', 'ZWEMMEN', 'FIETSEN', 'GOLF', 'RUGBY',
        'BASKETBAL', 'VOLLEYBAL', 'HONKBAL', 'CRICKET', 'ATLETIEK', 'SCHAATSEN',
        'SKI', 'SNOWBOARD', 'SURFEN', 'ZEILEN', 'KANO', 'ROEIJEN', 'BERGKLIMMEN',
        'VOETBAL', 'TENNIS', 'HOCKEY', 'SWIMMING', 'CYCLING', 'GOLF', 'RUGBY',
        'BASKETBALL', 'VOLLEYBALL', 'BASEBALL', 'CRICKET', 'ATHLETICS',
        'SKATING', 'SKIING', 'SURFING', 'SAILING', 'CANOEING', 'ROWING',
        'ROCKCLIMBING', 'MARATHON', 'TRIATHLON', 'BOXING', 'JUDO', 'KARATE',
        'TAEKWONDO', 'WRESTLING', 'FENCING', 'ARCHERY', 'SHOOTING', 'SQUASH'
    ],
    
    // Latin - Insects
    latin_insects: [
        'APIS', 'FORMICA', 'COCCINELLA', 'LEPIDOPTERA', 'DROSOPHILA', 'TENEBRIO',
        'LOCUSTA', 'GRYLLUS', 'MANTIS', 'PHASMA', 'BOMBUS', 'XYLOCOPA',
        'VESPA', 'PAPILIO', 'VANESSA', 'LYMANTRIA', 'ATTACUS', 'SATURNIA',
        'SPHINX', 'MACROGLOSSA', 'ARCTIA', 'CALLIMORPHA', 'ZYGAENA', 'NEREIS'
    ],
    
    // Latin - Mushrooms
    latin_mushrooms: [
        'AMANITA', 'BOLETUS', 'PSILOCYBE', 'AGARICUS', 'PLEUROTUS', 'LACTARIUS',
        'RUSSULA', 'CANTHARELLUS', 'TRICHOLOMA', 'AGROCYBE', 'CORDYCEP',
        'GANODERMA', 'POLYPORUS', 'FOMES', 'INONOTUS', 'PHELLINUS', 'LAETIPORUS',
        'HERICIUM', 'CLAVARIA', 'GEASTER', 'LYCOPERDON', 'GEASTER', 'MUTINUS'
    ],
    
    // Latin - Plants
    latin_plants: [
        'QUERCUS', 'ACER', 'ROSA', 'TULIPA', 'NARCISSUS', 'CROCUS', 'LILIUM',
        'SOLANUM', 'LACTUCA', 'BRASSICA', 'RAPHANUS', 'BETA', 'SPINACIA',
        'MENTHA', 'SALVIA', 'ROSMARINUS', 'THYMUS', 'OCIMUM', 'PETROSELINUM',
        'ANETHUM', 'CORIANDRUM', 'LAURUS', 'CINNAMOMUM', 'PIPER', 'ZINGIBER'
    ]
};

/**
 * Get words for a specific category
 * @param {string} category - Category name
 * @param {number} count - Number of words to return
 * @returns {string[]} - Array of words
 */
function getWordsForCategory(category, count = 10) {
    const list = WORD_LISTS[category];
    if (!list) return [];
    
    // Shuffle and return requested count
    const shuffled = [...list].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
}

/**
 * Get all available categories
 * @returns {object} - Categories with metadata
 */
function getCategories() {
    return {
        animals_nl: { name: 'animals_nl', nameNl: 'Dieren (NL)', nameEn: 'Animals (NL)', lang: 'nl' },
        animals_en: { name: 'animals_en', nameNl: 'Dieren (EN)', nameEn: 'Animals (EN)', lang: 'en' },
        food_nl: { name: 'food_nl', nameNl: 'Eten (NL)', nameEn: 'Food (NL)', lang: 'nl' },
        food_en: { name: 'food_en', nameNl: 'Eten (EN)', nameEn: 'Food (EN)', lang: 'en' },
        sports: { name: 'sports', nameNl: 'Sport', nameEn: 'Sports', lang: 'mix' },
        latin_insects: { name: 'latin_insects', nameNl: 'Latijn - Insecten', nameEn: 'Latin - Insects', lang: 'la' },
        latin_mushrooms: { name: 'latin_mushrooms', nameNl: 'Latijn - Paddenstoelen', nameEn: 'Latin - Mushrooms', lang: 'la' },
        latin_plants: { name: 'latin_plants', nameNl: 'Latijn - Planten', nameEn: 'Latin - Plants', lang: 'la' }
    };
}

/**
 * Get words for daily puzzle based on date and day of week
 * @param {Date} date - The date
 * @returns {object} - Category and words
 */
function getDailyWords(date) {
    const dayOfWeek = date.getDay();
    
    // Day-based category mapping
    const dayCategories = {
        0: 'latin_plants',    // Sunday - Latin Plants
        1: 'animals_nl',     // Monday - Dutch Animals
        2: 'food_nl',        // Tuesday - Dutch Food
        3: 'animals_en',     // Wednesday - English Animals
        4: 'sports',         // Thursday - Sports
        5: 'food_en',        // Friday - English Food
        6: 'latin_mushrooms' // Saturday - Latin Mushrooms
    };
    
    const category = dayCategories[dayOfWeek] || 'animals_nl';
    const count = dayOfWeek === 0 ? 8 : 6; // Sunday = bonus = more words
    
    return {
        category,
        words: getWordsForCategory(category, count),
        dayOfWeek
    };
}

// Export
if (typeof window !== 'undefined') {
    window.WORD_LISTS = WORD_LISTS;
    window.getWordsForCategory = getWordsForCategory;
    window.getCategories = getCategories;
    window.getDailyWords = getDailyWords;
}
