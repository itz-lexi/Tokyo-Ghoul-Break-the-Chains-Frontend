const getRarityText = (rarity) => {
    switch (rarity) {
        case 0: return 'R';
        case 1: return 'SR';
        case 2: return 'SSR';
        default: return 'Unknown';
    }
};

export default getRarityText;