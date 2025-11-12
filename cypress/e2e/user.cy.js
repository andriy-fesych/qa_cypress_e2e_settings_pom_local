/// <reference types="cypress" />
/// <reference types="../support" />

import SignInPage from '../support/pages/signIn.pageObject';

const signInPage = new SignInPage();

describe('Follow/unfollow button', () => {
  let userA;
  let userB;

  before(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((u) => userA = u);
    cy.task('generateUser').then((u) => userB = u);
  });

  it('should provide an ability to follow the another user', () => {
    cy.register(userA.email, userA.username, userA.password);
    cy.register(userB.email, userB.username, userB.password);

    signInPage.visit();
    signInPage.typeEmail(userA.email);
    signInPage.typePassword(userA.password);
    signInPage.clickSignInBtn();

    cy.visit(`/profile/${userB.username}`);

    cy.getByDataCy('follow-btn').click();

    cy.getByDataCy('follow-btn')
      .should('contain', 'Unfollow');

    cy.getByDataCy('follow-btn').click();

    cy.getByDataCy('follow-btn')
      .should('contain', 'Follow');
  });
});
