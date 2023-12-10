import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { mockAllMatchesReturnFalse, mockAllMatchesReturnTrue } from './mocks/mockMatche';
import JWT from '../utils/JWT';
import { describe } from 'mocha';

chai.use(chaiHttp);

const { expect } = chai;

describe('LeaderboardIntegrations', () => {
    afterEach(() => {
        sinon.restore();
    })
    it('verificando se a rota /leaderboard/home retorna o leaderboard de partidas em casa', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatchesReturnFalse as any)
        const { status, body } = await chai.request(app).get('/leaderboard/home');
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    })
    it('verificando se a rota /leaderboard/away retorna o leaderboard de partidas fora de casa', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatchesReturnFalse as any)
        const { status, body } = await chai.request(app).get('/leaderboard/away');
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    })
    it('verificando se a rota /leaderboard retorna o leaderboard de todas as partidas', async () => {
        sinon.stub(SequelizeMatches, 'findAll').resolves(mockAllMatchesReturnFalse as any)
        const { status, body } = await chai.request(app).get('/leaderboard');
        expect(status).to.equal(200);
        expect(body).to.be.an('array');
        expect(body[0]).to.be.an('object');
    })
    
})