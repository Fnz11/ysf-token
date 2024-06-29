require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "PolygonPos",
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    PolygonPos: {
      url: process.env.RPC_URL,
      chainId: 80002,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
