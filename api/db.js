const dbAccess = require('../dbAccess.js')
require('custom-env').env(true);

const{ Pool, Client } = require('pg');
const pool = new Pool ({
  user: dbAccess.user,
  host: process.env.DB_host,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 10
});

const dbQuery = async (params) => {
  return (await pool.query(params)).rows;
};

const insert = async (table, keyValues) => {
  for (key in keyValues) {
    if (keyValues[key] === null || keyValues[key] === undefined || keyValues[key].length === 0)  {
      delete keyValues[key]
    }
  }

  let valuesStr = [];
  for (let i = 1; i <= Object.keys(keyValues).length; i++) valuesStr.push(`$${i}`);
  valuesStr = valuesStr.join(', ');

  params = {
    text: `INSERT INTO ${table} ` +
          `(${Object.keys(keyValues)}) ` + 
          `VALUES(${valuesStr}) RETURNING *`,
    values: [...Object.values(keyValues)]
  };
  console.log(params);
  let newEntry = await dbQuery(params);
  return newEntry;
};

// table: string
// conditions: object of key/values to match (multiple conditions )
const get = async (table, conditions) => {
  let whereStr = [];
  for (key in conditions) {
    whereStr = typeof conditions[key] === 'string' ?
    [...whereStr, `${key} = '${conditions[key]}'`] : [...whereStr, `${key} = ${conditions[key]}`];
  }
  whereStr = whereStr.join(' AND ');
  
  let params = {
    text: `SELECT * from ${table} WHERE ${whereStr}`
  };
  
  return await dbQuery(params);
}



module.exports = {dbQuery, insert, get}