import hardhat, { ethers, upgrades } from "hardhat";

require('dotenv').config();
async function main() {
  const governorAddress = process.env.GOVERNOR_ADDRESS as string;
  if (governorAddress == undefined || governorAddress.length <= 0) throw Error("INVAILD GOVERNOR_ADDRESS")

  const ProjectRegistrationCenter = await ethers.getContractFactory("ProjectRegistrationCenterV1");
  const projectRegistrationCenter = await upgrades.deployProxy(ProjectRegistrationCenter, {
    initializer: 'initialize',
    kind: 'uups'
  });
  await projectRegistrationCenter.deployed();
  console.info("Project Registration Center Deployed To ", projectRegistrationCenter.address);

  const verifyProjectRegistrationCenter = new Promise(f => setTimeout(f, 5000)).then(async () => {
    await hardhat.run("verify:verify", {
      address: await (hardhat as any).upgrades.erc1967.getImplementationAddress(projectRegistrationCenter.address),
      constructorArguments: [],
    });
    console.info("Project Registration Center Verfied")
  }).catch((error) => console.error(error));

  await projectRegistrationCenter.transferOwnership(governorAddress);
  console.info(`Transferred Project Registration Center Ownership To ${governorAddress}`);

  await verifyProjectRegistrationCenter;
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
