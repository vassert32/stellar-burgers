import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { loadIngredients } from '../../services/slices/slice-ingredients';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';

export const IngredientDetails: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { data: ingredients, isLoading, errorMessage } = useSelector(
    (state: RootState) => state.ingredients
  );

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients.length]);

  if (isLoading || ingredients.length === 0) {
    return <Preloader />;
  }

  if (errorMessage) {
    return <p className='text text_type_main-default'>Ошибка: {errorMessage}</p>;
  }

  const selectedIngredient = ingredients.find((el) => el._id === id);

  if (!selectedIngredient) {
    return <p className='text text_type_main-default'>Ингредиент не найден</p>;
  }

  return <IngredientDetailsUI ingredientData={selectedIngredient} />;
};