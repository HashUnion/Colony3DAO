// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts-upgradeable/governance/GovernorUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/governance/extensions/GovernorSettingsUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/governance/extensions/GovernorCountingSimpleUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/governance/extensions/GovernorVotesQuorumFractionUpgradeable.sol";

import "./core/Upgradeable.sol";

abstract contract GovernorBase is
    Initializable,
    GovernorUpgradeable,
    GovernorSettingsUpgradeable,
    GovernorCountingSimpleUpgradeable,
    GovernorVotesUpgradeable,
    GovernorVotesQuorumFractionUpgradeable,
    Upgradeable
{
    function __GovernorBase_init(
        string memory name_,
        IVotesUpgradeable token_
    ) internal onlyInitializing {
        __Governor_init(name_);
        __GovernorSettings_init(1, 150, 1);
        __GovernorCountingSimple_init();
        __GovernorVotes_init(token_);
        __GovernorVotesQuorumFraction_init(50);
        __Upgradeable_init();
        __GovernorBase_init_unchained();
    }

    function __GovernorBase_init_unchained() internal onlyInitializing {}

    function version()
        public
        view
        virtual
        override(GovernorUpgradeable, Upgradeable)
        returns (string memory)
    {
        return Upgradeable.version();
    }

    function votingDelay()
        public
        view
        override(IGovernorUpgradeable, GovernorSettingsUpgradeable)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernorUpgradeable, GovernorSettingsUpgradeable)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(
        uint256 blockNumber_
    )
        public
        view
        override(IGovernorUpgradeable, GovernorVotesQuorumFractionUpgradeable)
        returns (uint256)
    {
        return super.quorum(blockNumber_);
    }

    function proposalThreshold()
        public
        view
        override(GovernorUpgradeable, GovernorSettingsUpgradeable)
        returns (uint256)
    {
        return super.proposalThreshold();
    }
}
