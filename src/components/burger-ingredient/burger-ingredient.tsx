import { FC, memo, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import {
  insertFilling as addToConstructor,
  assignBun as chooseBun
} from '../../services/slices/slice-constructor';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const dispatch = useDispatch();
    const currentLocation = useLocation();

    const onClick = useCallback(() => {
      if (ingredient.type === 'bun') {
        dispatch(chooseBun(ingredient));
      } else {
        dispatch(addToConstructor(ingredient));
      }
    }, [dispatch, ingredient]);

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: currentLocation }}
        handleAdd={onClick}
      />
    );
  }
);