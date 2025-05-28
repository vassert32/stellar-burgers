import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector as useAppSelector, useDispatch as useAppDispatch } from '@store';
import { getOrdersSelector as selectOrders, getOrdersThunk as fetchOrders } from '@slices';

export const ProfileOrders: FC = () => {
  const send = useAppDispatch();
  const orderList: TOrder[] = useAppSelector(selectOrders);

  useEffect(() => {
    send(fetchOrders());
  }, [send]);

  return <ProfileOrdersUI orders={orderList} />;
};
