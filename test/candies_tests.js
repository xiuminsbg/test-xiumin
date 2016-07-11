/* globals describe it before */
const expect = require('chai').expect;
const supertest = require('supertest');
const app = require('../app');
const api = supertest('http://localhost:3000');

describe('GET /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an array', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body).to.be.an('array');
        done();
      });
  });
  it('should return all the records in the database', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body.length).to.equal(4);
        done();
      });
  });
});

describe('GET /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  it('should return an object containing the fields "name" and "color"', (done) => {
    api.get('/candies/1')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body).to.have.property('name');
        expect(response.body).to.have.property('color');
        done();
      });
  });
});

describe('POST /candies', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  before((done) => {
    api.post('/candies')
      .set('Accept', 'application/json')
      .send({
        'id': 5,
        'name': 'lollipop',
        'color': 'Red'
      }).end(done);
  });
  it('should add a new candy to the database', (done) => {
    api.get('/candies')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        // expect(response.body.length).to.equal.(5);
        expect(response.body[response.body.length - 1].name).to.equal('lollipop');
        done();
      });
  });
});

describe('PUT /candies/:id', () => {
  it('should return a 200 response', (done) => {
    api.get('/candies/2')
      .set('Accept', 'application/json')
      .expect(200, done);
  });
  // before((done) => {
  //   api.post('/candies/2')
  //     .set('Accept', 'application/json')
  //     .send({
  //       'id': 2,
  //       'name': 'smarties',
  //       'color': 'variety'
  //     }).end(done);
  // });
  it('should update a candy document', (done) => {
    api.put('/candies/2')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body.message).to.equal('updated');
        done();
      });
  });
});

describe('DELETE /candies/:id', () => {
  it('should remove a candy document', (done) => {
    api.delete('/candies/1')
      .set('Accept', 'application/json')
      .end((error, response) => {
        expect(error).to.be.a('null');
        expect(response.body.message).to.equal('deleted');
        done();
      });
  });
});
