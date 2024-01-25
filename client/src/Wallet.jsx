import server from "./server";
import { sha256 } from "ethereum-cryptography/sha256.js";
import { secp256k1 } from "ethereum-cryptography/secp256k1.js";
import { toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import {React} from "react"

function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey, setIsSigned }) {
  async function onChange(evt) {
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    let pK = false;
    // Checking if private key is valid.
    try {
      secp256k1.getPublicKey(privateKey)
      pK = true;
    }
    catch(err) {
      // If not, reset balance to 0,address to empty and set isSigned to false
      setAddress("") 
      setIsSigned(false);
      setBalance(0);
      console.log(err.message);
    }
    if (pK){
      // If private key is valid proceed
      const address = toHex(secp256k1.getPublicKey(privateKey));
      setAddress(address)    
      if (address) {
        const {
          data: { balance },
        } = await server.get(`balance/${address}`); 
        setBalance(balance);
        const messageHashx = sha256(utf8ToBytes("abc"));
        const signature = secp256k1.sign(messageHashx, privateKey);
        const verification = secp256k1.verify(signature, messageHashx, address);
        setIsSigned(verification);
      } else {  
        setBalance(0);
      }
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Private Key
        <input placeholder="Sender Private Key" value={privateKey} onChange={onChange}></input>
      </label>
      <div className="yourAddress"><span>Address:</span> {address.slice(0,7)}...{address.slice(address.length-5,address.length)}</div>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
