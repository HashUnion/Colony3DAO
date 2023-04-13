// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/draft-ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";

contract GovernanceToken is
    ERC20,
    ERC20Burnable,
    Ownable,
    ERC20Permit,
    ERC20Votes
{
    constructor(
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_) ERC20Permit(name_) {}

    function decimals() public pure override returns (uint8) {
        return 2;
    }

    function mint(address to_, uint256 amount_) public onlyOwner {
        _mint(to_, amount_);
    }

    // The following functions are overrides required by Solidity.

    function _afterTokenTransfer(
        address from_,
        address to_,
        uint256 amount_
    ) internal override(ERC20, ERC20Votes) {
        super._afterTokenTransfer(from_, to_, amount_);
    }

    function _mint(
        address to_,
        uint256 amount_
    ) internal override(ERC20, ERC20Votes) {
        super._mint(to_, amount_);
    }

    function _burn(
        address account_,
        uint256 amount_
    ) internal override(ERC20, ERC20Votes) {
        super._burn(account_, amount_);
    }
}
