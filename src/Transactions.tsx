import React, { FunctionComponent } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch } from "react-redux";
import TransactionDetail from './TransactionDetail.tsx';
import { initial, getConcurrency, getExpenses, getPayments, getTrip, getSearchedTrip } from './redux/store.ts';


const Transactions: FunctionComponent = () => {
    const [filterKey, setFilterKey] = useState('initial');
    const [searchKey, setSearchKey] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(initial());
    }, [])

    useEffect(() => {
        HandleFilter();
    }, [filterKey])


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
            <div className='flex-container transaction-nav'>
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

            <TransactionDetail/>
        </>
    );
}

export default Transactions;