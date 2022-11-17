const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const {interface, bytecode} = require('../compile');

let accounts;
let lottery;
beforeEach(async() => {
    //fetch all account
    accounts = await web3.eth.getAccounts();

    //deploy the contract to the ganache provider
    lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
        data: bytecode
    })
    .send({
        from: accounts[0], 
        gas: '1000000'
    })

});

describe('Lottery', () => {
    it('deploys a contract', () => {
        assert.ok(lottery.options.address)
    }) 
    it('allow one account to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.equal(accounts[0], players[0]);
        assert.equal(1, players.length)
    }) 
    it('allow multiple accounts to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        });
        await lottery.methods.enter().send({
            from: accounts[2],
            value: web3.utils.toWei('0.02', 'ether')
        });
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.equal(accounts[0], players[0]);
        assert.equal(accounts[1], players[1]);
        assert.equal(accounts[2], players[2]);
        assert.equal(3, players.length)
    })
    
    it('can only enter with minimum ethereum', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: 0
            })
            assert(false)
        } catch (error) {
            assert(error)
        }
    })
    it('allows only manager to pickWinner', async () => {
        try {
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            })
            assert(false)
        } catch (error) {
            assert(error)
        }
    })
    it('picks the right winner and sent the balance', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        });
        const initialBalance = await web3.eth.getBalance(accounts[0]);
        await lottery.methods.pickWinner().send({
            from: accounts[0]
        })
        const finalBalance = await web3.eth.getBalance(accounts[0]);
        const diff =  finalBalance - initialBalance;
        assert(diff > web3.utils.toWei('1.8', 'ether'))
    })

})