//CLI: truffle test
var SnoutToken = artifacts.require("SnoutToken");

contract("SnoutToken", function(accounts) {

	var tokenInstance;

	it('initializes the contract with the correct values', function() {
		return SnoutToken.deployed().then(function(instance){
			tokenInstance = instance;
			return tokenInstance.name();

		}).then(function(name){
			assert.equal(name, 'Snout Token', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol){
			assert.equal(symbol, 'SNT', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard){
			assert.equal(standard, 'Snout Token v0.1', 'has the correct standard');
		})

	})

	it('allocates the initial supply upon deployment', function() {
		return SnoutToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply){
			assert.equal(totalSupply.toNumber(), 1000000, 'sets the total supply to 1 million');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), 1000000, 'allocates the initial supply to admin account');
		});
	});


	it('transfers token ownership', function() {
		return SnoutToken.deployed().then(function(instance){
			tokenInstance = instance;
			//call allows us to inspect, doesn't do any transactions
			return tokenInstance.transfer.call(accounts[1], 99999999999999);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], 250000, {from: accounts[0]})
		}).then(function(success) {
			//this one does trigger a transaction
			assert.equal(success, true, 'it returned true');
			return tokenInstance.transfer(accounts[1], 250000, {from: accounts[0]});
		}).then(function(receipt) {
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
			assert.equal(receipt.logs[0].args._value, 250000, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 250000, 'adds the amount to the receiving amount');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 750000, 'subtracts from the transferring account');
		})
	})
})