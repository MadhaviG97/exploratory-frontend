// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
<<<<<<< HEAD
import "cypress-localstorage-commands"
Cypress.Commands.add('login', () => { 
    cy.request({
      method: 'POST',
      url: 'http://localhost:8888/login',
      body: {
         
          email: 'damika2@gmail.com',
          password: '123456',
        
      } 
    })
    .then((resp) => {
      cy.setLocalStorage("token", resp.body.token);
    })
  
  })
=======

Cypress.Commands.add(
  "uploadFile",
  { prevSubject: true },
  (subject, fileName, fileType = "") => {
    cy.fixture(fileName, "binary").then((content) => {
      return Cypress.Blob.binaryStringToBlob(content, fileType).then((blob) => {
        const el = subject[0];
        const testFile = new File([blob], fileName, { type: fileType });
        const dataTransfer = new DataTransfer();

        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        cy.wrap(subject).trigger("change", { force: true });
      });
    });
  }
);
>>>>>>> madhavi2