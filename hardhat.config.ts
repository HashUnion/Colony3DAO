import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@openzeppelin/hardhat-upgrades';
import "@nomiclabs/hardhat-etherscan";

require('dotenv').config();
const privateKey = process.env.PRIVATE_KEY as string;
const mumbaiEtherscanApiKey = process.env.ETHERSCAN_API_KEY_MUMBAI as string;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    }
  },
  networks: {
    hardhat: {
      mining: {
        auto: false,
        interval: 10000,
      },
    },
    mumbai: {
      url: "https://rpc-mumbai.maticvigil.com",
      accounts: [privateKey],
    }
  },
  etherscan: {
    apiKey: {
      polygonMumbai: mumbaiEtherscanApiKey
    }
  }
};

export default config;
