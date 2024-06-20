// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./ProjectRegistrationCenterBase.sol";
import "./interfaces/IProjectRegistrationCenterV1.sol";

contract ProjectRegistrationCenterV1 is
    Initializable,
    ProjectRegistrationCenterBase
{
    function initialize() public initializer {
        __ProjectRegistrationCenterBase_init();
    }
}
