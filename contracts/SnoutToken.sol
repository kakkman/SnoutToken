pragma solidity ^0.5.16;
//solidity.readthedocs.io
contract SnoutToken {

	uint256 public totalSupply;

	string public name = "Snout Token";
	string public symbol = "SNT";
	string public standard = "Snout Token v0.1";

	//event to be triggered by transfer function
	event Transfer(
		address indexed _from,
		address indexed _to,
		uint256 _value
	);

	//data structure to keep track of who has what
	mapping(address => uint256) public balanceOf;

	constructor(uint256 _initialSupply) public {

		//msg.sender is address that called this function. 
		balanceOf[msg.sender] = _initialSupply;
		totalSupply = _initialSupply;
	}

	/*TRANSFER FUNCTION. 
	Parameters: '_in'- address to send to, '_value' -the amount to send.
	Triggers the Transfer Event. 
	Throws exception if '_in' account doesn't have enough tokens. 
	Returns: boolean 'success' */
	function transfer(address _to, uint256 _value) public returns (bool success){
		//insures sender has the value to send. 
		//require continues if true, halts and throws error if false.
		require(balanceOf[msg.sender] >= _value);

		//transfers the balance
		balanceOf[msg.sender] -= _value;
		balanceOf[_to] += _value;

		//trigger transfer event
		emit Transfer(msg.sender, _to, _value);

		return true;


	}

}