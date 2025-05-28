import styles from './constructor-page.module.css';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { Preloader } from '@ui';
import { FC } from 'react';
import { useSelector as useAppSelector } from '@store';
import { getIngredientsStateSelector as selectIngredientsState } from '@slices';

export const ConstructorPage: FC = () => {
  const { isLoading: loadingIngredients } = useAppSelector(selectIngredientsState);

  return (
    <>
      {loadingIngredients ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
