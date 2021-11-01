import React, {useState } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [networkName,setnetworkName]=useState("Wallet not");
  const [Balance,setBalance]=useState();
  const [Balance2,setBalance2]=useState();
  const [Toaddress,setToaddress]=useState('j');
  const [Quantity,setQuantity]=useState();
  const [Income,setIncome]=useState(0.00);
  const [Expense,setExpense]=useState(0.00);
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
      const balance = await Web3.eth.getBalance(accounts[0]);
      const balance2=Web3.utils.fromWei(balance,'ether');
      // alert(balance2);
      setBalance(balance2);
       const networkId = await Web3.eth.net.getId();
       if(networkId===1){
        setnetworkName("Mainnet")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===3){
        setnetworkName("Ropsten")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===42){
        setnetworkName("Kovan")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===4){
        setnetworkName("Rinkeby")
      }else if(networkId===5){
        setnetworkName("Goerli")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else if(networkId===5777){
        setnetworkName("Ganache")
        alert("Connect to Rinkeby network otherwise it won't work")
      }else{
        setnetworkName("Undefined")
        alert("Connect to Rinkeby network otherwise it won't work")
      }
       
 }
connect();
const toaddress=(event)=>{
  setToaddress(event.target.value);
}
const sendTransaction= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect your wallet and Connect to Rinkeby network otherwise it won't work")
  }else if(Toaddress.length!==42){
    alert("Enter the correct Rinkeby account address to see the allowance.copy the address from your wallet")
  }else{
    web3.eth.sendTransaction({from: account,to: Toaddress, value: web3.utils.toWei(Quantity, "ether")})

  }
}
const setincome=(event)=>{
  // console.log(event.target.value)
  setIncome(event.target.value);
  // setIncome(Income);
  // console.log(Income)
  // setIncome2(String(Income));
}
const setexpense=(event)=>{
  setExpense(event.target.value);
}
const quantity=(event)=>{
  setQuantity(event.target.value);
} 
const equality=()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect your wallet and Connect to Rinkeby network otherwise it won't work")
  }else{
    const eq=Income-Expense;
    setBalance2(eq);
  }
}
const restart=()=>{
 window.location.reload(false);
}
  return (
    <>
  {/* <div className="page">  
  <nav className="navbar">
  <div className="upper">
      <h4>{networkName} Connected</h4>
      <h4>Balance: {Balance} wei</h4>
      <button className="btn" onClick={restart}><h4>Connect to Wallet</h4></button></div>
  <div className="lower">Account:{account}</div>
  </nav>
  <div className="Main">
  <div className="section">
  <div className="screen">{Screen}</div>
     
     
<button className="btn2" onClick={()=>balance()}>Balance of account</button>  
<input className="input" placeholder="To address" type="string" onChange={toaddress}></input>
<input className="input" placeholder="Amount in Ethers" type="number" onChange={quantity}></input>
<button className="btn2" onClick={()=>sendTransaction()}>Send Transaction</button>
<input className="input" placeholder="Income" type="number" onChange={setincome}></input>
<input className="input" placeholder="expense" type="number" onChange={setexpense}></input>
<button className="btn2" onClick={()=>equality()}>Equality</button>
  </div>
  </div>
  </div> */}
  <div className="body">
  <nav className="navbar">
  <div className="upper">
      <h4>{networkName} Connected</h4>
      <h4>Balance: {Balance}</h4>
      <button className="btn" onClick={restart}><h4>Connect to Wallet</h4></button></div>
  <div className="lower">Account:{account}</div>
  </nav>
  <h2>Expense Tracker</h2>
  <div className="container">
    <h4>Your Balance</h4>
    <h1 id="balance">${Balance2}</h1>
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">+${Income}</p>
        {/* <h3 className="c">{Income}</h3> */}
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">-${Expense}</p>
      </div>
    </div>
    <h3>History</h3>
    <h3>Add new transaction</h3>
      <div className="form-control">
        <h3> Transfer Ethers</h3>
        {/* <input type="text" id="text" placeholder="Enter text..." /> */}
<input className="input"  placeholder="To address" size="45" maxLength="42" type="string" onChange={toaddress}></input>
<input className="input" placeholder="Amount in Ethers" type="number" onChange={quantity}></input>
<button className="btn" onClick={()=>sendTransaction()}>Send Ethers </button>
      </div>
      <div className="form-control">
        <label htmlFor="amount">Amount <br />
        <h3>Amount</h3>
          (negative - expense, positive - income)</label>
        {/* <input type="number" id="amount" placeholder="Enter amount..." /> */}
<input className="input" placeholder="INCOME" type="number" maxLength="42"  min="1" max="1000000000" onChange={setincome}></input>
<input className="input" placeholder="EXPENSE" type="number" onChange={setexpense}></input>
<button className="btn" onClick={()=>equality()}>Calculate</button>
      </div>
  </div>
</div>

    </>
  )
}
export default App;
