import getConfig from 'next/config';
import { db } from '../../helpers/api/db';
//const { serverRuntimeConfig } = getConfig();

export const productRepo = {
    getAll,
    getById,
    create,
    delete: _delete
};

async function getAll() {
    return await db.Product.findAll();
}


async function getById(id) {
    return await db.Product.findByPk(id);
}


async function create(params) {
    let productName = params.name
    console.log("LOOKKKKOOOOO    " + params.name)
    productName = productName.trim();
    if (await db.Product.findOne({ where: { name: productName } })) {
        throw 'Nombre del producto "' + params.productName + '" ya existe';
    }
    const product = new db.Product(params);
    await product.save();
}

async function _delete(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'User not found';
    await product.destroy();
}
