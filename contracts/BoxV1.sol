// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract BoxV1 is Initializable {

    uint public width;
    uint public length;

    function initialize(uint _length, uint _width) public initializer {
        length = _length;
        width = _width;
    }

    function area() public view returns(uint) {
        return length * width;
    }
}
