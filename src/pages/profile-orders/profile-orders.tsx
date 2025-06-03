// src/pages/profile-orders/profile-orders.tsx
import { FC, useEffect } from 'react';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { Preloader } from '../../components/ui/preloader/preloader';
import { loadOrders } from '../../services/slices/slice-orders';
import { loadIngredients } from '../../services/slices/slice-ingredients';
import { ProfileOrdersUI } from '@ui-pages';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  const orderData = useSelector((state: RootState) => state.orders);
  const { orders: orderList, isLoading: isLoading, errorMessage: fetchError } = orderData;

  useEffect(() => {
    dispatch(loadIngredients());
    dispatch(loadIngredients()); // можно убрать, если не нужен
  }, [dispatch]);

  if (isLoading || orderList.length === 0) {
    return <Preloader />;
  }

  if (fetchError) {
    return (
      <p className='text text_type_main-default'>
        Ошибка загрузки заказов: {fetchError}
      </p>
    );
  }

  return <ProfileOrdersUI orders={orderList} />;
};