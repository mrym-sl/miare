
export interface PaymentsArray {
    id:number
    datetime:string
    amount : number
    description
  }
  
export interface ConcurrencyArray {
    id:number
    created_at:string
    amount : number
    start_date : string
    end_date : string
  }

    
export interface ExpensesArray {
    id:number
    created_at:string
    amount : number
    title : string
}


export interface TripArray {
    id:number
    request_datetime:string
    driver:string
    final_price : number
    source_title:string
    hub : Hub
}

interface Hub {
    id:number
    title:string
}