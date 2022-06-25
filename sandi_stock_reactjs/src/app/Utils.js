export const utils = {
    prettyDate
};

function prettyDate(date) {
    const formated = new Date(date)

    return formated.getUTCDate() + '/' + formated.getUTCMonth() 
    + '/' + formated.getUTCFullYear() + ' ' + formated.getHours() + ':' + formated.getMinutes()
}