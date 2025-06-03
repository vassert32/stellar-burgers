import { FC, memo, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { OrderCardProps } from './type';
import { TIngredient } from '@utils-types';
import { OrderCardUI } from '../ui/order-card';
import { RootState, useSelector } from '../../services/store';

const INGREDIENT_LIMIT = 6;

export const OrderCard: FC<OrderCardProps> = memo(({ order }) => {
  const location = useLocation();
  const allIngredients = useSelector(
    (state: RootState) => state.ingredients.data
  );

  const cardData = useMemo(() => {
    if (allIngredients.length === 0) return null;

    const detailedIngredients = order.ingredients
      .map((id) => allIngredients.find((i) => i._id === id))
      .filter((item): item is TIngredient => Boolean(item));

    const totalPrice = detailedIngredients.reduce((sum, i) => sum + i.price, 0);

    const shownIngredients = detailedIngredients.slice(0, INGREDIENT_LIMIT);
    const hiddenCount =
      detailedIngredients.length > INGREDIENT_LIMIT
        ? detailedIngredients.length - INGREDIENT_LIMIT
        : 0;

    return {
      ...order,
      ingredientsInfo: detailedIngredients,
      ingredientsToShow: shownIngredients,
      remains: hiddenCount,
      total: totalPrice,
      date: new Date(order.createdAt)
    };
  }, [order, allIngredients]);

  if (!cardData) return null;

  return (
    <OrderCardUI
      orderInfo={cardData}
      maxIngredients={INGREDIENT_LIMIT}
      locationState={{ background: location }}
    />
  );
});