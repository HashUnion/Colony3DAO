import hardhat, { ethers, upgrades } from "hardhat";

require('dotenv').config();
async function main() {
  const tokenName = "Colony3 Token";
  const tokenSymbol = "C3T";
  const governorName = "Colony3 DAO";
  const initMember = process.env.INIT_MEMBER as string;
  if (initMember == undefined || initMember.length <= 0) throw Error("INVAILD INIT_MEMBER")
  const initAmount = +(process.env.INIT_AMOUNT as string);
  if (initAmount == undefined || initAmount <= 0) throw Error("INVAILD INIT_AMOUNT")

  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const governanceToken = await GovernanceToken.deploy(tokenName, tokenSymbol);
  await governanceToken.deployed();
  console.info(`Governance Token Deployed To ${governanceToken.address}`);

  await governanceToken.mint(initMember, initAmount);
  console.info(`Minted ${initAmount} Token To ${initMember}`);

  const verifyGovernanceToken = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: governanceToken.address,
      constructorArguments: [tokenName, tokenSymbol],
    });
    console.info("Governance Token Verfied");
  }).catch((error) => console.error(error));

  const Governor = await ethers.getContractFactory("GovernorV1");
  const governor = await upgrades.deployProxy(Governor, [governorName, governanceToken.address], {
    initializer: 'initialize',
    kind: 'uups'
  });
  await governor.deployed();
  console.info("Governor Deployed To ", governor.address);

  const verifyGovernor = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: await (hardhat as any).upgrades.erc1967.getImplementationAddress(governor.address),
      constructorArguments: [],
    });
    console.info("Governor Verfied")
  }).catch((error) => console.error(error));

  await governanceToken.transferOwnership(governor.address);
  console.info(`Transferred Governance Token Ownership To ${governor.address}`);

  await verifyGovernanceToken;
  await verifyGovernor;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
