# Study

This study shows some weird stuff that makes testing factories with hardhat impossible at the moment.

The goal of this repository is to implement an upgradeable factory, which clones an upgradebale contract (BoxV1)
and makes it testable. 

Deployed on rinkeby, everything works fine and we can use it and play around.

But when we want to write tests on cloned instances, some weird error messages appear:

>   BoxFactory:
>   Deployment
>   Should be able to accass properties of the box:
>   Error: call revert exception [ See: https://links.ethers.org/v5-errors-CALL_EXCEPTION ] (method="width()", data="0x", errorArgs=null, errorName=null, errorSignature=null, reason=null, code=CALL_EXCEPTION, version=abi/5.7.0)
>   at Logger.makeError (node_modules/@ethersproject/logger/src.ts/index.ts:269:28)
>   at Logger.throwError (node_modules/@ethersproject/logger/src.ts/index.ts:281:20)


# Development:
```shell
yarn install
yarn build
yarn test
```

# Deployment

Copy `.env.dist` to `.env`

Fill out the corresponding variables and the Mnemonic for Deployer wallet in
`MNEMONIC=` 

An Infura (https://infura.io/) account is required for deployment. The free account is sufficient.

# Unit-Tests and Gas consumption

![image info](./docs/unit-tests-and-gas-consumption.png)
