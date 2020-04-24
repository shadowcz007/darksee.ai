'use strict'

// Factory returning a function that converts a value string to n-grams.

const nGram = (n) => {
    if (typeof n !== 'number' || isNaN(n) || n < 1 || n === Infinity) {
        throw new Error('`' + n + '` is not a valid argument for n-gram');
    };

    // Create n-grams from a given value.
    let grams = (value) => {
        let nGrams = [];
        let index;
        if (value === null || value === undefined) {
            return nGrams;
        };
        value = value.slice ? value : String(value);
        index = value.length - n + 1;
        if (index < 1) {
            return nGrams;
        };
        while (index--) {
            nGrams[index] = value.slice(index, index + n);
        };
        return nGrams;
    };

    return grams;

};

nGram.bigram = nGram(2);
nGram.trigram = nGram(3);

module.exports = nGram;