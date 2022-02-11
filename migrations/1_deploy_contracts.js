const Ragnarok = artifacts.require("RagnarokProject");

module.exports = async function(deployer) {
  //deploy Token

  await deployer.deploy(Ragnarok)
  await Ragnarok.deployed()
};