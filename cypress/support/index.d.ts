declare namespace Cypress {
  interface Chainable<Subject> {
    addNewIngredient(title: string): Chainable<Subject>;
  }
}