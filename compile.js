const path = require('path');
const fs = require('fs');
const solc = require('solc');

//get the path of solidity file
const lotterySolPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
//read the file
const source = fs.readFileSync(lotterySolPath, 'utf8')

//complile the file
module.exports = solc.compile(source, 1).contracts[':Lottery'];