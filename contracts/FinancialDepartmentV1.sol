// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./FinancialDepartmentBase.sol";

contract IFinancialDepartmentV1 is Initializable, FinancialDepartmentBase {
    function initialize() public initializer {
        __FinancialDepartmentBase_init();
    }
}
