import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';
import {ethers} from "hardhat";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log} = deployments;

    const {deployer} = await getNamedAccounts();
    console.log("Deployer", deployer)

    const box = await deployments.get('BoxV1');
    console.log('BoxV1-Address:', box.address)

    try {
        const instance = await deploy('BoxFactory', {
            from: deployer,
            log: true,
            proxy: {
                proxyContract: "OpenZeppelinTransparentProxy",
                execute: {
                    methodName: "initialize",
                    args: [box.address],
                }
            },

            autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
        });

        log("Factory: " + instance.address);

        // The transaction that was sent to the network to deploy the Contract
        log("- Transaction: " + instance.transactionHash);

        log("Ready.");
    }
    catch(e) {
        console.log(e);
    }

};
export default func;
func.dependencies = ['BoxV1'];
func.tags = ['BoxFactory'];
