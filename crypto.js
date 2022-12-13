const { createHash, timingSafeEqual, scryptSync, randomBytes, createHmac, createCipheriv, createDecipheriv, generateKeyPair,
publicEncrypt, privateDecrypt } = require('crypto');
const { publicKey, privateKey } = require('./keypair');



// -- create a string hash function
    function hash(input){
        return createHash('sha256').update(input).digest('hex');
    }


    // -- compare two hashed passwords
    const hash1 = hash('helloworld!');
    // ---console.log(hash1)



// -- user password cryptography with scryptSync and hash function
    const usersdb = [];

    function signup(email, password){
        const salt = randomBytes(16).toString('hex');
        const hashedPassword = scryptSync(password, salt, 64).toString('hex');
        const user = { email, password: `${salt}:${hashedPassword}`}

        //users.push(user);
        return user;
    }

    function login(email, password){
        // -- retrieving user in database
        const user = usersdb.find(v => v.email === email);
        const [salt, key] = user.password.split(':');

        
        const hashedBuffer = scryptSync(password, salt, 64);
        const keyBuffer = Buffer.from(key, 'hex');
        const match = timingSafeEqual(hashedBuffer, keyBuffer);

        if(match){
            return true
        } else return false
    }

// -- HASH BASED MESSAGE AUTHENTICATION CODE
    const key = 'secret-password';
    const text = 'hello world';
    
    const hmac = createHmac('sha256', key).update(text).digest('hex');
    //console.log(hmac) // 571710b26fa9b231b24e68390f0ffd38c60f277daea83500d455ae4bed6db28a

    const key2 = 'other-password';
    const hmac2 = createHmac('sha256', key2).update(text).digest('hex');
    //console.log(hmac2) // 529bed5f85e1c5309336b46bfa54481377de26f3e6b10781c4c6d6f9d72ac2f4

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


// -- ASSYMETRIC ENCRYPTION

    const someMessage = 'this is top-secret.';

    const encryptedData = publicEncrypt(
        publicKey,
        Buffer.from(someMessage)
    );
    
    console.log(encryptedData.toString('hex'));
    
    const decryptedData = privateDecrypt(
        privateKey,
        encryptedData
    )

    console.log(decryptedData.toString('utf-8'))

// -- DIGITAL SIGINATURE (SIGNIN)

    
    


