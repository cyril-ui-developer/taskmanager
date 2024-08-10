export const toSentenceCase = str => str.slice(0, 1).toUpperCase() + str.slice(1);

export const formatToDateString = (hireDate) =>
    new Date(hireDate).toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' });