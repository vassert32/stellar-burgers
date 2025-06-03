import React, { FC, useCallback, useMemo } from 'react';
import store, {
  useDispatch,
  useSelector,
  RootState
} from '../../services/store';
import { TConstructorIngredient } from '../../utils/types';
import { BurgerConstructorUI } from '../ui/burger-constructor';
import { submitOrder, resetCurrentOrder } from '../../services/slices/slice-orders';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { base, fillings } = useSelector((state) => state.constructorBurger);
  const isOrderLoading = useSelector((state) => state.orders.isLoading);
  const orderInfo = useSelector((state) => state.orders.current);
  const isAuthenticated = useSelector((state: RootState) => state.user.data);

  console.log('constructor state:', store.getState().constructorBurger);

  const calculateTotal = useMemo(() => {
    const baseA = base ? base.price * 2 : 0;
    const fillingsA = fillings.reduce((sum, item) => sum + item.price, 0);
    return baseA + fillingsA;
  }, [base, fillings]);

  const handleOrder = useCallback(() => {
    if (!base || isOrderLoading) return;

    if (!isAuthenticated) {
      navigate('/login', { replace: true });
      return;
    }

    const ingredientIDs = [base._id, ...fillings.map(i => i._id), base._id];
    dispatch(submitOrder(ingredientIDs));
  }, [base, fillings, isOrderLoading, isAuthenticated, dispatch, navigate]);

  const handleModalClose = useCallback(() => {
    dispatch(resetCurrentOrder());
  }, [dispatch]);

  return (
    <BurgerConstructorUI
      price={calculateTotal}
      orderRequest={isOrderLoading}
      constructorItems={{
        bun: base ?? null,
        ingredients: fillings ?? []
      }}
      orderModalData={orderInfo}
      onOrderClick={handleOrder}
      closeOrderModal={handleModalClose}
    />
  );
};