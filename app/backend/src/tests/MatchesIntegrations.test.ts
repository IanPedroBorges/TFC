import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { mockAllMatchesReturnFalse, mockAllMatchesReturnTrue } from './mocks/mockMatche';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('MatchesIntegrations', () => {
    afterEach(() => {
        sinon.restore();
    });
    it('verificando se a rota /matches retorna todas as partidas', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatchesReturnFalse as any)
        const { status, body } = await chai.request(app).get('/matches');
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    })
    it('verificando se a rota /matches retorna todas as partidas em andamento', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatchesReturnTrue as any)
        const { status, body } = await chai.request(app).get('/matches?inProgress=true');
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    })
    it('verificando se a rota /matches retorna todas as partidas finalizadas', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatchesReturnFalse as any)
        const { status, body } = await chai.request(app).get('/matches?inProgress=false');
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    })
    /* it('verificando se a rota /matches/:id atualiza o status de uma partida para finalizada', async () => {
        sinon.stub(SequelizeMatches, 'update').resolves([1])
        sinon.stub(JWT, 'verify').returns({ id: 1 })
        const { status, body } = await chai.request(app).patch('/matches/1').send({
            Headers: {
                Authorization: 'Bearer token'
            },
            body: {
                homeTeamGoals: 1,
                awayTeamGoals: 1,
            }
        });
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
        expect(body.message).to.be.a('string');
    })
    it('verificando se a rota da error quando id invalido', async () => {
        sinon.stub(SequelizeMatches, 'update').resolves([0])
        const { status, body } = await chai.request(app).patch('/matches/1');
        expect(status).to.equal(401);
        expect(body).to.be.an('object');
        expect(body.message).to.be.a('string');
    }) */
});