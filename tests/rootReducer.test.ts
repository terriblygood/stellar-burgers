import { rootReducer, store } from '../src/services/store';

describe('Тест rootReducer', () => {
  test('Вызов rootReducer(with UNKNOWN_ACTION)', () => {
    const before = store.getState();
    const after = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(after).toEqual(before);
  });
});