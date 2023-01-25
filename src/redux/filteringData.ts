import { ConcurrencyArray, ExpensesArray, PaymentsArray, TripArray } from "./interfaces";

export const filteringConcurrency = (anArray: ConcurrencyArray[]) => {
    return anArray.map(field => ({
        id: field.id,
        datetime: field.created_at,
        type: 'concurrency',
        amount: field.amount,
        startDate: field.start_date,
        endDate: field.end_date

    }))
}

export const filteringPayment = (oldArray: PaymentsArray[]) => {
    const newArray = oldArray.map(field => ({
        id: field.id,
        datetime: field.datetime,
        type: 'payment',
        amount: field.amount
    }))
    return newArray;
}


export const filteringExpenses = (anArray: ExpensesArray[]) => {
    return anArray.map(field => ({
        id: field.id,
        datetime: field.created_at,
        type: 'expenses',
        amount: field.amount,
        title: field.title
    }))
}


export const filteringTrip = (anArray: TripArray[]) => {
    return anArray.map(field => ({
        id: field.id,
        datetime: field.request_datetime,
        type: 'trip',
        amount: field.final_price,
        driver: field.driver,
        sourceTitle: field.source_title,
        hub: field.hub,
    }))
}