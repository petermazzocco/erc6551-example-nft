// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Corgi is ERC1155, Ownable {
    mapping(address => bool) public hasMinted; // track if user has minted
    bool public active = true; // default to true

    constructor()
        ERC1155(
            "https://sblabs.mypinata.cloud/ipfs/Qmeji1kHmGJBVDKLRXRXG42viH3mog5rQY3kNWgusGgP8h"
        )
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public {
        require(active, "Contract is paused");
        require(!hasMinted[msg.sender], "You can only mint one token");
        _mint(account, id, amount, data);
        hasMinted[msg.sender] = true;
    }

    function isActive(bool _active) public onlyOwner {
        active = _active;
    }
}
