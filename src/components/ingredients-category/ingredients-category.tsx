import React, { forwardRef, useMemo } from 'react';
import { useSelector, RootState } from '../../services/store';
import { TIngredientsCategoryProps } from './type';
import { TIngredient } from '../../utils/types';
import { IngredientsCategoryUI } from '../ui/ingredients-category';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const selectedItems = useSelector(
    (state: RootState) => state.constructorBurger
  );

  const countById = useMemo(() => {
    const counts: Record<string, number> = {};

    selectedItems.fillings.forEach((el: TIngredient) => {
      const id = el._id;
      counts[id] = counts[id] ? counts[id] + 1 : 1;
    });

    if (selectedItems.base) {
      counts[selectedItems.base._id] = 2;
    }

    return counts;
  }, [selectedItems]);

  return (
    <IngredientsCategoryUI
      title={title}
      titleRef={titleRef}
      ingredients={ingredients}
      ingredientsCounters={countById}
      ref={ref}
    />
  );
});