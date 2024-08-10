import { fetchOrder, fetchOrders, createOrder, resetOrderModalData, ordersInitialState } from '../src/services/slices';
  
  import reducer from '../src/services/slices/ordersSlice';
  
  const ordersMock = [
    {
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      _id: '6622337897ede0001d0666b5',
      status: 'done',
      name: 'EXAMPLE_NAME',
      createdAt: '2024-04-19T09:03:52.748Z',
      updatedAt: '2024-04-19T09:03:58.057Z',
      number: 38321
    }
  ];
  
  describe('Тест orders', () => {
    test('Сброс содержимого', () => {
      const _initialState = {
        isOrderLoading: true,
        isOrdersLoading: true,
        orderRequest: false,
        orderModalData: ordersMock[0],
        error: null,
        data: []
      };
  
      const state = reducer(_initialState, resetOrderModalData());
  
      expect(state.orderModalData).toBeNull();
      expect(state.data).toHaveLength(0);
      expect(state.error).toBeNull();
      expect(state.orderRequest).toBeFalsy();
      expect(state.isOrdersLoading).toBeTruthy();
      expect(state.isOrderLoading).toBeTruthy();
    });
  
    describe('async func получения заказов(fetchOrders)', () => {
      test('fetchOrders.pending', () => {
        const state = reducer(ordersInitialState, fetchOrders.pending('pending'));
  
        expect(state.isOrdersLoading).toBeTruthy();
        expect(state.error).toBeNull();
      });
  
      test('Результат запроса: fetchOrders.fulfilled', () => {
        const state = reducer(
          ordersInitialState,
          fetchOrders.fulfilled(ordersMock, 'fulfilled')
        );
        expect(state.isOrdersLoading).toBeFalsy();
        expect(state.error).toBeNull();
        expect(state.data).toEqual(ordersMock);
      });
  
      test('Ошибка запроса: fetchOrders.rejected', () => {
        const error = 'fetchOrders.rejected';
  
        const state = reducer(
          ordersInitialState,
          fetchOrders.rejected(new Error(error), 'rejected')
        );
  
        expect(state.isOrdersLoading).toBeFalsy();
        expect(state.error?.message).toEqual(error);
      });
    });
  
    describe('async func получения заказа по номеру(fetchOrder)', () => {
      test('fetchOrder.pending', () => {
        const state = reducer(
          ordersInitialState,
          fetchOrder.pending('pending', ordersMock[0].number)
        );
  
        expect(state.isOrderLoading).toBeTruthy();
      });
  
      test('Результат запроса: fetchOrder.fulfilled', () => {
        const state = reducer(
          ordersInitialState,
          fetchOrder.fulfilled( ordersMock[0], 'fulfilled', ordersMock[0].number)
        );
  
        expect(state.isOrderLoading).toBeFalsy();
        expect(state.orderModalData).toEqual(ordersMock[0]);
      });
  
      test('Ошибка запроса: fetchOrder.rejected', () => {
        const error = 'fetchOrder.rejected';
        const state = reducer(
          ordersInitialState,
          fetchOrder.rejected(new Error(error), 'rejected', -1)
        );
  
        expect(state.isOrderLoading).toBeFalsy();
      });
    });
  
    describe('async func создания заказа(createOrder)', () => {
      test('createOrder.pending', () => {
        const state = reducer(
          ordersInitialState,
          createOrder.pending('pending', ordersMock[0].ingredients)
        );
  
        expect(state.orderRequest).toBeTruthy();
      });
  
      test('Результат запроса: createOrder.fulfilled', () => {
        const state = reducer(
          ordersInitialState,
          createOrder.fulfilled(
            { order: ordersMock[0], name: 'EXAMPLE' },
            'fulfilled',
            ordersMock[0].ingredients
          )
        );
  
        expect(state.orderRequest).toBeFalsy();
        expect(state.orderModalData).toEqual(ordersMock[0]);
      });
  
      test('Ошибка запроса: createOrder.rejected', () => {
        const error = 'createOrder.rejected';
        const state = reducer(
          ordersInitialState,
          createOrder.rejected(new Error(error), 'rejected', [])
        );
        expect(state.orderRequest).toBeFalsy();
      });
    });
  });