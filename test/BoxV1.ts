import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import {ethers, upgrades} from "hardhat";

describe("BoxV1", function () {

  async function deployBoxV1_3x4() {
    try {
      const BoxV1 = await ethers.getContractFactory("BoxV1");
      const box = await upgrades.deployProxy(BoxV1, [3, 4]);

      return {box};
    }
    catch(e) {
      console.log(e);
      throw e;
    }
  }

  describe("Deployment", function () {
    it("Should deploy box 3x4", async function () {
      const {box} = await loadFixture(deployBoxV1_3x4);

      expect(await box.area()).to.equal(3 * 4);
    });
  })

});
