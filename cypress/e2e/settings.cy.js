import SettingsPage from '../support/pages/settings.pageObject';
import SignInPage from '../support/pages/signIn.pageObject';
import HomePage from '../support/pages/home.pageObject';
import { faker } from '@faker-js/faker';

/// <reference types="cypress" />
/// <reference types="../support" />

describe('Settings page', () => {
  before(() => {
    cy.task('db:clear');
    cy.task('generateUser').then((generated) => {
      user = generated;
    });
  });

  beforeEach(() => {
    cy.register(user.email, user.username, user.password);

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(user.password);
    signInPage.clickSignInBtn();

    settingsPage.visit();
  });

  it('should provide an ability to update username', () => {
    const newUsername = 'updated_' + user.username;

    settingsPage.updateUsername(newUsername);

    homePage.assertHeaderContainUsername(newUsername);
  });

  it('should provide an ability to update bio', () => {
    const newBio = 'Test bio text';

    settingsPage.updateBio(newBio);

    cy.visit(`/@${user.username}`);
    cy.contains(newBio).should('be.visible');
  });

  it('should provide an ability to update an email', () => {
    const newEmail = 'updated_' + user.email;

    settingsPage.updateEmail(newEmail);

    cy.contains('Your Settings');
  });

  it('should provide an ability to update password', () => {
    const newPass = faker.internet.password(12, true);

    settingsPage.updatePassword(newPass);

    settingsPage.logout();

    signInPage.visit();
    signInPage.typeEmail(user.email);
    signInPage.typePassword(newPass);
    signInPage.clickSignInBtn();

    homePage.assertHeaderContainUsername(user.username);
  });

  it('should provide an ability to log out', () => {
    settingsPage.logout();
    signInPage.assertSignInVisible();
  });
});
