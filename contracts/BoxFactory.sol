// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

import "./BoxV1.sol";

contract BoxFactory is Initializable {
    event BoxDeployed(address instance);

    address private _impl;

    address[] private _instances;

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

        _instances.push(address(clone));

        emit BoxDeployed(address(clone));

        return clone;
    }

    /**
     * @dev Returns the number of deployed tokens.
     */
    function getInstancesCount() public view returns (uint256) {
        return _instances.length;
    }

    /**
      * @dev Returns one of the instances. `index` must be a
     * value between 0 and {getInstancesCount}, non-inclusive.
     *
     * Tokens are not sorted in any particular way, and their ordering may
     * change at any point.
     */
    function getInstance(uint256 index) public view returns (address) {
        if (index >= _instances.length) {
            revert("Index out of bounds");
        }
        return _instances[index];
    }

}
