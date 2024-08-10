import { FC } from 'react';
import { useLocation } from 'react-router-dom';

import { BurgerIngredientUI } from '@ui';
import { TBurgerIngredientProps } from './type';
import { useDispatch } from '../../services/store';
import { addIngredient, setBun } from '../../services/slices';

export const BurgerIngredient: FC<TBurgerIngredientProps> = ({
  ingredient,
  count
}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const handleAdd = () => {
    if (ingredient.type === 'bun') {
      dispatch(setBun(ingredient));
    } else {
      dispatch(addIngredient(ingredient));
    }
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={handleAdd}
    />
  );
};
