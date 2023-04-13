// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./GovernorBase.sol";

contract GovernorV1 is Initializable, GovernorBase {
    function initialize(
        string calldata name_,
        IVotesUpgradeable token_
    ) public initializer {
        __GovernorBase_init(name_, token_);
    }
}
