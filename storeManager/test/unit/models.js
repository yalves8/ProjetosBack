const sinon = require('sinon');
const { expect } = require('chai');

const connection = require('../../models/connection');
const ProductModel = require('../../models/productModel');
const SaleModel = require('../../models/saleModel');

describe('Insere um novo produto models', () => {
    const produto = {
        name: 'Relógio',
        quantity: 80
    };

    before(async () => {
        const execute = [{ id: 1, name: 'Relógio', quantity: 80 }]; // retorno esperado nesse teste

        sinon.stub(connection, 'execute').resolves(execute);
    });

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando é inserido com sucesso', () => {

        it('retorna um objeto', async () => {
            const response = await ProductModel.createProduct(produto);

            expect(response).to.be.a('object')
        });

        it('tal objeto possui o "id" do novo produto inserido', async () => {
            const response = await ProductModel.createProduct(produto);

            expect(response).to.have.a.property('id')
        });
    });
});

describe('Lista todos os produtos cadastrados', () => {

    describe('Quando possui nenhum produto', () => {

        before(async () => {
            const produto = [[], [{}, {}]] // retorno esperado nesse teste

            sinon.stub(connection, 'execute').resolves(produto);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('retorna um array', async () => {
            const response = await ProductModel.getAll();

            expect(response).to.be.an('array');
        });

        it('retorna um array vazio', async () => {
            const response = await ProductModel.getAll();

            expect(response).to.be.empty;
        });
    });

    describe('Quando possui produtos', () => {

        before(async () => {
            const produto = [{
                id: 1,
                name: 'Relógio',
                quantity: 80
            }, [{}, {}]]; // retorno esperado nesse teste

            sinon.stub(connection, 'execute').resolves(produto);
        });

        after(async () => {
            connection.execute.restore();
        });

        it('retorna um objeto', async () => {
            const response = await ProductModel.getAll();

            expect(response).to.be.a('object');
        });

        it('não retorna um objeto vazio', async () => {
            const response = await ProductModel.getAll();

            expect(response).not.to.be.empty;
        });
        it('retorna id, name, quantity', async () => {
            const response = await ProductModel.getAll();
            expect(response).to.have.keys('id', 'name', 'quantity');
        })
    });
});

describe('Procura produto por id', () => {
    describe('Quando não encontra o id', () => {
        before(async () => {
            const mock = [[], [{}, {}]];
            sinon.stub(connection, 'execute').resolves(mock);
        })

        after(async () => {
            connection.execute.restore();
        })
        it('retorna undefined', async () => {
            const response = await ProductModel.findById(2);
            expect(response).to.be.undefined;
        });
    });
    describe('Quando encontra o id', () => {
        before(async () => {
            const produto = [{
                id: 1,
                name: 'Relógio',
                quantity: 80
            }];
            sinon.stub(connection, 'execute').resolves([[produto[0]]]);
        })

        after(async () => {
            connection.execute.restore();
        });

        it('retorna um objeto', async () => {
            const response = await ProductModel.findById(1);
            expect(response).to.be.an('object');
        });

        it('retorna id, name, quantity', async () => {
            const response = await ProductModel.findById(1);
            expect(response).to.have.keys('id', 'name', 'quantity');
        });
    })
});

describe('Procura produto por nome', () => {
    describe('Quando não encontra o nome', () => {
        before(async () => {
            const mock = [[], [{}, {}]];
            sinon.stub(connection, 'execute').resolves(mock);
        })

        after(async () => {
            connection.execute.restore();
        })
        it('retorna undefined', async () => {
            const response = await ProductModel.findProductByName('Cadeira');
            expect(response).to.be.undefined;
        });
    });
    describe('Quando encontra o nome', () => {
        before(async () => {
            const produto = [{
                id: 1,
                name: 'Relógio',
                quantity: 80
            }];
            sinon.stub(connection, 'execute').resolves([[produto[0]]]);
        })

        after(async () => {
            connection.execute.restore();
        });

        it('retorna um objeto', async () => {
            const response = await ProductModel.findProductByName('Relógio');
            expect(response).to.be.an('object');
        });

        it('retorna id, name, quantity', async () => {
            const response = await ProductModel.findProductByName('Relógio');
            expect(response).to.have.keys('id', 'name', 'quantity');
        });
    })
});


//sales

describe('Insere um novo produto', () => {


    before(async () => {
        const sale = {
            "saleId": 1,
            "itemsSold": [
                {
                    "product_id": 1,
                    "quantity": 3
                }
            ]
        };
        sinon.stub(connection, 'execute').resolves([[sale[0]]]);
    });

    after(async () => {
        connection.execute.restore();
    });

    describe('Quando é inserido com sucesso', () => {

        it('retorna um objeto', async () => {
            const response = await SaleModel.insertSaleProduct(1,1,3);

            expect(response).to.be.a('object')
        });
    });
});


