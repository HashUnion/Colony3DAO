import hardhat, { ethers } from "hardhat";

async function main() {
  const name = "Colony3 Token";
  const symbol = "C3T";

  const Governor = await ethers.getContractFactory("GovernanceToken");
  const instance = await Governor.deploy(name, symbol);
  await instance.deployed();
  console.log("Deployed ===> ", instance.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
