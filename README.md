# Colony3 DAO

### Usage
- Deploy Governor

```
INIT_MEMBER=<address> INIT_AMOUNT=<number> npx hardhat run ./scripts/DeployGovernor.ts --network <network>

output:
GovernanceToken Deployed To 0xd6AEE7A43bDe4A1cf4014c925F07B93F7873c0f2
Minted 1000000 Token To 0x714Fbd78C8eEdf4F7f499E866c1C90d0E157a16D
GovernanceToken Verfied
Governor Deployed To  0x61CFce9Cac30e9e6bbCd2f44fC07440A03708BAf
Transferred Ownership To 0x61CFce9Cac30e9e6bbCd2f44fC07440A03708BAf
Governor Verfied
```

- Upgrade Governor

```
PROXY_ADDRESS=<address> npx hardhat run ./scripts/UpgradeGovernor.ts --network <network>

output:
GovernorV2 Deployed ===> 0x245643D3c02709fA59eFE88A8053B0c51555135D
GovernorV2 Verfied

note: Before upgrading, please define a new Governor contract with each version number incremented.
```
