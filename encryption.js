const { randomBytes, createCipheriv, createDecipheriv } = require('crypto');
    

// -- ENCRYPTION

    // -- SYMMETRIC
    const message = 'i like oranges'
    const key3 = randomBytes(32);
    const iv = randomBytes(16);

    const cipher = createCipheriv('aes256', key3, iv)
        
        // -- encrypt
        const encryptedMessage = cipher.update(message, 'utf8', 'hex') + cipher.final('hex');

        // -- decrypt
        const decipher = createDecipheriv('aes256', key3, iv);
        const decryptedMessage = decipher.update(encryptedMessage, 'hex', 'utf-8') + decipher.final('utf8')

        //console.log(encryptedMessage); // f0bc22ec9df7d2158f2fca6bdb295794
        //console.log(decryptedMessage); // i like oranges
