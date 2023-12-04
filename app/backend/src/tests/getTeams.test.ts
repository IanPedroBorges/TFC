import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';
import TeamsModel from '../models/TeamsModel';

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
    })
});
