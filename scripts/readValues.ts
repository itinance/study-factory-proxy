// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("ethers");

async function main() {
    const provider = new ethers.providers.InfuraProvider(4, process.env.INFURA_API_KEY);
    const fABI = [
        'function createBox(uint _length, uint _width) public returns (address)',
        'function getInstancesCount() public view returns (uint256)',
        'function getInstance(uint256 index) public view returns (address)',
    ];

    const boxABI = [
        'function area() public view returns(uint)',
        'function width() public view returns(uint)',
    ];
    const contract = new ethers.Contract('0xbF8b3572a49FA0dd65ED4B17508c97E9cA09e5c5', fABI, provider);
    const count = (await contract.getInstancesCount()).toNumber();
    console.log(count);

    for(let i = 0; i < count; i++) {
        console.log("Load " + i);
        const impl = await contract.getInstance(i);
        console.log(' -> ' + impl);

        const box =  new ethers.Contract(impl, boxABI, provider);
        const area = await box.area();
        console.log(area);
    }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
