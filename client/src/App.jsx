import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [isSigned, setIsSigned] = useState(false);

  return (
    <div className="app">
      <Wallet
        balance={balance}
        privateKey={privateKey}
        setPrivateKey={setPrivateKey}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}        
        isSigned={isSigned}
        setIsSigned={setIsSigned}
      />
      <Transfer setBalance={setBalance} address={address} isSigned={isSigned} />
    </div>
  );
}

export default App;
