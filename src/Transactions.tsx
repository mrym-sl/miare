import React, { FC } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { initial, getConcurrency, getExpenses, getPayments, getTrip, getSearchedTrip } from './redux/store.ts';
import { convertToPersianNumber } from './utils/convertCurrency.ts';
import { converterToShamsi, getDay, uniqueDay, convertDaysToShamsi, convertDateTimeToShamsi } from './utils/convertDate.ts';
import { ConvertTransType } from './utils/convertTypes.ts';



const Transactions: FC = () => {
    const [transactionsList, setTransactionsList] = useState('');
    const [filterKey, setFilterKey] = useState('initial');
    const [searchKey, setSearchKey] = useState('');
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

    useEffect(() => {
        handleSearchDriver();
    }, [searchKey])

    const HandleFilter = () => {
        if (filterKey === 'payments') dispatch(getPayments());
        else if (filterKey === 'concurrency') dispatch(getConcurrency());
        else if (filterKey === 'trip') dispatch(getTrip());
        else if (filterKey === 'expenses') dispatch(getExpenses());
        else dispatch(initial());
    }

    const handleSearchDriver = () => {
        if (filterKey === 'trip') {
            dispatch(getSearchedTrip(searchKey))
        }
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

                    {filterKey === 'trip' && <>
                        <input type='text' className='driver-search-input' value={searchKey} onChange={(e) => setSearchKey(e.target.value)} placeholder='جستجو کنید'/>
                    </>}
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
                                        <p className={transaction.type === 'payment' ? 'text-green' : 'text-red'}>{ConvertTransType(transaction.type)}</p>
                                        {transaction.driver && <p className='text-small'>راننده: {transaction.driver}</p>}
                                        {transaction.hub && transaction.hub.title && <p className='text-small'>شعبه: {transaction.hub.title}</p>}
                                        {transaction.startDate && <p className='text-small'>خرید ظرفیت از تاریخ: {converterToShamsi(transaction.startDate)}
                                            {transaction.endDate && <span> تا تاریخ: {converterToShamsi(transaction.endDate)}</span>}</p>}
                                    </div>
                                    <div className={transaction.amount * (-1) > 0 || transaction.amount === 'رایگان' ? 'text-green' : 'text-red'}>
                                        <p><span>{convertToPersianNumber(transaction.amount * (-1))}</span> تومان</p>
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