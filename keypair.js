const { generateKeyPairSync } = require('crypto');

// -- PUBLIC KEY
const { privateKey, publicKey } = generateKeyPairSync('rsa', {
    modulusLength: 2048, // the length of the key in bits
    publicKeyEncoding: {
        type: 'spki', // recommended to be 'spki by node.js docs
        format: 'pem',
    },
    privateKeyEncoding: {
        type: 'pkcs8', // recommended by node.js docs
        format: 'pem',

    },
   });
   console.log(publicKey); 
   console.log(privateKey);

   module.exports = {
    privateKey, publicKey
   }
