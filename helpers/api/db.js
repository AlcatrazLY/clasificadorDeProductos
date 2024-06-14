import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataType } from "sequelize";

const { serverRuntimeConfig } = getConfig();
export const db = {
	initialized: false,
	initialize,
};

async function initialize() {
    const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    const sequelize = new Sequelize(database, user, password, { host, dialect: 'mysql' });

    db.Product = productModel(sequelize);



    await sequelize.sync({alter: true});

    db.initialized = true;

}

function productModel(sequelize) {
    return sequelize.define('product', {
        id: {type: DataType.INTEGER,primaryKey: true,autoIncrement: true},
        name: {type: DataType.STRING,allowNull: false},
        description: {type: DataType.STRING,allowNull: false},
        price: {type: DataType.DECIMAL(10, 2),allowNull: false},
        stock: {type: DataType.INTEGER,allowNull: false},
        clase: {type: DataType.INTEGER,allowNull: false}, 
    });
}