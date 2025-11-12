/// <reference types="cypress" />
/// <reference types="../support" />

import SettingsPage from '../support/pages/settings.pageObject';
import SignUpPage from '../support/pages/signUp.pageObject';
import { faker } from '@faker-js/faker';

const settingsPage = new SettingsPage();
const signUpPage = new SignUpPage();

describe('Sign Up page', () => {
  let user;

  beforeEach(() => {
    cy.task('db:clear');

    cy.task('generateUser').then((generated) => {
      user = generated;
    });
  });

  it('should register a new user successfully', () => {
    signUpPage.visit();

    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    cy.contains(user.username).should('exist');
  });

  it('should show error when email already exists', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    settingsPage.visit();
    settingsPage.logout();

    const user2 = {
      username: faker.internet.userName().toLowerCase(),
      email: user.email,
      password: 'Test12345!'
    };

    signUpPage.visit();
    signUpPage.typeUsername(user2.username);
    signUpPage.typeEmail(user2.email);
    signUpPage.typePassword(user2.password);
    signUpPage.clickSignUpBtn();

    cy.contains('This email is taken.').should('exist');
  });

  it('should show error when username already exists', () => {
    signUpPage.visit();
    signUpPage.typeUsername(user.username);
    signUpPage.typeEmail(user.email);
    signUpPage.typePassword(user.password);
    signUpPage.clickSignUpBtn();

    const user2 = {
      username: user.username,
      email: faker.internet.email().toLowerCase(),
      password: 'Test12345!'
    };

    signUpPage.visit();
    signUpPage.typeUsername(user2.username);
    signUpPage.typeEmail(user2.email);
    signUpPage.typePassword(user2.password);
    signUpPage.clickSignUpBtn();

    cy.contains('This username is taken.').should('exist');
  });
});
