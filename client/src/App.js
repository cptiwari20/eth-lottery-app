
import {useState, useEffect } from 'react'
import lottery from './lottery';
import web3 from './web3';

function App() {
  const [manager, setManager] =  useState('')
  const [balance, setBalance] =  useState('')
  const [players, setPlayers] =  useState([])
  useEffect(() => {
    handleLotteryData()
  },[])

  const handleLotteryData = async () => {
    const getManager = await lottery.methods.manager().call();
    const getPlayers = await lottery.methods.getPlayers().call();
    const getBalance = await web3.eth.getBalance(lottery.options.address);
    setManager(getManager)
    setPlayers(getPlayers)
    setBalance(getBalance)
  }



  return (
    <div className="">
      <h1 className="">
        Lottery Contract
      </h1>
      <p>
        The manager of this contract is <b>{manager}</b>. Currently there are {players.length} players in this Lottery.
        The overall balance of this lotter is {web3.utils.fromWei(balance, 'ether')} ether!
      </p>
    </div>
  );
}

export default App;
