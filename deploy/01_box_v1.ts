import {HardhatRuntimeEnvironment} from 'hardhat/types';
import {DeployFunction} from 'hardhat-deploy/types';

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
    const {deployments, getNamedAccounts} = hre;
    const {deploy, log} = deployments;

    const {deployer} = await getNamedAccounts();
    console.log("Deployer", deployer)

        const instance = await deploy('BoxV1', {
            from: deployer,
            log: true,
            proxy: {
                proxyContract: "OpenZeppelinTransparentProxy",
                execute: {
                    methodName: "initialize",
                    args: [12, 4],
                }
            },
            autoMine: true, // speed up deployment on local network (ganache, hardhat), no effect on live networks
        });


        log("BoxV1: " + instance.address);

        log("- Transaction: " + instance.transactionHash);

        log("Ready.");
};

export default func;
func.tags = ['BoxV1'];
