import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import SequelizeTeams from '../database/models/SequelizeTeams';
import SequelizeUser from '../database/models/SequelizeUser';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testando a rota login', () => {
  afterEach(() => sinon.restore());
    it('ao tentar fazer um login sem email deve retornar um erro 400', async () => {
        sinon.stub({
            req: {
                body: {
                    password: '123456'
                }
            },
            res: {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis(),
            },
        })
        const { status, body } = await chai.request(app).post('/login');
        expect(status).to.equal(400);
        expect(body).to.be.an('object');
        expect(body.date).to.have.property('message');
    });
    it('ao tentar fazer um login sem password deve retornar um erro 400', async () => {
        sinon.stub({
            req: {
                body: {
                    email: 'umemail@hotmail.com'
                }
            },
            res: {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis(),
            },
        })
        const { status, body } = await chai.request(app).post('/login');
        expect(status).to.equal(400);
        expect(body).to.be.an('object');
        expect(body.date).to.have.property('message');
    })
    it('ao tentar fazer o login com email e senha corretos deve retorna um token', async () => {
        sinon.stub({
            req: {
                body: {
                    email: 'umemail@hotmail.com',
                    password: '123456'
                }
            },
            res: {
                status: sinon.stub().returnsThis(),
                json: sinon.stub().returnsThis(),
            },
        })
        sinon.stub(SequelizeUser, 'findOne').returns({ id: 1, email: 'xablau@hotmail.com', username: 'nome', password: '12321' } as any)
        const { status, body } = await chai.request(app).post('/login');
        expect(status).to.equal(200);
        expect(body).to.be.an('object');
    })
});
