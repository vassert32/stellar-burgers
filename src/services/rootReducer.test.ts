import { expect, describe, test } from '@jest/globals';
import { rootReducer } from '@store';
import {
  userInitialState,
  feedInitialState,
  orderInitialState,
  ingredientsInitialState,
  constructorInitialState
} from '@slices';

const deepCopy = <T,>(obj: T): T => JSON.parse(JSON.stringify(obj));

describe('Корневой редьюсер — базовое состояние', () => {
  test('возвращает корректное начальное состояние при неизвестном действии', () => {
    const dummyAction = { type: 'SOME_RANDOM_ACTION_TYPE' };

    const stateAfter = rootReducer(undefined, dummyAction);

    const expectedState = {
      user: deepCopy(userInitialState),
      feed: deepCopy(feedInitialState),
      order: deepCopy(orderInitialState),
      ingredients: deepCopy(ingredientsInitialState),
      constructorbg: deepCopy(constructorInitialState)
    };

    expect(stateAfter).toEqual(expectedState);
  });
});
