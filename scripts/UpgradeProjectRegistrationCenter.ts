import hardhat, { ethers, upgrades } from "hardhat";

require('dotenv').config();
async function main() {
  const proxyAddress = process.env.PROXY_ADDRESS as string;
  if (proxyAddress == undefined || proxyAddress.length <= 0) throw Error("INVAILD PROXY_ADDRESS")

  const Upgradeable = await ethers.getContractAt("Upgradeable", proxyAddress);
  const version = +(await Upgradeable.version()) + 1;
  const ProjectRegistrationCenter = await ethers.getContractFactory(`ProjectRegistrationCenterV${version}`);
  const implementationAddress = await upgrades.prepareUpgrade(proxyAddress, ProjectRegistrationCenter, { kind: 'uups' });
  console.info(`Project Registration Center v${version} Deployed ===> ${implementationAddress.valueOf()}`);

  const verifyProjectRegistrationCenter = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: implementationAddress,
      constructorArguments: [],
    });
    console.info(`Project Registration Center v${version} Verfied`)
  }).catch((error) => console.error(error));

  await verifyProjectRegistrationCenter;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
