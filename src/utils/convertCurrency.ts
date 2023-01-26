export const convertToPersianNumber: (currency: number) => string = (currency) => {
    let persianCurrency = Number(currency).toLocaleString('fa-IR');
    return persianCurrency;
}