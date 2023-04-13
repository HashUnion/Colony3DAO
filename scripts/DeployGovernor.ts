import hardhat, { ethers, upgrades } from "hardhat";

async function main() {
  const tokenName = "Colony3 Token";
  const tokenSymbol = "C3T";
  const governorName = "Colony3 DAO";
  const admin = "0x714Fbd78C8eEdf4F7f499E866c1C90d0E157a16D";

  const GovernanceToken = await ethers.getContractFactory("GovernanceToken");
  const governanceToken = await GovernanceToken.deploy(tokenName, tokenSymbol);
  await governanceToken.deployed();
  console.info("GovernanceToken Deployed ===> ", governanceToken.address);

  const verifyGovernanceToken = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: governanceToken.address,
      constructorArguments: [tokenName, tokenSymbol],
    });
    console.info("GovernanceToken Verfied");
  }).catch((error) => console.error(error));

  const Governor = await ethers.getContractFactory("Governor");
  const governor = await upgrades.deployProxy(Governor, [governorName, governanceToken.address], {
    initializer: 'initialize',
    kind: 'uups'
  });
  await governor.deployed();
  console.info("Governor Deployed ===> ", governor.address);

  const verifyGovernor = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: await (hardhat as any).upgrades.erc1967.getImplementationAddress(governor.address),
      constructorArguments: [],
    });
    console.info("Governor Verfied")
  }).catch((error) => console.error(error));

  await governanceToken.mint(admin, "");
  console.info("Minted First Token ==> ", admin);

  await governanceToken.transferOwnership(governor.address);
  console.info("Transferred Ownership==> ", governor.address);

  await verifyGovernanceToken;
  await verifyGovernor;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
