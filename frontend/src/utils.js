export const toSentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

export const formatToDateString = (date) => {
    const [month, day, year] = new Date(date).toDateString().split(' ');
    const twoDigitYear = year.slice(-2);
    return `${month} ${day}, ${twoDigitYear}`;
}