import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize, DataTypes } from "sequelize";

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
        id: {type: DataTypes.INTEGER,primaryKey: true,autoIncrement: true},
        name: {type: DataTypes.STRING,allowNull: false},
        description: {type: DataTypes.STRING,allowNull: false},
        price: {type: DataTypes.DECIMAL(10, 2),allowNull: false},
        stock: {type: DataTypes.INTEGER,allowNull: false},
        clase: {type: DataTypes.STRING,allowNull: false}, 
    });
}