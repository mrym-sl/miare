import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initial, getConcurrency, getExpenses, getPayments, getTrip } from './redux/store.ts';
import { converterToShamsi, getDay, uniqueDay, convertDaysToShamsi, convertDateTimeToShamsi } from './utils/convertDate.ts';
import { ConvertTransType } from './utils/convertTypes.ts';



const Transactions: FC = () => {
    const [transactionsList, setTransactionsList] = useState('');
    const [filterKey, setFilterKey] = useState('initial');
    const list = useSelector(state => state.transactions);
    const [days, setDays] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initial());
    }, [])

    useEffect(() => {
        HandleFilter();
    }, [filterKey])

    useEffect(() => {
        setDays(uniqueDay(list, 'datetime'))
    }, [list])

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

            {days.map(day => (
                <>
                    <div className='filtered-day-header' key={day}>
                        <p>{day}</p>
                    </div>
                    {list.map(transaction => (
                        <>
                            {convertDaysToShamsi(transaction.datetime) === day && (
                                <div className='flex-container trans-card' key={transaction.id}>
                                    <div>
                                        <p>{convertDateTimeToShamsi(transaction.datetime)}</p>
                                        <p>{ConvertTransType(transaction.type)}</p>
                                    </div>
                                    <div className='filter-trans'>
                                        <p><span>{transaction.amount}</span>تومان</p>
                                    </div>
                                </div>
                            )}
                        </>
                    ))}
                </>
            ))}

        </>
    );
}

export default Transactions;