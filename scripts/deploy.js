const hre = require("hardhat");

async function main() {
  const [owner] = await hre.ethers.getSigners();
  console.log("Owner contract: ", owner.address);

  const YasfikTokenFactory = await hre.ethers.getContractFactory("YasfikToken");
  const YasfikToken = await YasfikTokenFactory.deploy(10000000, 10000, {
    from: owner.address,
  });
  console.log("YasfikToken deployed to:", YasfikToken.target);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
