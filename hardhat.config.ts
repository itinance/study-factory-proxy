import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import 'hardhat-deploy';

require("@nomiclabs/hardhat-ethers")
import '@openzeppelin/hardhat-upgrades';

import {node_url, accounts, addForkConfiguration} from './utils/network';

const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || '';

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [{
      version: '0.8.9', settings: {
        optimizer: {
          enabled: true,
          runs: 1000,
        },
      }
    }],
  },

  namedAccounts: {
    deployer: 0,
    admin: 0,
    backend: 1,
  },

  networks: addForkConfiguration({

    hardhat: {
      initialBaseFeePerGas: 0, // to fix : https://github.com/sc-forks/solidity-coverage/issues/652, see https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136
      allowUnlimitedContractSize: true,
    },
    localhost: {
      url: node_url('localhost'),
      accounts: accounts(),
    },
    staging: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
    },

    rinkeby: {
      url: node_url('rinkeby'),
      accounts: accounts('rinkeby'),
      gas: 2100000,
      gasPrice: 8000000000
    },
    mumbai: {
      url: node_url('polygon-mumbai'),
      accounts: accounts('mumbai'),
    },
    matic: {
      url: node_url('polygon-matic'),
      accounts: accounts('matic'),
    },
    goerli: {
      url: node_url('goerli'),
      accounts: accounts('goerli'),
    },
  }),
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },

  paths: {
    sources: "./contracts",
    artifacts: "./artifacts",
    cache: "./cache"
  },

  /*gasReporter: {
      currency: 'EUR',
      gasPrice: 21,
      coinmarketcap: process.env.COINMARKETCAP_APIKEY,
  }*/

  typechain: {
    outDir: 'typechain',
    target: 'ethers-v5',
  },
  mocha: {
    timeout: 0,
  },
  external: process.env.HARDHAT_FORK
      ? {
        deployments: {
          // process.env.HARDHAT_FORK will specify the network that the fork is made from.
          // these lines allow it to fetch the deployments from the network being forked from both for node and deploy task
          hardhat: ['deployments/' + process.env.HARDHAT_FORK],
          localhost: ['deployments/' + process.env.HARDHAT_FORK],
        },
      }
      : undefined,


};


export default config;
