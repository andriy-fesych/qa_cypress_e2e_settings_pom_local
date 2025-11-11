class ArticlePage {
  visitNewArticle() {
    cy.visit('/editor');
  }

  titleInput = () => cy.get('[data-cy=article-title]');
  descriptionInput = () => cy.get('[data-cy=article-description]');
  bodyInput = () => cy.get('[data-cy=article-body]');
  tagInput = () => cy.get('[data-cy=article-tag]');
  publishBtn = () => cy.get('[data-cy=article-publish]');
  editBtn = () =>
    cy.contains('a', 'Edit Article')
      .find('i.ion-edit');
  deleteBtn = () => cy.get('[data-cy=article-delete]').first();

  createArticle({ title, description, body, tag }) {
    this.titleInput().type(title);
    this.descriptionInput().type(description);
    this.bodyInput().type(body);
    if(tag) this.tagInput().type(tag);
    this.publishBtn().click();
    this.publishBtn().click();
  }

  editArticle({ title, description, body }) {
    this.editBtn().click();
    if(title) this.titleInput().clear().type(title);
    if(description) this.descriptionInput().clear().type(description);
    if(body) this.bodyInput().clear().type(body);
    this.publishBtn().click();
  }

  deleteArticle() {
    this.deleteBtn().click();
  }
}

export default ArticlePage;
