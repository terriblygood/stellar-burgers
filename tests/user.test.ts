import { fetchUser, updateUser, register, login, logout, userInitialState } from '../src/services/slices';
import reducer from '../src/services/slices/userSlice';
  
  const userMock = {
    email: 'example@example.mail',
    name: 'Example'
  };
  
  const registerMock = {
    email: 'example@example.mail',
    name: 'Example',
    password: 'Example'
  };
  
  const loginMock = {
    email: 'example@example.mail',
    password: 'Example'
  };
  
  describe('Тест userReducer', () => {
    describe('async func регистрации(register)', () => {
      test('register.pending', () => {
        const state = reducer(
          userInitialState,
          register.pending('pending', registerMock)
        );
  
        expect(state.registerError).toBeUndefined();
      });
  
      test('Результат запроса: register.fulfilled', () => {
        const state = reducer(
          userInitialState,
          register.fulfilled(userMock, 'fulfilled', registerMock)
        );
        expect(state.isAuthenticated).toBeTruthy();
        expect(state.registerError).toBeUndefined();
        expect(state.data).toEqual(userMock);
      });
  
      test('Ошибка запроса: register.rejected', () => {
        const error = 'register.rejected';
        const state = reducer(
          userInitialState,
          register.rejected(new Error(error), 'rejected', registerMock)
        );
        expect(state.registerError?.message).toEqual(error);
      });
    });
  
    describe('async func входа в аккаунт(login)', () => {
      test('login.pending', () => {
        const state = reducer(
          userInitialState,
          login.pending('pending', loginMock)
        );
        expect(state.loginError).toBeUndefined();
      });
  
      test('Результат запроса: login.fulfilled', () => {
        const state = reducer(
          userInitialState,
          login.fulfilled(userMock, 'fulfilled', loginMock)
        );
        expect(state.isAuthenticated).toBeTruthy();
        expect(state.loginError).toBeUndefined();
        expect(state.data).toEqual(userMock);
      });
  
      test('Ошибка запроса: login.rejected', () => {
        const error = 'login.rejected';
        const state = reducer(
          userInitialState,
          login.rejected(new Error(error), 'rejected', loginMock)
        );
        expect(state.loginError?.message).toEqual(error);
      });
    });
  
    describe('async func выхода из аккаунта(logout)', () => {
      test('Результат запроса: logout.fulfilled', () => {
        const state = reducer(
          userInitialState,
          logout.fulfilled(undefined, 'fulfilled')
        );
  
        expect(state.isAuthenticated).toBeFalsy();
        expect(state.data).toEqual({
          email: '',
          name: ''
        });
      });
    });
  
    describe('async func проверки авторизации usera(fetchUser)', () => {
      test('Результат запроса: fetchUser.fulfilled', () => {
        const state = reducer(
          userInitialState,
          fetchUser.fulfilled(userMock, 'fulfilled')
        );
        expect(state.isAuthenticated).toBeTruthy();
        expect(state.isAuthChecked).toBeTruthy();
        expect(state.data).toEqual(userMock);
      });
  
      test('Ошибка запроса: fetchUser.rejected', () => {
        const error = 'fetchUser.rejected';
        const state = reducer(
          userInitialState,
          fetchUser.rejected(new Error(error), 'rejected')
        );
        expect(state.isAuthenticated).toBeFalsy();
        expect(state.isAuthChecked).toBeTruthy();
      });
    });
  
    describe('async func редактирования(update) информации пользователя(updateUser)', () => {
      test('updateUser.fulfilled', () => {
        const state = reducer(
          userInitialState,
          updateUser.fulfilled(userMock, 'fulfilled', userMock)
        );
  
        expect(state.data).toEqual(userMock);
    });
});
});