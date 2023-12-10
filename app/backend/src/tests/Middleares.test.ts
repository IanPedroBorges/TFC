import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import TeamsModel from '../models/TeamsModel';

chai.use(chaiHttp);

const { expect } = chai;

describe('Middlewares', () => {
    afterEach(() => {
        sinon.restore();
    })
    it('testando o middleware ValidationsToken error token invalid', async () => {
        const { body, status } = await chai.request(app).get('/login/role').set('Authorization', 'tokenxcxzczxczx');
        expect(status).to.equal(401);
        expect(body).to.be.an('object');
    })
    it('testando o middleware ValidationsToken error token invalid', async () => {
        const { status } = await chai.request(app).post('/matches').set('Authorization', 'Bearerxcxzczxczx');
        expect(status).to.equal(401);
    });
    it('testando a middleware Validations de User error email or password invalid', async () => {
        const { status } = await chai.request(app).post('/login').send({ email: '', password: '' });
        expect(status).to.equal(400);
    });
    it('testando a middleware Validations de User error sem email or password', async () => {
        const { status } = await chai.request(app).post('/login').send({ password: '123456' });
        expect(status).to.equal(400);
    })
    it('testando a middleware Validations de User error email invalid', async () => {
        const { status } = await chai.request(app).post('/login').send({ email: 'teste', password: '123456' });
        expect(status).to.equal(401);
    })
    it('testando a middleware Validations de User error password invalid', async () => {
        const { status } = await chai.request(app).post('/login').send({ email: '', password: '123' });
        expect(status).to.equal(400);
    });
    it('testando a middleware Validations de Matches error homeTeamId or awayTeamId invalid', async () => {
        const { status } = await chai.request(app).post('/matches').send({ homeTeamId: '', awayTeamId: '' }).set('Authorization', 'Bearer xcxzczxczx');
        expect(status).to.equal(404);
    })
    it('testando a middleware Validations de Matches error homeTeamId or awayTeamId invalid', async () => {
        const { status } = await chai.request(app).post('/matches').send({ homeTeamId: '123', awayTeamId: '123' }).set('Authorization', 'Bearer xcxzczxczx');
        expect(status).to.equal(404);
    })
    it('testando a middleware Validations de Matches error homeTeamId or awayTeamId invalid', async () => {
        const { status } = await chai.request(app).post('/matches').send({ homeTeamId: '123', awayTeamId: '' }).set('Authorization', 'Bearer xcxzczxczx');
        expect(status).to.equal(404);
    })
    it('testando a middleware Validations de Matches error homeTeamId or awayTeamId equals', async () => {
        const TeamModel = new TeamsModel();
        const calledModel = sinon.stub(TeamModel, 'findById');
        calledModel.onFirstCall().resolves({id: 2, teamName: 'team' } as any);
        calledModel.onSecondCall().resolves({ id: 2, teamName: 'team' } as any);
        const { status } = await chai.request(app).post('/matches').send({ homeTeamId: '1', awayTeamId: '1' }).set('Authorization', 'Bearer xcxzczxczx');
        expect(status).to.equal(422);
    });
});