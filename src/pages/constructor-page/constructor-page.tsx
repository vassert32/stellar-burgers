import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { loadIngredients } from '../../services/slices/slice-ingredients';

import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';

export const ConstructorPage: FC = () => {
  const dispatchAction = useDispatch();
  const isLoading = useSelector((state) => state.ingredients.isLoading);
  const fetchError = useSelector((state) => state.ingredients.errorMessage);

  useEffect(() => {
    dispatchAction(loadIngredients());
  }, [dispatchAction]);

  if (fetchError) {
    return <p className='text text_type_main-default'>{fetchError}</p>;
  }

  // Альтернативный рендеринг со спиннером
  // if (isLoading) {
  //   return <Preloader />;
  // }

  return (
    <main className={styles.containerMain}>
      <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
        Соберите бургер
      </h1>
      <div className={`${styles.main} pl-5 pr-5`}>
        <BurgerIngredients />
        <BurgerConstructor />
      </div>
    </main>
  );
};