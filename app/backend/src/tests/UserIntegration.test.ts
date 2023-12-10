import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeUser from '../database/models/SequelizeUser';
import bcrypt from '../utils/bcrypt';
import JWT from '../utils/JWT';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  beforeEach(() => sinon.restore());
    it('ao tentar fazer um login sem email deve retornar um erro 400', async () => {
        const { status, body } = await chai.request(app).post('/login').send({
            password: '123456'
        });
        expect(status).to.equal(400);
        expect(body).to.be.an('object');
    });
    it('ao tentar fazer um login sem password deve retornar um erro 400', async () => {
        const { status, body } = await chai.request(app).post('/login').send({
            email: 'umemail@hotmail.com',
        });
        expect(status).to.equal(400);
        expect(body).to.be.an('object');
        expect(body).to.have.property('message');
    })
    it('ao tentar fazer o login com email e senha corretos deve retorna um token', async () => {
        sinon.stub(SequelizeUser, 'findOne').resolves({dataValues:{ id: 1, email: 'xablau@hotmail.com', username: 'nome', password: '12321' }} as any)
        sinon.stub(bcrypt, 'compareHash').resolves(true)
        const { status, body } = await chai.request(app).post('/login').send({
            email: 'umemail@hotmail.com',
            password: '123456'
        });
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
        expect(body).to.have.property('token');
    })
    it('ao tentar fazer o login com email e senha incorretos deve retorna um erro 400', async () => {
        sinon.stub(SequelizeUser, 'findOne').returns({dataValues:{ id: 1, email: '', username: 'nome', password: '12321' } }as any)
        const { status, body } = await chai.request(app).post('/login').send({
            email: '',
            password: ''
        });
        expect(status).to.equal(400);
        expect(body).to.be.an('object');
        expect(body).to.have.property('message');
    })
    it('ao tentar pegar o getRole deve ter um retorno correto', async () => {
        sinon.stub(JWT, 'verify').callsFake(() => ({ id: 1}) )
        sinon.stub(SequelizeUser, 'findOne').resolves({dataValues:{ id: 1, email: '', username: 'nome', password: '12321', role: 'admin' }} as any)
        const { status, body } = await chai.request(app).get('/login/role').set('Authorization', 'Bearer token');
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
    })
    it('testando se retorna erro quando a verify da error', async () => {
        sinon.stub(SequelizeUser, 'findOne').returns(null as any)
        const { status, body } = await chai.request(app).post('/login').send({
            email: '',
            password: ''
        });
        expect(status).to.equal(400);
        expect(body).to.be.an('object');
        expect(body).to.have.property('message');
    })
});
