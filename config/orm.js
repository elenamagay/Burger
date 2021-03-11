const connection = require("../config/connection");

// Helper function for SQL syntax to add question marks (?, ?, ?) in query
const printQuestionMarks = (num) => {
    const array = [];
  
    for (let i = 0; i < num; i++) {
      array.push('?');
    }
  
    return array.toString();
  };
  
  // Helper function to convert object key/value pairs to SQL syntax
  const objToSql = (ob) => {
    const array = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (const key in ob) {
      let value = ob[key];
      // Check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // If string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === 'string' && value.indexOf(' ') >= 0) {
          value = `'${value}'`;
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        array.push(`${key}=${value}`);
      }
    }
  
    // Translate array of strings to a single comma-separated string
    return array.toString();
  };
  
  // Object for all our SQL statement functions.
  const orm = {
    selectAll(tableInput, callback) {
      const queryString = `SELECT * FROM ${tableInput};`;
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
        callback(result);
      });
    },
    insertOne(table, columns, values, callback) {
      let queryString = `INSERT INTO ${table}`;
  
      queryString += ' (';
      queryString += columns.toString();
      queryString += ') ';
      queryString += 'VALUES (';
      queryString += printQuestionMarks(values.length);
      queryString += ') ';
  
      console.log(queryString);
  
      connection.query(queryString, values, (err, result) => {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    },
    // An example of objColVals would be {name: panther, sleepy: true}
    updateOne(table, objColVals, condition, callback) {
      let queryString = `UPDATE ${table}`;
  
      queryString += ' SET ';
      queryString += objToSql(objColVals);
      queryString += ' WHERE ';
      queryString += condition;
  
      console.log(queryString);
      connection.query(queryString, (err, result) => {
        if (err) {
          throw err;
        }
  
        callback(result);
      });
    },
    
  };
  
  // Export the orm object for the model (burger.js).
  module.exports = orm;