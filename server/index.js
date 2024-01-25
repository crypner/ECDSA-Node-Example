const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "024bd4a9f56b4e75a307bab54427177d8bc30c5a8280f2cbe71cf6fc3ae7ec2633": 10,
  "02165d2b81f128a73d917f78cc26f8d47a5e0af5e30c21bb9d2196409b20f74451": 50,
  "02ae066e5db1abc8229f0b9b3884a09f710b3f32ab8db6894c2f746658000f1e97": 75,
};
// ----------- 3 sets of key pairs have been generated for test purposes --------------
// 1. Public key  :  024bd4a9f56b4e75a307bab54427177d8bc30c5a8280f2cbe71cf6fc3ae7ec2633
// 1. Private key :  ace58d8da382a6734b7a801bb3492c5657e263209ceae4f7efec8c97188921dc

// 2. Public key  :  02165d2b81f128a73d917f78cc26f8d47a5e0af5e30c21bb9d2196409b20f74451
// 2. Private key :  69b174b6051d796081d47b3d6edd6ba85bcede9515b66203fae7f46cb6604f43

// 3. Public key  :  02ae066e5db1abc8229f0b9b3884a09f710b3f32ab8db6894c2f746658000f1e97
// 3. Private key :  16c55e006a0ce7f29bfcdbcd855d2b8fbcdcb274a879aec88e7d02afa273e20f
// ------------------------------------------------------------------------------------

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  const { sender, recipient, amount, isSigned } = req.body;
  // Check if Signature has been validated
  if (isSigned){
    // Check if recipient address exists
    if(balances[recipient] == undefined){
      res.status(400).send({ message: "Recipient is invalid" });
    }else if(amount == "" || amount < 1){
      // Check if sent amount is not empty or less then 1
      res.status(400).send({ message: "Amount is invalid" });
    }else{
      
      setInitialBalance(sender);
      setInitialBalance(recipient);
      if (balances[sender] < amount) {
        // Check if sender has enough funds for the transaction
        res.status(400).send({ message: "Not enough funds!" });
      } else {
        // If all checks are good proceed with transaction
        balances[sender] -= amount;
        balances[recipient] += amount;
        res.send({ balance: balances[sender] });
      }
    }
  }else{
    res.status(400).send({ message: "Invalid Signature" });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
