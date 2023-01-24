import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initial, getConcurrency, getExpenses, getPayments, getTrip } from './redux/store.ts';



const Transactions: FC = () => {
    const [transactionsList, setTransactionsList] = useState('');
    const [filterKey, setFilterKey] = useState('initial');
    const list = useSelector(state => state.transactions)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initial())
        alert('hii')
    }, [])

    useEffect(() => {
        HandleFilter();
    }, [filterKey])

    const HandleFilter = () => {
        if (filterKey === 'payments') dispatch(getPayments());
        else if (filterKey === 'concurrency') dispatch(getConcurrency());
        else if (filterKey === 'trip') dispatch(getTrip());
        else if (filterKey === 'expenses') dispatch(getExpenses());
        else dispatch(initial());
    }

    return (
        <>
            <div className='flex-container'>
                <div>
                    <p>تمام تراکنش ها</p>
                </div>
                <div className='filter-trans'>
                    <p>نوع تراکنش</p>
                    <select onChange={(e) => setFilterKey(e.target.value)}>
                        <option value='initial'>همه</option>
                        <option value='concurrency'>خرید ظرفیت همزمان</option>
                        <option value='payments'>شارژ حساب</option>
                        <option value='trip'>هزینه سفر</option>
                        <option value='expenses'>خسارت</option>
                    </select>
                </div>
            </div>

            {list.map(trans => (
                <div className='flex-container'>
                    <div>
                    {trans.request_datetime?(
                        <>
                        <p></p>
                        <p>هزینه سفر</p>
                        </>
                    ):(trans.datetime?(
                        <>
                        <p></p>
                        <p>شارژ حساب</p>
                        </>
                    ):(trans.created_at?(
                        <>
                        <p></p>
                        <p>خسارت</p>
                        </>
                    ):(trans.start_date?(
                        <>
                        <p></p>
                        <p>خرید ظرفیت همزمان</p>
                        </>
                    ):null)))}
                    </div>
                    <div className='filter-trans'>
                        <p> تومان</p>
                    </div>
                </div>
            ))}
        </>
    );
}

export default Transactions;