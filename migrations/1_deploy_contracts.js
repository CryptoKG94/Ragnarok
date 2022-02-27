const Ragnarok = artifacts.require("WorldOfRagnarok");

module.exports = async function(deployer) {
  //deploy Token

  await deployer.deploy(Ragnarok)
  await Ragnarok.deployed()
};