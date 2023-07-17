import sqlite3 from 'sqlite3';
import { resultPage } from './templates.js';
import {  webcrypto } from 'node:crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;

export async function createDb() {
  const db = new sqlite3.Database('./did_store.db');

  const sql = `CREATE TABLE dids (ID INTEGER PRIMARY KEY,didname,diduri,keypair,ops)`;

  db.run(sql);
}

export async function newDid(didName, diduri, keypair, ops) {
  const db = new sqlite3.Database(
    './did_store.db',
    sqlite3.OPEN_READWRITE,
    (err) => {
      if (err) return console.error(err);
    }
  );

  db.run(
    `INSERT INTO dids(didname,diduri,keypair,ops) VALUES(?,?,?,?)`,
    [didName, diduri, keypair, ops],
    function (err) {
      if (err) {
        return console.log(err.message);
      }
      console.log('Added to local db', didName);
    }
  );
  db.close();
}

export function getDidIds(req, res) {
  const db = new sqlite3.Database('./did_store.db')
  const rowArray = []
  db.serialize(function() {
    db.all('SELECT ID,didname,diduri FROM dids', (err, row) => {
      rowArray.push(row);
      const didResponseText = resultPage.replace('genericText', JSON.stringify(rowArray));
      res.send(didResponseText);
    });
  
  })
  };


//DID update and deactivate to go below
