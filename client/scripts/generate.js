import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex } from "ethereum-cryptography/utils.js";

//Generate Random Private Key
const privateKey = secp256k1.utils.randomPrivateKey();
//Generate Public Key from privatekey
const publicKey = secp256k1.getPublicKey(privateKey);

console.log('Public key  : ', toHex(publicKey))
console.log('Private key : ', toHex(privateKey))

// To generate key pairs run: node scripts/generate