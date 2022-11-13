const path = require('path');
const fs = require('fs');
const solc = require('solc');

//get the path of solidity file
const inboxSolPath = path.resolve(__dirname, 'contracts', 'inbox.sol');
//read the file
const source = fs.readFileSync(inboxSolPath, 'utf8')

//complile the file
module.exports = solc.compile(source, 1).contracts[':Inbox'];