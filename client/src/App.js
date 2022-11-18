
import {useState, useEffect } from 'react'
import lottery from './lottery';
import web3 from './web3';

function App() {
  const [manager, setManager] =  useState('')
  const [balance, setBalance] =  useState('')
  const [players, setPlayers] =  useState([])
  const [value, setValue] =  useState(0)
  const [message, setMessage] =  useState('')

  
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
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const accounts = await web3.eth.getAccounts();
    setMessage('Sending your transaction...')
    try {
      await lottery.methods.enter().send({
        value: web3.utils.toWei(value, 'ether'),
        from: accounts[0]
      });
      setMessage('Successfully entered to the contract!')
      
    } catch (error) {
      setMessage(error.message)
    }

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
      <hr />
      <form onSubmit={handleSubmit}>
        <label>Enter the lottery contract: </label>
        <input value={value} onChange={e => setValue(e.target.value)} type='text' placeholder='Enter the etherem amount'/>
        <button type='submit'>Enter</button>
      </form>

      <hr />
      <h2>{message}</h2>

    </div>
  );
}

export default App;
