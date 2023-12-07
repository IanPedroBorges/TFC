import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { mockAllMatchesReturnFalse, mockAllMatchesReturnTrue } from './mocks/mockMatche';

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
});