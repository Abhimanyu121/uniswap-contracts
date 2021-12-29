require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ganache");
const ethers = require("ethers");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const privateKeyDev =
  "0x8cc5cacad47d010d261ae598a9b5b2e352d54ae550d427267bdaf1e62af44ffb";

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  networks: {
    ganacheLocal: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic:
          "chronic half dress chicken trigger exercise crouch defense spin scan gossip short",
      },
    },
    hardhat: {
      accounts: {
        mnemonic:
          "chronic half dress chicken trigger exercise crouch defense spin scan gossip short",
      },
    },
    bsctestnet: {
      url: "https://data-seed-prebsc-2-s2.binance.org:8545/",
      accounts: {
        mnemonic:
          "chronic half dress chicken trigger exercise crouch defense spin scan gossip short",
      },
      chainId: 97,
    },
    polygontest: {
      url: "https://matic-mumbai.chainstacklabs.com",
      accounts: {
        mnemonic:
          "chronic half dress chicken trigger exercise crouch defense spin scan gossip short",
      },
      chainId: 80001,
      gasPrice: 8000000000,
    },
    kovan: {
      url: "https://kovan.infura.io/v3/67531e96ca3842cdabf3147f5d2a3742",
      accounts: {
        mnemonic:
          "chronic half dress chicken trigger exercise crouch defense spin scan gossip short",
      },
      chainId: 42,
      gasPrice: 16000000000,
    },
  },
  solidity: {
    compilers: [
      {
        version: "0.6.4",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.8.10",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.5.16",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      {
        version: "0.6.6",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};