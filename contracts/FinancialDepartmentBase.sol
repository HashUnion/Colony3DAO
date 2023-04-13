// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./core/Upgradeable.sol";

contract FinancialDepartmentBase is Initializable, Upgradeable {
    function __FinancialDepartmentBase_init() internal onlyInitializing {
        __Upgradeable_init();
        __FinancialDepartmentBase_init_unchained();
    }

    function __FinancialDepartmentBase_init_unchained()
        internal
        onlyInitializing
    {}
}
