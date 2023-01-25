import { createSlice, configureStore } from '@reduxjs/toolkit';
import data from '../asset/data.json';
import { filteringConcurrency, filteringPayment , filteringExpenses, filteringTrip} from './filteringData.ts';
import { PaymentsArray } from './interfaces';

// interface TransState {
//   id?: number
//   trip_id?: number
//   request_datetime?: string
//   driver?: string
//   final_price?: number
//   source_title?: string
//   hub?: {
//     id: number
//     title: string
//   }
//   datetime?: string
//   amount?: number
//   description?
//   title?: string
//   created_at?: string
//   start_date?: string
//   end_date?: string
// }

// const initialState = {
//   trans : <TransState>
// }

const TranactionsSlice = createSlice({
  name: 'transactions',
  initialState: {
    transactions: [
      {}
    ]
},
  reducers: {
    initial: state => {
       state.transactions = [...filteringPayment([...data.payments]), ...filteringExpenses([...data.misc_expenses]), ...filteringTrip([...data.trip_financials]), ...filteringConcurrency([...data.concurrency_costs])].
       sort((a, b) =>  new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      },
    getPayments: (state) => {
       state.transactions = filteringPayment([...data.payments]).
       sort((a, b) =>  new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      },
    getExpenses: (state) => {
       state.transactions = filteringExpenses([...data.misc_expenses]).
       sort((a, b) =>  new Date(b.datetime).getTime() - new Date(a.datetime).getTime())

    },
    getTrip: (state) => {
      state.transactions = filteringTrip([...data.trip_financials]).
      sort((a, b) =>  new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
    },
    getConcurrency: (state) => {
      state.transactions = filteringConcurrency([...data.concurrency_costs]).
      sort((a, b) =>  new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
    },
  }
})


export const { initial, getConcurrency, getExpenses, getPayments, getTrip } = TranactionsSlice.actions;
export default TranactionsSlice.reducer


export const store = configureStore({
  reducer: TranactionsSlice.reducer
})

store.subscribe(() => console.log(store.getState()))

store.dispatch(initial())