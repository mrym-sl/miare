export const converterToShamsi = (dateTime) => {
    return new Date(dateTime).toLocaleDateString('fa-IR');
}

export const convertDaysToShamsi = (dateTime) => {
    const faDate = new Intl.DateTimeFormat("fa", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    }).format(new Date(dateTime));
    return faDate;
}

export const convertDateTimeToShamsi = (dateTime) => {
    const fadate = new Intl.DateTimeFormat("fa", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    }).format(new Date(dateTime))
    return fadate;
}

export const getDay = (dateTime) => {
    let date = new Date(dateTime).toLocaleDateString('fa-IR');
    return date.substring(date.split('/', 2).join('/').length + 1);
}


export const uniqueDay = (anArray, prop) => {
    return [...new Set(anArray.map(item => convertDaysToShamsi(item[prop])))];
}
