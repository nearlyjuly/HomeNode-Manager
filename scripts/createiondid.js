import {
  DID,
  generateKeyPair,
  anchor,
} from '@decentralized-identity/ion-tools';
import { webcrypto } from 'node:crypto'
if (!globalThis.crypto) globalThis.crypto = webcrypto;

import { newDid } from '../scripts/dbscripts.js';

//function to create an anchored ION DID and save to the database

export async function createIon(didName, nodeAddress) {
  const nameForStorage = didName;
  //generate a keypair for the new ION DID
  const authnKeys = await generateKeyPair();

  //get the value for the DWN address
  const dwnAddress = nodeAddress;

  //create a new ION DID with a document containing the DWN address
  const newdid = new DID({
    content: {
      publicKeys: [
        {
          id: 'key1',
          type: 'JsonWebKey2020',
          publicKeyJwk: authnKeys.publicJwk,
          purposes: ['authentication'],
        },
      ],
      services: [
        {
          id: 'dwn',
          type: 'DecentralizedWebNode',
          serviceEndpoint: {
            nodes: [dwnAddress],
          },
        },
      ],
    },
  });

  //get the value of the short DID URI
  const did = await newdid.getURI('long');

  //get the operations file for the newly created DID and stringify ready for adding to db
  const operations = await newdid.getAllOperations();
  const ops = JSON.stringify(operations);
  // add the algorithm to the generated keypair so that it can be used
  // with dwn-sdk-js repos
  authnKeys.privateJwk.alg = 'ES256K';
  const keysForDb = JSON.stringify(authnKeys);

  //create an anchor request and send to be actioned
  const anchorRequest = await newdid.generateRequest();
  const response = await anchor(anchorRequest);
  const returnText =
    'Your DID is: ' +
    did +
    '<br>' +
    'If your anchor request has been sent successfully then the response below will show the DID document. The Published status will be False to start with. In an hour or so check the status is published by entering your did here https://identity.foundation/ion/explorer/  (this usually takes an hour to anchor but sometimes can take longer)' +
    '<p>' +
    response +
    '</p>';

  const saveDid = await newDid(nameForStorage, did, keysForDb, ops);
  return returnText;
}
