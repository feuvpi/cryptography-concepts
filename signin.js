const { createSign, createVerify } = require('crypto')
const { publicKey, privateKey } = require('./keypair')

// -- DIGITAL SIGNATURE (SIGNIN)

const message = 'this message is signed'

const signer = createSign('rsa-sha256')

signer.update(message);

// -- create the signature with the private key
const signature = signer.sign(privateKey, 'hex');



// -- receiver verifies it 
const verifier = createVerifiy('rsa-sha256')

verifier.update(message);
const isVerified = verifier.verify(publicKey, signature, 'hex');

    
    