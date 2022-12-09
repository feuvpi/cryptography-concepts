const { createHash } = require('crypto');

// -- create a string hash function
function hash(input){
    return createHash('sha256').update(input).digest('hex');
}


// -- compare two hashed passwords
const hash1 = hash('helloworld!');
console.log(hash1)

const hash2 = hash('helloworld');
console.log(hash2)



