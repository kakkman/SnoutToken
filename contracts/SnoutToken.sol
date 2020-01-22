pragma solidity ^0.5.16;

contract SnoutToken {
	//constructor

	uint256 public totalSupply;

	constructor() public {
		//state variable. accessible by all. kind of like a class variable. 
		//this will write to storage/blockchain
		totalSupply = 1000000;
	}
	//you don't need a getter for a public variable.
	//getters and setters

}