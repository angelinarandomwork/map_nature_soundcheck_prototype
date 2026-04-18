
export const getAverageNdsiScore = (ndsiScores: Array<number>): number | null => {
    if (ndsiScores.length === 0) return null;

    return (
        ndsiScores.reduce((runningTotal, value) => runningTotal + value, 0) /
        ndsiScores.length
    );
};