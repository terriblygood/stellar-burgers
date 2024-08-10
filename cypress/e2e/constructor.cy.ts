import * as orderFixture from '../fixtures/order.json';

describe('Интеграционный тест всего конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список доступных ингредиентов', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка modal', () => {
    describe('check modal opening', () => {
      it('открытие по карточке ингредиента', () => {
        cy.get('#modals').children().should('have.length', 0); // Проверка отсутствия модального окна
        cy.get('[data-ingredient="bun"]:first-of-type').click(); // Выполнение действия
        cy.get('#modals').children().should('have.length', 2); // Проверка появления модального окна
      });

      it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
        cy.get('#modals').children().should('have.length', 0); // Проверка отсутствия модального окна
        cy.get('[data-ingredient="bun"]:first-of-type').click(); // Выполнение действия
        cy.reload(true); // Перезагрузка страницы
        cy.get('#modals').children().should('have.length', 2); // Проверка появления модального окна
      });
    });

    describe('Check modal open closing', () => {
      it('клик на крестик', () => {
        cy.get('#modals').children().should('have.length', 0); // Проверка отсутствия модального окна
        cy.get('[data-ingredient="bun"]:first-of-type').click(); // Выполнение действия
        cy.get('#modals button:first-of-type').click(); // Клик на крестик
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0); // Проверка закрытия модального окна
      });

      it('Клик на оверлей', () => {
        cy.get('#modals').children().should('have.length', 0); // Проверка отсутствия модального окна
        cy.get('[data-ingredient="bun"]:first-of-type').click(); // Выполнение действия
        cy.get('#modals>div:nth-of-type(2)').click({ force: true }); // Клик на оверлей
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0); // Проверка закрытия модального окна
      });

      it('Нажатие на Escape', () => {
        cy.get('#modals').children().should('have.length', 0); // Проверка отсутствия модального окна
        cy.get('[data-ingredient="bun"]:first-of-type').click(); // Выполнение действия
        cy.get('body').type('{esc}'); // Нажатие клавиши Escape
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0); // Проверка закрытия модального окна
      });
    });
  });

  describe('Процесс оформления заказа', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'EXAMPLE_ACCESS_TOKEN');
      localStorage.setItem('refreshToken', 'EXAMPLE_REFRESH_TOKEN');
      cy.intercept('GET', 'api/auth/user', { fixture: 'user' });
      cy.intercept('POST', 'api/orders', { fixture: 'order' });
      cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
      cy.visit('/');
    });

    it('Базовая процедура оформления (авторизация пройдена)', () => {
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('#modals').children().should('have.length', 0); // Проверка отсутствия модального окна
      cy.get('[data-ingredient="bun"]:first-of-type button').click(); // Добавление булки
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="main"]:first-of-type button').click(); // Добавление начинки
      cy.get('[data-order-button]').should('be.enabled');
      cy.get('[data-order-button]').click(); // Оформление заказа
      cy.get('#modals').children().should('have.length', 2); // Проверка появления модального окна с номером заказа
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );
      cy.get('[data-order-button]').should('be.disabled');
    });

    afterEach(() => { // Очистка
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});