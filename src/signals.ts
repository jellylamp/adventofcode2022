export class Signals {
    static getFirstFourUniqueIndex(input): number {
        for (let i = 0; i < input.length; i++) {
            const stringToCheck = input.substring(i, i + 4);
            if (Signals.isUnique(stringToCheck)) {
                return i + 4;
            }
        }
        return 0;
    }

    static getFirstFourteenUniqueIndex(input): number {
        for (let i = 0; i < input.length; i++) {
            const stringToCheck = input.substring(i, i + 14);
            if (Signals.isUnique(stringToCheck)) {
                return i + 14;
            }
        }
        return 0;
    }

    static isUnique(stringToCheck) {
        return new Set(stringToCheck).size == stringToCheck.length;
    }
}