import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste rota /teams', () => {
  beforeEach(() => sinon.restore());

    it('Deve retornar um array de objetos', async () => {
        sinon.stub(SequelizeTeams, 'findAll').resolves([{dataValues:{ id: 1, name: 'Team 1' }}] as any);
        const { status, body } = await chai.request(app).get('/teams');
    
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    });
    it('Deve retornar um objeto', async () => {
        sinon.stub(SequelizeTeams, 'findByPk').resolves({dataValues: {id: 1, name: 'Team 1'}} as any);
        const { status, body } = await chai.request(app).get('/teams/1');
        console.log(body)
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
    });
    it('Deve retornar um error 404', async () => {
        sinon.stub(SequelizeTeams, 'findByPk').resolves(null);
        const { status, body } = await chai.request(app).get('/teams/1');
        expect(status).to.equal(404);
        expect(body).to.be.an('object');
    });
});
