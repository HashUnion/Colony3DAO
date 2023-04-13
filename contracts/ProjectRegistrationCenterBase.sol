// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./core/Upgradeable.sol";

contract ProjectRegistrationCenterBase is Initializable, Upgradeable {
    function __ProjectRegistrationCenterBase_init() internal onlyInitializing {
        __Upgradeable_init();
        __ProjectRegistrationCenterBase_init_unchained();
    }

    function __ProjectRegistrationCenterBase_init_unchained()
        internal
        onlyInitializing
    {}
}
