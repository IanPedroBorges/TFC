import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';
import TeamsModel from '../models/TeamsModel';
import { mockTeamsGet } from './mocks/mocksTeams';

chai.use(chaiHttp);

const aaaa = new TeamsModel();

const { expect } = chai;

describe('Seu teste', () => {
  afterEach(() => sinon.restore());

    it.only('Deve retornar um array de objetos', async () => {
        sinon.stub(aaaa, 'findAll').resolves([{ id: 1, name: 'Team 1' }] as any);
        const { status, body } = await chai.request(app).get('/teams');
    
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    });
    it('Deve retornar um error 500', async () => {
        sinon.stub(SequelizeTeams, 'findAll').throws();
        const { status, body } = await chai.request(app).get('/teams');
        
        expect(status).to.equal(500);
        expect(body).to.be.an('object');
        expect(body.date).to.have.property('message');
    });
    it('Deve retorna um erro na Service ao acessar o getAll', async () => {
        const model = new TeamsModel();
        sinon.stub(model, 'findAll').resolves(undefined);
        const { status, body } = await chai.request(app).get('/teams');
        expect(status).to.equal(500);
        expect(body).to.be.an('object');
        expect(body.date).to.have.property('message');
    });
    it('Deve retornar um objeto', async () => {
        sinon.stub(SequelizeTeams, 'findByPk').resolves(mockTeamsGet as any);
        const { status, body } = await chai.request(app).get('/teams/1');
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
    });
    it('Deve retornar um error 404', async () => {
        sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
        const { status, body } = await chai.request(app).get('/teams/1');
        expect(status).to.equal(404);
        expect(body).to.be.an('object');
        expect(body.date).to.have.property('message');
    });
    it('Deve retornar um error 404 pela service no FindOne', async () => {
        const model = new TeamsModel();
        sinon.stub(model, 'findById').resolves(undefined);
        const { status, body } = await chai.request(app).get('/teams/1');
        expect(status).to.equal(404);
        expect(body).to.be.an('object');
        expect(body.date).to.have.property('message');
    })
});
