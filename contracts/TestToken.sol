//SPDX-License-Identifier: MIT
pragma solidity 0.8.10;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";

contract TestToken is ERC20Burnable {
    constructor() ERC20("Test Token", "TEST") {
        _mint(msg.sender, 100000000000000000000000000 * 10**18);
    }
}
