const dbAccess = require('../dbAccess.js')

const{ Pool, Client } = require('pg');
const pool = new Pool ({
  user: dbAccess.user,
  host: '127.0.0.1',
  // host: 'db',
  password: dbAccess.password,
  database: 'bbb',
  port: '5432',
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