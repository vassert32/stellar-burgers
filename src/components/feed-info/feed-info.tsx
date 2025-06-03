import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { loadFeed } from '../../services/slices/slice-feeds';
import { FeedInfoUI } from '../ui/feed-info';
import { TOrder } from '../../utils/types';

const extractOrderNumbers = (items: TOrder[], desiredStatus: string): number[] =>
  items
    .filter((order) => order.status === desiredStatus)
    .map(({ number }) => number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const { list, totalCount, todayCount, isFetching, failReason } = useSelector(
    (state: RootState) => state.feed
  );

  useEffect(() => {
    dispatch(loadFeed());
  }, [dispatch]);

  if (isFetching) {
    return <p className='text text_type_main-default'>Загрузка...</p>;
  }

  if (failReason) {
    return <p className='text text_type_main-default'>Ошибка: {failReason}</p>;
  }

  const doneList = extractOrderNumbers(list, 'done');
  const pendingList = extractOrderNumbers(list, 'pending');
  const info = { totalCount, todayCount };

  return (
    <FeedInfoUI
      readyOrders={doneList}
      pendingOrders={pendingList}
      feed={info}
    />
  );
};