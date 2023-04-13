import hardhat, { ethers, upgrades } from "hardhat";

require('dotenv').config();
async function main() {
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  if (proxyAddress == undefined || proxyAddress.length <= 0) throw Error("INVAILD PROXY_ADDRESS")

  const Upgradeable = await ethers.getContractAt("Upgradeable", proxyAddress);
  const version = +(await Upgradeable.version()) + 1;
  const Governor = await ethers.getContractFactory(`GovernorV${version}`);
  const implementationAddress = await upgrades.prepareUpgrade(proxyAddress, Governor, { kind: 'uups' });
  console.info(`Governor v${version} Deployed ===> ${implementationAddress.valueOf()}`);

  const verifyGovernor = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: implementationAddress,
      constructorArguments: [],
    });
    console.info(`Governor v${version} Verfied`)
  }).catch((error) => console.error(error));

  await verifyGovernor;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
