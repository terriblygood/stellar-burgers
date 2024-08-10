import * as orderFixture from '../fixtures/order.json';

describe('Интеграционный тест всего конструктора', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients' });
    cy.visit('/');
  });

  it('Список достуипных ингредиентов', () => {
    cy.get('[data-ingredient="bun"]').should('have.length.at.least', 1);
    cy.get('[data-ingredient="main"],[data-ingredient="sauce"]').should(
      'have.length.at.least',
      1
    );
  });

  describe('Проверка modal', () => {
    describe('check modal openning', () => {
      it(' открытие по карточке ингредиента', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals').children().should('have.length', 2);
      });

      it('Модальное окно с ингредиентом будет открыто после перезагрузки страницы', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.reload(true);
        cy.get('#modals').children().should('have.length', 2);
      });
    });

    describe('Check modal open closing', () => {
      it('клик на крестик', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals button:first-of-type').click();
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Клик на оверлей', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('#modals>div:nth-of-type(2)').click({ force: true });
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
      });

      it('Нажатие на Escape', () => {
        cy.get('[data-ingredient="bun"]:first-of-type').click();
        cy.get('body').type('{esc}');
        cy.wait(500);
        cy.get('#modals').children().should('have.length', 0);
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
      cy.get('[data-ingredient="bun"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.disabled');
      cy.get('[data-ingredient="main"]:first-of-type button').click();
      cy.get('[data-order-button]').should('be.enabled');
      cy.get('[data-order-button]').click();
      cy.get('#modals').children().should('have.length', 2);
      cy.get('#modals h2:first-of-type').should(
        'have.text',
        orderFixture.order.number
      );
      cy.get('[data-order-button]').should('be.disabled');
    });

    afterEach(() => { //очистка
      cy.clearCookie('accessToken');
      localStorage.removeItem('refreshToken');
    });
  });
});