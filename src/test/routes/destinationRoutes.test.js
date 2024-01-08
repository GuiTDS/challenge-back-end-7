/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
import request from 'supertest';
import app from '../../app.js';

let server;
beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /destinos', () => {
  it('Deve retornar os destinos', async () => {
    const resposta = await request(app)
      .get('/destinos')
      .expect('content-type', /json/)
      .expect(200);
  });

  it('Deve retornar o destino especificado', async () => {
    const resposta = await request(app)
      .get('/destinos?name=Disney')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].name).toEqual('Disney');
  });
});

let idResposta;
describe('POST em /destinos', () => {
  it('Deve adicionar um novo destino', async () => {
    const resposta = await request(app)
      .post('/destinos')
      .send({
        name: 'Teste',
        price: 999,
        photo: 'http://github.com/GuiTDS.png',
      })
      .expect(201);
    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body.newDestination._id;
  });

  it('Deve não adicionar ao passar body vazio', async () => {
    await request(app)
      .post('/destinos')
      .send({})
      .expect(400);
  });

  it('Deve não adicionar ao passar body com informações faltantes', async () => {
    await request(app)
      .post('/destinos')
      .send({ name: 'teste' })
      .expect(400);
  });
});

describe('PUT em /destinos', () => {
  it('Deve atualizar recurso', async () => {
    const resposta = await request(app)
      .put(`/destinos/${idResposta}`)
      .send({
        name: 'Teste atualizado',
      })
      .expect(200);
    expect(resposta.body.updatedDestination.name).toEqual('Teste atualizado');
  });
});

describe('DELETE em /destinos', () => {
  it('Deve deletar recurso adicionado', async () => {
    await request(app)
      .delete(`/destinos/${idResposta}`)
      .expect(200);
  });
});
