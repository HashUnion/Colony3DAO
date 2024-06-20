// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

abstract contract Upgradeable is
    Initializable,
    OwnableUpgradeable,
    UUPSUpgradeable
{
    uint16 private _version;

    function __Upgradeable_init() internal onlyInitializing {
        __Ownable_init();
        __UUPSUpgradeable_init();
        __Upgradeable_init_unchained();
    }

    function __Upgradeable_init_unchained() internal onlyInitializing {
        _version = 1;
    }

    function version() public view virtual returns (string memory) {
        return Strings.toString(_version);
    }

    function _authorizeUpgrade(
        address /*newImplementation_*/
    ) internal override onlyOwner {
        _version++;
    }
}
