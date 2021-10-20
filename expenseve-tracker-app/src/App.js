import React, {useState } from 'react';
import './App.css';
import getWeb3 from './getWeb3';
const App = () => {
  const [web3,setweb3]=useState();
  const [account,setaccount]=useState();
  const [networkName,setnetworkName]=useState("Wallet not");
  const [Balance,setBalance]=useState();
  const [Screen,setScreen]=useState();
  const [Toaddress,setToaddress]=useState('j');
  const [Quantity,setQuantity]=useState();
  const [Income,setIncome]=useState();
  const [Expense,setExpense]=useState();
 const connect = async () => {
      const Web3 = await getWeb3();
      setweb3(Web3);
      const accounts = await Web3.eth.getAccounts();
      setaccount(accounts[0]);
      const balance = await Web3.eth.getBalance(accounts[0]);
      // console.log(balance);
      setBalance(balance);
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
const balance=async ()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{setScreen(Balance);
  }
}
const toaddress=(event)=>{
  setToaddress(event.target.value);
}
const sendTransaction= async()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else if(Toaddress.length!==42){
    alert("Enter the correct Rinkeby account address to see the allowance.copy the address from your wallet")
  }else{
    web3.eth.sendTransaction({from: account,to: Toaddress, value: web3.utils.toWei(Quantity, "ether")})

  }
}
const setincome=(event)=>{
  setIncome(event.target.value);
}
const setexpense=(event)=>{
  setExpense(event.target.value);
}
const quantity=(event)=>{
  setQuantity(event.target.value);
} 
const equality=()=>{
  if(networkName!=="Rinkeby"){
    alert("Connect to Rinkeby network otherwise it won't work")
  }else{
    const eq=Income-Expense;
    setScreen(eq);
  }
}
const restart=()=>{
 window.location.reload(false);
}
  return (
    <>
  <div className="page">  
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
  </div>
    </>
  )
}
export default App;
