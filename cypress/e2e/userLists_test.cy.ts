import { environment } from '../../src/environments/environment';

beforeEach(() => {
  //El usuario debe estar logueado para interactuar con sus listas
  cy.visit(`${environment.domainFront}/login`);
  cy.get('#exampleInputEmail1').type('test_user_1902302378@testuser.com');
  cy.get('#exampleInputPassword1').type('12341234');

  cy.get('.btn-primary').contains('Iniciar sesion').click();
  //Validar que la url sea la correcta
  cy.url().should('include', '/dashboard');
  //Validar que la cookie exista
  cy.getCookie('access_token').should('exist');
});

describe('User lists tests', () => {
  it('Should create a list', () => {
    cy.get('.btn-primary').contains('Crear Lista').click();
    cy.get('#nameList').type('Test list');
    cy.get('#descriptionList').type('Test description');
    cy.get('#movieSearch').type('The Godfather');
    cy.get('.add-film-btn').click();
    //Seleccionamos una pelicula de prueba
    cy.get('.movie-card').contains('The Godfather Part II').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Lista creada exitosamente!');
    });
    cy.get('.save-btn').click();
  });

  it('Shouldn´t create an invalid list', () => {
    cy.get('.btn-primary').contains('Crear Lista').click();
    cy.get('.save-btn').click();
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Una lista debe contener nombre y descripción.');
    });
  });
  it('Should show the created list', () => {
    cy.get('.btn-primary').contains('Ver Listas').click();
    cy.get('.list-item').contains('Test list');
  });

  it('Should edit the list', () => {
    cy.get('.btn-primary').contains('Ver Listas').click();
    // Verifica que hay listas disponibles
    cy.get('.list-item').should('have.length.greaterThan', 0);

    // Hacer clic en el botón "Editar Lista" del primer elemento
    cy.get('.list-item')
      .first() // Selecciona el primer elemento de la lista
      .find('.edit-button') // Busca el botón dentro del elemento
      .click();

    // Verifica que el formulario de edición esté presente
    cy.get('.list-edit-container').should('exist');

    cy.get('#listName').clear().type('Test list edited');
    cy.get('#listDescription').clear().type('Test description edited');
    cy.get('#movieSearch').type('Venom');
    cy.get('.search-movie-btn').click();

    cy.get('.movies-search-results').should('have.length.greaterThan', 0);
    cy.wait(1000); // Espera 1 segundo para asegurar que los resultados se carguen
    cy.get('.movies-search-results').first().click();
    cy.get('.save-button').click();

    cy.get('.list-item').contains('Test list edited');
  });

  it('Shouldn´t edit an invalid list', () => {
    cy.get('.btn-primary').contains('Ver Listas').click();
    // Verifica que hay listas disponibles
    cy.get('.list-item').should('have.length.greaterThan', 0);

    // Hacer clic en el botón "Editar Lista" del primer elemento
    cy.get('.list-item')
      .first() // Selecciona el primer elemento de la lista
      .find('.edit-button') // Busca el botón dentro del elemento
      .click();

    // Verifica que el formulario de edición esté presente
    cy.get('.list-edit-container').should('exist');

    cy.get('#listName').clear();
    cy.get('#listDescription').clear();
    cy.get('.save-button').click();

    cy.on('window:alert', (str) => {
      expect(str).to.equal('Una lista debe contener nombre y descripción.');
    });
  });

  it('Should delete the list', () => {
    cy.get('.btn-primary').contains('Ver Listas').click();
    // Verifica que hay listas disponibles
    cy.get('.list-item').should('have.length.greaterThan', 0);

    // Hacer clic en el botón "Editar Lista" del primer elemento
    cy.get('.list-item')
      .first() // Selecciona el primer elemento de la lista
      .find('.edit-button') // Busca el botón dentro del elemento
      .click();

    cy.get('.delete-button').click();
    cy.get('.list-item').should('have.length.lessThan', 1);
    cy.contains('El usuario no posee listas').should('exist');
  });
});
