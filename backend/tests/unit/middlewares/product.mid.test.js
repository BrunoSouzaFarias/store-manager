const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const productValidation = require('../../../src/middlewares/product.validation');

chai.use(sinonChai);
const { expect } = chai;

describe('Testa o middleware de validação de produtos', function () {
  it('testa se retorna um erro caso o nome do produto não seja informado', async function () {
    const req = { body: {} };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await productValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(400);
    expect(res.json).to.have.been.calledWith({ message: '"name" is required' });
  });

  it('testa se retorna um erro caso o nome do produto tenha menos de 5 caracteres', async function () {
    const req = { body: { name: 'Ela' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await productValidation(req, res, next);

    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({
      message: '"name" length must be at least 5 characters long',
    });
  });

  it('testa se o middleware chama o next caso o produto seja válido', async function () {
    const req = { body: { name: 'Leonora' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    const next = sinon.stub().returns();

    await productValidation(req, res, next);

    expect(next).to.have.been.calledWith();
  });
});
