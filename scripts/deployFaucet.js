const hre = require("hardhat");

const main = async () => {
  const [owner] = await hre.ethers.getSigners();
  console.log("Owner address: ", owner.address);

  const FaucetFactory = await hre.ethers.getContractFactory("Faucet");
  const Faucet = await FaucetFactory.deploy(
    "0x1aD8B2a631551A790Fc64daC7539FCF528Cb7121",
    100,
    { from: owner.address }
  );

  return Faucet;
};

main()
  .then((result) => {
    console.log("Faucet deployed to: ", result.target);
    process.exitCode = 0;
  })
  .catch((err) => {
    console.log(err);
    process.exitCode = 1;
  });
