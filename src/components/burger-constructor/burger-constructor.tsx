import { FC, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { BurgerConstructorUI } from '@ui';
import { TConstructorIngredient } from '@utils-types';
import {
  sendOrderThunk,
  setOrderRequest,
  setNullOrderModalData,
  getConstructorSelector,
  isAuthorizedSelector
} from '@slices';

export const BurgerConstructor: FC = () => {
  const router = useNavigate();
  const dispatchAction = useDispatch();

  const {
    constructorItems: selectedItems,
    orderModalData: orderInfo,
    orderRequest: isRequestInProgress
  } = useSelector(getConstructorSelector);

  const userHasAccess = useSelector(isAuthorizedSelector);

  const handleOrder = () => {
    if (!selectedItems.bun) return;

    if (!userHasAccess) {
      router('/login');
      return;
    }

    dispatchAction(setOrderRequest(true));

    const bunId = selectedItems.bun._id;
    const payload = [bunId, ...selectedItems.ingredients.map(i => i._id), bunId];

    dispatchAction(sendOrderThunk(payload));
  };

  const dismissModal = () => {
    dispatchAction(setOrderRequest(false));
    dispatchAction(setNullOrderModalData());
  };

  const totalPrice = useMemo(() => {
    const bunTotal = selectedItems.bun ? selectedItems.bun.price * 2 : 0;
    const ingredientsSum = selectedItems.ingredients.reduce(
      (sum, ingredient) => sum + ingredient.price,
      0
    );
    return bunTotal + ingredientsSum;
  }, [selectedItems]);

  return (
    <BurgerConstructorUI
      price={totalPrice}
      orderRequest={isRequestInProgress}
      constructorItems={selectedItems}
      orderModalData={orderInfo}
      onOrderClick={handleOrder}
      closeOrderModal={dismissModal}
    />
  );
};
