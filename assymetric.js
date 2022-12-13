const { publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./keypair');

const someMessage = 'this is top-secret.';

const encryptedData = publicEncrypt(
    publicKey,
    Buffer.from(someMessage));
    
console.log(encryptedData.toString('hex'));

const decryptedData = privateDecrypt(
        privateKey,
        encryptedData)

console.log(decryptedData.toString('utf-8'))