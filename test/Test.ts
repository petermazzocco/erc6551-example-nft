import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

describe("Corgi", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployCorgi() {
    // Contracts are deployed using the first signer/account by default
    const [owner] = await ethers.getSigners();

    const Corgi = await ethers.getContractFactory("Corgi");
    const corgi = await Corgi.deploy();

    return { corgi, owner };
  }

  describe("Mint", function () {
    it("should let someone only mint one", async function () {
      const { corgi, owner } = await loadFixture(deployCorgi);

      // Mint token for the owner account
      await corgi.mint(owner.address, 0, 1, "0x"); // '0x' represents empty data

      // Check balance of owner.address
      const balance = await corgi.balanceOf(owner.address, 0);
      expect(balance).to.equal(1);

      // Mint another token for the owner account
      await expect(corgi.mint(owner.address, 1, 1, "0x")).to.be.revertedWith(
        "You can only mint one token"
      );
    });
  });
});
