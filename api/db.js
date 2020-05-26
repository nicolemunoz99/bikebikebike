const dbAccess = require('../dbAccess.js')
require('custom-env').env(true);
const _ = require('lodash');
const{ Pool, Client } = require('pg');
const types = require('pg').types;

types.setTypeParser(1700, function(val) { // convert pg 'numeric' to js numeric
  return parseInt(val)
});

types.setTypeParser(20, function(val) { // convert pg 'bigint' to js numeric
  return parseInt(val)
});


const pool = new Pool ({
  user: dbAccess.user,
  host: process.env.DB_host,
  password: process.env.DB_PW,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  max: 10
});



// ... GENERIC QUERY ...

const dbQuery = async (params) => {
  return (await pool.query(params)).rows;
};


// ... PRE-DEFINED QUERIES ...

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
};


// data: object with keys 'whereVar', 'updatVars'
  // whereVar: object of condition to match (single condition)
  // updateVars: key/values to update
  const update = async (table, data) => { 
    let { whereVar, updateVars } = data;
    let setStr = [];
    for (item in updateVars) {
      if (typeof updateVars[item] === 'string') {
        setStr.push(`${item} = '${updateVars[item]}'`);
      } else {
        setStr.push(`${item} = ${updateVars[item]}`);
      }
    }
    setStr = setStr.join(', ');
    let whereKey = Object.keys(whereVar)[0];
    let whereStr = typeof whereVar[whereKey] === 'string' ?  `${whereKey} = '${whereVar[whereKey]}'` : `${whereKey} = ${whereVar[whereKey]}`;
    let params = {text: `UPDATE ${table} SET ${setStr} WHERE ${whereStr} RETURNING *`};

    let updatedEntry = await dbQuery(params);
    return updatedEntry;
  };


// ... FN GETS COLUMN NAMES ...

const getCols = async (table) => {
  return _.map(await dbQuery(`SELECT column_name FROM information_schema.COLUMNS WHERE TABLE_NAME='${table}'`), 'column_name');
};




module.exports = { dbQuery, insert, get, update, getCols };