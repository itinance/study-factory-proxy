import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { expect } from "chai";
import {ethers, upgrades} from "hardhat";
import {ContractReceipt, ContractTransaction} from "ethers";
import {BoxFactory, BoxFactory__factory, BoxV1__factory} from "../typechain";
import {findEventArgsByNameFromReceipt} from "./lib/ethers-utils";


describe("BoxFactory", function () {

  async function deployFactory() {
    const boxV1Factory = (await ethers.getContractFactory('BoxV1')) as BoxV1__factory;
    const boxV1 = await upgrades.deployProxy(boxV1Factory, [0, 0])
    await boxV1.deployed();

    const boxFactoryFactory = (await ethers.getContractFactory('BoxFactory')) as BoxFactory__factory;

    const boxFactory = (await upgrades.deployProxy(boxFactoryFactory, [boxV1.address])) as BoxFactory;
    await boxFactory.deployed();

    console.log(1, boxFactory.address);

    return { boxFactory };
  }

  async function cloneMeABox_5x6() {
    const {boxFactory} = await loadFixture(deployFactory);

    const tokenTransaction: ContractTransaction = await boxFactory.createBox(5, 6 );

    const receipt: ContractReceipt = await tokenTransaction.wait();
    const boxAddress = findEventArgsByNameFromReceipt(receipt, 'BoxDeployed', 'instance');

    expect(boxAddress).to.be.properAddress;

    const contractFactory = (await ethers.getContractFactory('BoxV1')) as BoxV1__factory;
    const box = contractFactory.attach(boxAddress);

    return {box};
  }

  describe("Deployment", function () {
    it("Should deploy a factory", async function () {
      const {boxFactory, } = await loadFixture(deployFactory);

      expect(boxFactory.address).to.be.properAddress;
    });

    it("Should deploy a Box via factory", async function () {
      const {box} = await loadFixture(cloneMeABox_5x6);

      expect(box.address).to.be.properAddress;
    });

    it("Should be able to accass properties of the box", async function () {
      const {box} = await loadFixture(cloneMeABox_5x6);

      expect(await box.width()).to.eq(5);
    });

    it("Should be able to call functions on the box", async function () {
      const {box} = await loadFixture(cloneMeABox_5x6);

      expect(await box.area()).to.eq(5*6);
    });

  })

});
