pragma solidity ^0.4.17;

contract Lottery {
    address public manager;
    address[] public players;
    
    function Lottery() public {
        manager = msg.sender;
    }

    modifier restricted(){
        require(msg.sender == manager);
        _;
    }
    // method for players to enter into the game
    function enter() public payable{
        require(msg.value > 0.01 ether);
        players.push(msg.sender);
    }
    // pick winner randomly
    function pickWinner() public restricted {
        uint index = random() % players.length;
       players[index].transfer(this.balance);
        //reset the players
        players = new address[](0);
    }

    // generate a random number
    function random() private returns(uint){
       return uint(keccak256(block.difficulty, now, players));
    }

}