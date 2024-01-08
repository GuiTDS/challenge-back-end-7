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
        photo_1: 'http://github.com/GuiTDS.png',
        photo_2: 'http://github.com/GuiTDS.png',
        meta: 'Teste de meta',
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

  it('Deve não adicionar ao passar "meta" com mais de 160 caracteres', async () => {
    await request(app)
      .post('/destinos')
      .send({
        name: 'teste',
        price: 999,
        photo_1: 'www.test.com.br',
        photo_2: 'www.test.com.br',
        meta: `aaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaaaaaaaaaa
        aaaaaaaaaaaaaa`,
      })
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
