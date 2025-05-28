import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from '@store';
import { getFeedThunk as fetchFeedData, getOrdersSelector as selectOrders } from '@slices';

export const Feed: FC = () => {
  const send = useAppDispatch();
  const orderItems: TOrder[] = useAppSelector(selectOrders);

  const loadFeed = () => {
    send(fetchFeedData());
  };

  useEffect(() => {
    loadFeed();
  }, [send]);

  if (!orderItems.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orderItems} handleGetFeeds={loadFeed} />;
};
