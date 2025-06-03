import { FC, memo, useCallback } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  (props) => {
    const { ingredient, index, totalItems } = props;

    const onMoveUp = useCallback(() => {
      // TODO: implement move up
    }, []);

    const onMoveDown = useCallback(() => {
      // TODO: implement move down
    }, []);

    const onRemove = useCallback(() => {
      // TODO: implement remove
    }, []);

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={onMoveUp}
        handleMoveDown={onMoveDown}
        handleClose={onRemove}
      />
    );
  }
);