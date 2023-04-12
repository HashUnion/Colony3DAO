// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/cryptography/draft-EIP712.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/draft-ERC721Votes.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GovernanceToken is
    ERC721,
    ERC721URIStorage,
    Ownable,
    EIP712,
    ERC721Votes
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor(
        string memory name_,
        string memory symbol_
    ) ERC721(name_, symbol_) EIP712(name_, "1") {}

    function _afterTokenTransfer(
        address from_,
        address to_,
        uint256 tokenId_,
        uint256 batchSize_
    ) internal override(ERC721, ERC721Votes) {
        super._afterTokenTransfer(from_, to_, tokenId_, batchSize_);
    }

    function _burn(
        uint256 tokenId_
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId_);
    }

    function tokenURI(
        uint256 tokenId_
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId_);
    }

    function mint(address to_, string memory uri_) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to_, tokenId);
        _setTokenURI(tokenId, uri_);
    }

    function burn(uint256 tokenId_) public onlyOwner {
        _burn(tokenId_);
    }
}
