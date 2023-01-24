import { createSlice, configureStore } from '@reduxjs/toolkit';
import data from '../asset/data.json';

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
       state.transactions = [...data.concurrency_costs, ...data.misc_expenses, ...data.payments, ...data.trip_financials]
    },
    getPayments: (state) => {
      //  state.transactions = [...data.payments]
    },
    getExpenses: (state) => {
       state.transactions = [...data.misc_expenses]
    },
    getTrip: (state) => {
      state.transactions = [...data.trip_financials];
      
    },
    getConcurrency: (state) => {
      state.transactions = [...data.concurrency_costs]
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