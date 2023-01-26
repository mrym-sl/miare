import React, { useState, useEffect , FunctionComponent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useSelector } from 'react-redux';
import { convertToPersianNumber } from './utils/convertCurrency.ts';
import { ConvertTransType } from './utils/convertTypes.ts';
import { convertDateTimeToShamsi, convertDaysToShamsi, converterToShamsi } from './utils/convertDate.ts';
import { uniqueDay } from './utils/convertDate.ts';

const TransactionDetail: FunctionComponent = () => {
    const allList = useSelector(state => state.transactions);
    const [items, setItems] = useState<any>([]);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [days, setDays] = useState([]);
    const perpage = 4;


    const fetchData = () => {
        const newItems: any = [];
        const pages = Math.ceil(allList.length/perpage);
        let endLength = currentPage*perpage>allList.length ? allList.length : currentPage*perpage;
        for (let i = ((currentPage-1)*perpage); i < endLength; i++) {
            newItems.push(allList[i])
        }
        setDays(uniqueDay(newItems, 'datetime'));

        if (currentPage < pages) {
            setCurrentPage(currentPage + 1)
        } else {
            setHasMore(false)
        }

        if (currentPage === 1 ) setItems([ ...newItems])
        else setItems([...items, ...newItems])

    }

    useEffect(() => {
        fetchData();
    }, [currentPage , allList])

    useEffect(() => {
        setCurrentPage(1);
    }, [allList])

    return (
        <div>
            <InfiniteScroll
                dataLength={20}
                next={fetchData}
                hasMore={hasMore}
                loader={<p>load...</p>}
                endMessage={<p style={{ textAlign: 'center' }}>!</p>}
            >

                {days.map(day => (
                    <>
                        <div className='filtered-day-header' key={day}>
                            <p>{day}</p>
                        </div>
                        {items.map(transaction => (
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
            </InfiniteScroll>
        </div>
    );
}

export default TransactionDetail;