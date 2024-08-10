import { fetchFeeds, feedsInitialState } from '../src/services/slices';
import reducer from '../src/services/slices/feedsSlice';

const feedsMockData = {
  orders: [],
  total: 1,
  totalToday: 1
};

describe('Тест feeds', () => {
  describe('async func ленты заказов(fetchFeeds)', () => {
    test('fetchFeeds.pending', () => {
      const state = reducer(feedsInitialState, fetchFeeds.pending('pending'));
      expect(state.isLoading).toBeTruthy();
      expect(state.error).toBeNull();
    });

    test('Результат(fetchFeeds.fulfilled)', () => {
      const state = reducer( feedsInitialState, fetchFeeds.fulfilled(feedsMockData, 'fulfilled'));
      expect(state.isLoading).toBeFalsy();
      expect(state.error).toBeNull();
      expect(state.data).toEqual(feedsMockData);
    });

    test('Ошибка запроса: fetchFeeds.rejected', () => {
      const error = 'fetchFeeds.rejected';
      const state = reducer(
        feedsInitialState,
        fetchFeeds.rejected(new Error(error), 'rejected')
      );
      expect(state.isLoading).toBeFalsy();
      expect(state.error?.message).toEqual(error);
    });
  });
});