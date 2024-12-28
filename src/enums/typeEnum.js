const getTypeText = (type) => {
    switch (type) {
        case 0: return 'STR';
        case 1: return 'SKL';
        case 2: return 'SPD';
        case 3: return 'PSY';
        case 4: return 'WIT';
        default: return 'Unknown';
    }
};

export default getTypeText;