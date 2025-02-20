import { environment } from '../../src/environments/environment';

beforeEach(() => {
  cy.visit(`${environment.domainFront}/login`);
});
// Deberiamos incluir las purebas de registro tambien aca?
describe('Register test', () => {
  it('Open register page', () => {
    cy.contains('Registrarse').click();
    cy.url().should('include', '/register');
  });

  it('Register user', () => {
    cy.contains('Registrarse').click();
    cy.get('#exampleInputText1').type('Test User');
    cy.get('#exampleInputEmail1').type('maile2e@gmail.com');
    cy.get('#exampleInputPassword1').type('password1234');

    cy.get('.btn-primary').contains('Registrarse').click();

    cy.url().should('include', '/login');

    //toca borra el usuario creado despues de la prueba
  });
});

describe('login and delete tests', () => {
  it('Login user', () => {
    cy.get('#exampleInputEmail1').type('maile2e@gmail.com');
    cy.get('#exampleInputPassword1').type('password1234');

    cy.get('.btn-primary').contains('Iniciar sesion').click();
    //Validar que la url sea la correcta
    cy.url().should('include', '/dashboard');
    //Validar que la cookie exista
    cy.getCookie('access_token').should('exist');
    cy.get('.btn-primary').contains('Editar Usuario').click();
    cy.url().should('include', '/edit');
    cy.get('.btn-danger').click();
    cy.url().should('include', '/home');
  });

  it('Login admin', () => {
    cy.get('#exampleInputEmail1').type('madmin@gmail.com');
    cy.get('#exampleInputPassword1').type('adminroot');

    cy.get('.btn-primary').contains('Iniciar sesion').click();
    //Validar que la url sea la correcta
    cy.url().should('include', '/adminDashboard');
    //Validar que la cookie exista
    cy.getCookie('access_admin_token').should('exist');
  });

  it('Login wrong credentials', () => {
    cy.get('#exampleInputEmail1').type('mailIncorrecto@gmail.com');
    cy.get('#exampleInputPassword1').type('passwordIncorrecto');

    cy.get('.btn-primary').contains('Iniciar sesion').click();

    cy.url().should('include', '/login');
  });

  it('Login empty fields', () => {
    cy.get('.btn-primary').contains('Iniciar sesion').click();

    cy.contains('El email es requerido.');
    cy.contains('La Contraseña es requerida.');
  });

  it('Login invalid credentials format', () => {
    cy.get('#exampleInputEmail1').type('mailIncorrecto');
    cy.get('#exampleInputPassword1').type('pass');

    cy.get('.btn-primary').contains('Iniciar sesion').click();

    cy.contains('El formato no es correcto.');
    cy.contains(
      'La Contraseña debe tener una longitud minima de 8 caracteres.'
    );
  });
});
