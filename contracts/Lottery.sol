pragma solidity ^0.4.17;

contract Lottery {
    string public manager;
    
    constructor() {
        manager = msg.sender;
    }
}