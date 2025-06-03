import { FC, useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient, TOrder } from '@utils-types';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { loadOrderByNumber } from '../../services/slices/slice-orders';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);
  const availableIngredients = useSelector(
    (state: RootState) => state.ingredients.data
  );

  useEffect(() => {
    dispatch(loadOrderByNumber(Number(number)))
      .unwrap()
      .then((orders) => {
        setSelectedOrder(orders[0] || null);
      })
      .catch((error) => {
        console.error('Не удалось получить заказ:', error);
      });
  }, [dispatch, number]);

  const preparedData = useMemo(() => {
    if (!selectedOrder || availableIngredients.length === 0) return null;

    const composedDate = new Date(selectedOrder.createdAt);

    const counted: Record<string, TIngredient & { count: number }> = {};

    for (const id of selectedOrder.ingredients) {
      if (!counted[id]) {
        const found = availableIngredients.find((i) => i._id === id);
        if (found) {
          counted[id] = { ...found, count: 1 };
        }
      } else {
        counted[id].count += 1;
      }
    }

    const totalPrice = Object.values(counted).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...selectedOrder,
      ingredientsInfo: counted,
      date: composedDate,
      total: totalPrice
    };
  }, [selectedOrder, availableIngredients]);

  if (!preparedData) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={preparedData} />;
};