const SnoutToken = artifacts.require("SnoutToken");
//artifacts allow us to create a content extraction that truffle can use in a js rt environemnt
//allows us to interact with contract in any environment. 
module.exports = function(deployer) {
  deployer.deploy(SnoutToken);
};
