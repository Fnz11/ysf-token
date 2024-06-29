const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Faucet", function () {
    let Faucet;
    let faucet;
    let owner;
    let addr1;
    let token;

    beforeEach(async function () {
        [owner, addr1] = await ethers.getSigners();

        // Deploy ERC20 token
        const Token = await ethers.getContractFactory("ERC20Mock");
        token = await Token.deploy("TestToken", "TEST", owner.address, ethers.utils.parseEther("1000000"));
        await token.deployed();

        // Deploy Faucet contract
        Faucet = await ethers.getContractFactory("Faucet");
        faucet = await Faucet.deploy(token.address, ethers.utils.parseEther("100"));
        await faucet.deployed();
    });

    it("Should allow users to request tokens from the faucet", async function () {
        const initialBalance = await token.balanceOf(addr1.address);

        // Request tokens from the faucet
        await faucet.connect(addr1).requestToken();

        const finalBalance = await token.balanceOf(addr1.address);

        // Check that the balance increased by the claim amount
        expect(finalBalance).to.be.equal(initialBalance.add(ethers.utils.parseEther("100")));
    });

    it("Should not allow users to request tokens before the lock time", async function () {
        // Request tokens from the faucet
        await faucet.connect(addr1).requestToken();

        // Attempt to request tokens again before the lock time
        await expect(faucet.connect(addr1).requestToken()).to.be.revertedWith("You have already claimed faucet in a lock time, try again later");
    });
});
