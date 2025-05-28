import { FC, memo } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';

import { useDispatch } from '@store';
import { addIngredient } from '@slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const currentLocation = useLocation();
    const triggerDispatch = useDispatch();

    const onAddClick = () => {
      triggerDispatch(addIngredient(ingredient));
    };

    return (
      <BurgerIngredientUI
        ingredient={ingredient}
        count={count}
        locationState={{ background: currentLocation }}
        handleAdd={onAddClick}
      />
    );
  }
);
