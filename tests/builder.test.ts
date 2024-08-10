import {
    setBun,
    addIngredient,
    removeIngredient,
    moveIngredient,
    resetConstructor,
    constructorInitialState
  } from '../src/services/slices';
  import reducer from '../src/services/slices/builderSlice';
  
  const bunMockData = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0
  };
  
  const ingredientMockData1 = {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '1234567890',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  };
  
  const ingredientMockData2 = {
    _id: '643d69a5c3f7b9001cfa093e',
    id: '0987654321',
    name: 'Филе Люминесцентного тетраодонтимформа',
    type: 'main',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/meat-03.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-03-large.png',
    __v: 0
  };
  
  describe('Тест builder', () => {
    describe('Работа с булками', () => {
      test('Установка булки(setBun)', () => {
        const state = reducer(constructorInitialState, setBun(bunMockData));
        expect(state.bun).toEqual(bunMockData);
        expect(state.ingredients).toHaveLength(0);
      });
  
      test('Установка булки(addIngredient)', () => {
        const state = reducer(
          constructorInitialState,
          addIngredient(bunMockData)
        );
  
        const updatedObject = { ...state.bun } as Record<string, any>;
        delete updatedObject['id'];
        expect(updatedObject).toEqual(bunMockData);
        expect(state.ingredients).toHaveLength(0);
      });
    });
  
    describe('Работа с ингридиентами', () => {
      test('Добавление ингредиента', () => {
        const state = reducer(
          constructorInitialState,
          addIngredient(ingredientMockData1)
        );
        expect(state.ingredients).toHaveLength(1);
        const updatedObject = { ...state.ingredients[0] } as Record<string, any>;
        delete updatedObject['id'];
        const initialObject = { ...ingredientMockData1 } as Record<string, any>;
        delete initialObject['id'];
        expect(updatedObject).toEqual(initialObject);
        expect(state.bun).toBeNull();
      });
  
      test('Удаление ингредиента', () => {
        const _initialState = {
          bun: null,
          ingredients: [ingredientMockData1, ingredientMockData2]
        };
  
        const state = reducer(
          _initialState,
          removeIngredient(ingredientMockData1.id)
        );
        expect(state.ingredients).toHaveLength(1);
        expect(state.ingredients[0]).toEqual(ingredientMockData2);
        expect(state.bun).toBeNull();
      });
  
      describe('Передвижение ингредиентов', () => {
        test('Вниз', () => {
          const _initialState = {
            bun: null,
            ingredients: [ingredientMockData1, ingredientMockData2]
          };
  
          const state = reducer(
            _initialState,
            moveIngredient({ index: 0, upwards: false })
          );
  
          expect(state.ingredients).toHaveLength(2);
          expect(state.ingredients[0]).toEqual(ingredientMockData2);
          expect(state.ingredients[1]).toEqual(ingredientMockData1);
          expect(state.bun).toBeNull();
        });
  
        test('Вверх', () => {
          const _initialState = {
            bun: null,
            ingredients: [ingredientMockData1, ingredientMockData2]
          };
  
          const state = reducer(
            _initialState,
            moveIngredient({ index: 1, upwards: true })
          );
  
          
          expect(state.ingredients).toHaveLength(2);
          expect(state.ingredients[0]).toEqual(ingredientMockData2);
          expect(state.ingredients[1]).toEqual(ingredientMockData1);
          expect(state.bun).toBeNull();
        });
      });
    });
  
    test('Очистка', () => {
      const _initialState = {
        bun: bunMockData,
        ingredients: [ingredientMockData1, ingredientMockData2]
      };
  
      const state = reducer(_initialState, resetConstructor());
      expect(state.ingredients).toHaveLength(0);
      expect(state.bun).toBeNull();
    });
  });