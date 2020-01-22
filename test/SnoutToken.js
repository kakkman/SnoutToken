//CLI: truffle test
var SnoutToken = artifacts.require("SnoutToken");

contract("SnoutToken", function(accounts) {
	it('sets the total supply upon deployment', function() {
		return SnoutToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1 million');
		});
	});
})