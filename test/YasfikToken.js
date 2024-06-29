const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("YasfikToken", function () {
  let YasfikToken;
  let owner, addr1;
  let cap;
  let rewardPerBlock;

  this.beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    cap = 10000000;
    rewardPerBlock = 10000;

    const YasfikTokenFactory = await ethers.getContractFactory("YasfikToken");
    YasfikToken = await YasfikTokenFactory.deploy(cap, rewardPerBlock, {
      from: owner.address,
    });
  });

  it("Should have correct owner address", async function () {
    expect(await YasfikToken.owner()).to.equal(owner.address);
  });

  it("Should have correct initial values", async function () {
    expect(await YasfikToken.totalSupply()).to.equal(
      (BigInt(cap) * 10n ** 18n) / 4n
    );
    expect(await YasfikToken.rewardPerBlock()).to.equal(rewardPerBlock);
  });

  it("Owner should have 25000000 tokens", async function () {
    // Calculate the expected balance for the owner
    const expectedOwnerBalance = (BigInt(cap) * 10n ** 18n) / 4n;
    expect(await YasfikToken.balanceOf(owner.address)).to.equal(
      expectedOwnerBalance
    );
  });

  it("Owner should have 2000 tokens and address 2 should have 5000 tokens", async function () {
    // Transfer tokens to address 1 and check balances
    const expectedAddr1Balance = BigInt(500000) * 10n ** 18n;
    await YasfikToken.connect(owner).transfer(
      addr1.address,
      expectedAddr1Balance
    );
    const expectedOwnerBalance =
      BigInt(2500000) * 10n ** 18n - expectedAddr1Balance;
    expect(await YasfikToken.balanceOf(addr1.address)).to.equal(
      expectedAddr1Balance
    );
    expect(await YasfikToken.balanceOf(owner.address)).to.equal(
      expectedOwnerBalance
    );
  });

  it("The reward block amount should be 5000", async function () {
    await YasfikToken.connect(owner).setRewardBlock(5000);
    expect(await YasfikToken.rewardPerBlock()).to.equal(5000);
  });

  it("Should cannot access the function when not owner", async function () {
    await expect(
      YasfikToken.connect(addr1).setRewardBlock(1000)
    ).to.be.revertedWith("Only the owner can perform this action");
  });
});
