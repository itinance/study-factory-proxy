// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "./BoxV1.sol";

contract BoxFactory is Initializable {
    event BoxDeployed(address instance);

    address private _impl;

    function initialize(address impl_) public initializer {
        _impl = impl_;
    }

    function impl() public view returns(address) {
        return _impl;
    }

    function createBox(uint _length, uint _width)
    public
    returns (address)
    {
        address clone = Clones.clone(_impl);
        BoxV1(clone).initialize(_length, _width);

        emit BoxDeployed(address(clone));

        return clone;
    }
}
