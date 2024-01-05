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

describe('GET em /depoimentos', () => {
  it('Deve retornar os depoimentos', async () => {
    const resposta = await request(app)
      .get('/depoimentos')
      .expect('content-type', /json/)
      .expect(200);

    expect(resposta.body[0].name).toEqual('Guilherme Teixeira Domingues Sanches');
  });
});

describe('GET em /depoimentos-home', () => {
  it('Deve retornar três depoimentos', async () => {
    const resposta = await request(app)
      .get('/depoimentos-home')
      .expect('content-type', /json/)
      .expect(200);
    expect(resposta.body.length).toBe(3);
  });
});

let idResposta;
describe('POST em /depoimentos', () => {
  it('Deve adicionar um novo depoimento', async () => {
    const resposta = await request(app)
      .post('/depoimentos')
      .send({
        name: 'Teste',
        deposition: 'depoimento teste',
        photo: 'http://github.com/GuiTDS.png',
      })
      .expect(201);
    // eslint-disable-next-line no-underscore-dangle
    idResposta = resposta.body.newDeposition._id;
  });

  it('Deve não adicionar ao passar body vazio', async () => {
    await request(app)
      .post('/depoimentos')
      .send({})
      .expect(400);
  });

  it('Deve não adicionar ao passar body com informações faltantes', async () => {
    await request(app)
      .post('/depoimentos')
      .send({ name: 'teste' })
      .expect(400);
  });
});

describe('PUT em /depoimentos', () => {
  it('Deve atualizar recurso', async () => {
    const resposta = await request(app)
      .put(`/depoimentos/${idResposta}`)
      .send({
        name: 'Teste atualizado',
      })
      .expect(200);
    expect(resposta.body.updatedDeposition.name).toEqual('Teste atualizado');
  });
});

describe('DELETE em /depoimentos', () => {
  it('Deve deletar recurso adicionado', async () => {
    await request(app)
      .delete(`/depoimentos/${idResposta}`)
      .expect(200);
  });
});
