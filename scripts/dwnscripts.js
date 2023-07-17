import { Jws, ProtocolsConfigure, ProtocolsQuery, RecordsWrite, DataStream, RecordsQuery } from '@tbd54566975/dwn-sdk-js'
import { protocolTemplate } from './protocoltemplate.js';
import { resultPage } from './templates.js';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { randomUUID, webcrypto } from 'node:crypto';
if (!globalThis.crypto) globalThis.crypto = webcrypto;


export async function addProtocol(req, res) {
    const idChoice = req.body.idChoice;
    let sql = "SELECT diduri,keypair FROM dids WHERE ID ="+idChoice;
    const prefixText = req.body.prefixText;
    
    const opendb = open({
        filename: './did_store.db',
        driver: sqlite3.Database
    })
    const db = await opendb
    const jwsDidContent = await db.all(sql)
    const jwsDid = {
    did: jwsDidContent[0].diduri,
    keyId: jwsDidContent[0].diduri+"#key1",
    keyPair: JSON.parse(jwsDidContent[0].keypair)
    }
    //console.log(jwsDid)


    const signatureMaterial = Jws.createSignatureInput(jwsDid);
    const protocolName = prefixText+"-letterbox";
    const protocolDefinition = protocolTemplate;
    protocolDefinition.protocol = protocolName;
    //console.log(protocolDefinition);

    const newRecord = await ProtocolsConfigure.create({
        authorizationSignatureInput: signatureMaterial,
        definition: protocolDefinition,
    })
    //console.log(newRecord)


const jsonMessage = {
    "jsonrpc": "2.0",
    "id": randomUUID(),
    "method": "dwn.processMessage",
    "params": {
        "target": jwsDid.did,
        "message": newRecord.message
    }
}

fetch ('http://0.0.0.0:3000', {
    method: 'POST',
    headers: {
        ['dwn-request']: JSON.stringify(jsonMessage),
        'Content-Type': 'application/octet-stream',},
    body: '',
    duplex: 'half'
}).then ((response) => {
    return response.json();
}).then((data) => res.send(resultPage.replace('genericText', 'Response from DWN is...' + JSON.stringify(data.result.reply.status))))
}

export async function sendLetter(req, res) {
    const sendfrom = req.body.sendfrom;
    const sendto = req.body.sendto;
    const letterbox = req.body.letterbox;
    const lettertext = req.body.lettertext;
    let sql = "SELECT diduri,keypair FROM dids WHERE ID ="+sendfrom;
   
    const opendb = open({
        filename: './did_store.db',
        driver: sqlite3.Database
    })
    const db = await opendb
    const jwsDidContent = await db.all(sql)
    const jwsDid = {
    did: jwsDidContent[0].diduri,
    keyId: jwsDidContent[0].diduri+"#key1",
    keyPair: JSON.parse(jwsDidContent[0].keypair)
    }
    
    //console.log(jwsDid);
    const signatureMaterial = Jws.createSignatureInput(jwsDid);
    const encoder = new TextEncoder();
    const data = encoder.encode(lettertext);
    const newRecord = await RecordsWrite.create({
        data,
        recipient: sendto,
        dataFormat: 'text/plain',
        published: true,
        protocol: letterbox,
        protocolPath: 'letter',
        schema: 'letter',
        authorizationSignatureInput: signatureMaterial,
    })
   // console.log(newRecord)


const jsonMessage = {
    "jsonrpc": "2.0",
    "id": randomUUID(),
    "method": "dwn.processMessage",
    "params": {
        "target": sendto,
        "message": newRecord.message
    }
}
//console.log(data);
const datastream = DataStream.fromBytes(data);

await fetch ('http://0.0.0.0:3000', {
    method: 'POST',
    headers: {
        ['dwn-request']: JSON.stringify(jsonMessage),
        'Content-Type': 'application/octet-stream',},
    body: datastream,
    duplex: 'half'
}).then ((response) => {
    return response.json();
}).then((data) => res.send(resultPage.replace('genericText', 'Response from DWN is...' + JSON.stringify(data.result.reply.status))))
}

export async function queryProtocol(req, res) {
    const arrayResult = [];
    const idChoice2 = req.body.idChoice2
    let sql = "SELECT diduri,keypair FROM dids WHERE ID =" + idChoice2;
    const opendb = open({
        filename: './did_store.db',
        driver: sqlite3.Database
    })
    const db = await opendb
    const jwsDidContent = await db.all(sql);
    const jwsDid = {
    did: jwsDidContent[0].diduri,
    keyId: jwsDidContent[0].diduri+"#key1",
    keyPair: JSON.parse(jwsDidContent[0].keypair)
    }

    //console.log(jwsDid);
    const signatureMaterial = Jws.createSignatureInput(jwsDid);

    const newRecord = await ProtocolsQuery.create({
        authorizationSignatureInput: signatureMaterial,
    })
    //console.log(newRecord)


const jsonMessage = {
    "jsonrpc": "2.0",
    "id": randomUUID(),
    "method": "dwn.processMessage",
    "params": {
        "target": jwsDid.did,
        "message": newRecord.message
    }
}

await fetch ('http://0.0.0.0:3000', {
    method: 'POST',
    headers: {
        ['dwn-request']: JSON.stringify(jsonMessage),
        'Content-Type': 'application/octet-stream',},
    body: '',
    duplex: 'half'
}).then ((response) => response.json())
   .then((data) => data.result.reply.entries.forEach(element => {
    arrayResult.push(element.descriptor.definition.protocol + "<br\>");
   }
   ));
   res.send(resultPage.replace('genericText', 'Your installed protocols are..' + arrayResult))
}

export async function readLetters(req, res) {
    const arrayResult2 = [];
    const letterbox2 = req.body.letterbox2;
    const idChoice3 = req.body.idChoice3
    let sql = "SELECT diduri,keypair FROM dids WHERE ID =" + idChoice3;
    const opendb = open({
        filename: './did_store.db',
        driver: sqlite3.Database
    })
    const db = await opendb
    const jwsDidContent = await db.all(sql);
    const jwsDid = {
    did: jwsDidContent[0].diduri,
    keyId: jwsDidContent[0].diduri+"#key1",
    keyPair: JSON.parse(jwsDidContent[0].keypair)
    }

    //console.log(jwsDid);
    const signatureMaterial = Jws.createSignatureInput(jwsDid);

    const newRecord = await RecordsQuery.create({
        authorizationSignatureInput: signatureMaterial,
        filter: {
            protocol: letterbox2,
        }
        
    })
    //console.log(newRecord)


const jsonMessage = {
    "jsonrpc": "2.0",
    "id": randomUUID(),
    "method": "dwn.processMessage",
    "params": {
        "target": jwsDid.did,
        "message": newRecord.message
    }
}

await fetch ('http://0.0.0.0:3000', {
    method: 'POST',
    headers: {
        ['dwn-request']: JSON.stringify(jsonMessage),
        'Content-Type': 'application/octet-stream',},
    body: '',
    duplex: 'half'
}).then ((response) => response.json())
.then((data) => data.result.reply.entries.forEach(element => {
    arrayResult2.push(JSON.stringify(element.descriptor.dateCreated) + "<br />"
    + atob(element.encodedData)+ "<br />");
   }
   ))
   res.send(resultPage.replace('genericText', arrayResult2)) 
}

