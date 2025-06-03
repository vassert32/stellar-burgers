import { setCookie, deleteCookie } from '../../src/utils/cookie';

const API_URL = 'https://norma.nomoreparties.space/api';

describe('UI-тестирование конструктора', () => {
  beforeEach(() => {
    setCookie('accessToken', 'Bearer fake.token.for.test');
    localStorage.setItem('refreshToken', 'fake-refresh-token-123');

    cy.intercept('GET', `${API_URL}/auth/user`, { fixture: 'user.json' }).as('getUser');
    cy.intercept('GET', `${API_URL}/ingredients`, { fixture: 'ingredients.json' }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('корректное добавление ингредиентов в конструктор', () => {
    cy.get('[data-cy="burger-constructor"]').as('area');

    cy.get('[data-cy="Булки"]').find('button').first().click();
    cy.get('[data-cy="Начинки"]').find('button').first().click();

    cy.get('@area').should(function ($el) {
      const text = $el.text();
      expect(text).to.include('Флюоресцентная булка R2-D3 (верх)');
      expect(text).to.include('Мини-салат Экзо-Плантаго');
      expect(text).to.include('Флюоресцентная булка R2-D3 (низ)');
    });
  });

  it('отображение и скрытие окна с информацией об ингредиенте', () => {
    cy.get('[data-cy="item"]').contains('Краторная булка N-200i').click();
    cy.get('[data-cy="modal"]')
      .should('be.visible')
      .and('contain', 'Краторная булка N-200i');

    cy.get('[data-cy="modal-on-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    cy.get('[data-cy="item"]').contains('Краторная булка N-200i').click();
    cy.get('[data-cy="overlay-modal"]').click({ force: true });
    cy.get('[data-cy="modal"]').should('not.exist');
  });

  it('оформление заказа и отображение модального окна с номером заказа', () => {
    cy.intercept('POST', `${API_URL}/orders`, { fixture: 'order.json' }).as('submitOrder');

    cy.get('[data-cy="Булки"]').find('button').first().click();
    cy.get('[data-cy="Начинки"]').find('button').first().click();

    cy.get('[data-cy="burger-constructor"]').find('button').contains('Оформить заказ').click({ force: true });

    cy.wait('@submitOrder');

    cy.get('[data-cy="modal"]').as('confirmationModal').should('exist');
    cy.get('@confirmationModal').invoke('text').should('contain', '99234');

    cy.get('[data-cy="modal-on-close"]').click();
    cy.get('@confirmationModal').should('not.exist');

    cy.get('[data-cy="burger-constructor"]')
      .should(($el) => {
        const text = $el.text();
        expect(text).not.to.include('Краторная булка N-200i');
        expect(text).not.to.include('Говяжий метеорит (отбивная)');
      });
  });
});