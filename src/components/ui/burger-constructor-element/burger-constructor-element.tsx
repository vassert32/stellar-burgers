import React, { FC, memo } from 'react';
import styles from './burger-constructor-element.module.css';
import { ConstructorElement, MoveButton } from '@zlden/react-developer-burger-ui-components';
import { BurgerConstructorElementUIProps } from './type';

export const BurgerConstructorElementUI: FC<BurgerConstructorElementUIProps> = memo(
  ({
    ingredient,
    index,
    totalItems,
    handleMoveUp,
    handleMoveDown,
    handleClose
  }) => {
    const isFirst = index === 0;
    const isLast = index === totalItems - 1;

    return (
      <li className={`${styles.element} mb-4 mr-2`} data-cy='constructor-item'>
        <MoveButton
          handleMoveUp={handleMoveUp}
          handleMoveDown={handleMoveDown}
          isUpDisabled={isFirst}
          isDownDisabled={isLast}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    );
  }
);