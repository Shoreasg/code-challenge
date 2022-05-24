const TokenBalance = artifacts.require("TokenBalance");

module.exports = function (deployer) {
  deployer.deploy(TokenBalance);
};
