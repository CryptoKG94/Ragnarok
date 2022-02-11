// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RagnarokProject is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;

    bool public publicSale = true;
    mapping(address => bool) whitelist;

    mapping (uint256 => string) private revealURI;
    string public unrevealURI = "https://ipfs.io/ipfs/";
    string[] public revealURIs;
    bool public reveal = false;

    bool public endSale = false;

    string private _baseURIextended;
    uint256 private _priceextended;

    uint256 public tokenMinted = 0;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdentifiers;

    uint256 public constant MAX_NFT_SUPPLY = 10000;

    constructor() ERC721("Ragnarok Project", "Ragnarok") {
        _baseURIextended = "https://ipfs.io/ipfs/";
        _priceextended = 300000000000000000; // 0.3
    }

    function setEndSale(bool _endSale) public onlyOwner {
        endSale = _endSale;
    }

    function setWhitelist(address _add) public onlyOwner {
        require(_add != address(0), "Zero Address");
        whitelist[_add] = true;
    }

    function setWhitelistAll(address[] memory _adds) public onlyOwner {
        for(uint256 i = 0; i < _adds.length; i++) {
            address tmp = address(_adds[i]);
            whitelist[tmp] = true;
        }
    }

    function setPublicSale(bool _publicSale) public onlyOwner {
        publicSale = _publicSale;
    }

    function getNFTBalance(address _owner) public view returns (uint256) {
       return ERC721.balanceOf(_owner);
    }

    function getNFTPrice() public view returns (uint256) {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        return _priceextended;
    }

    function claimNFT() public onlyOwner {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");

        _tokenIdentifiers.increment();
        _safeMint(msg.sender, _tokenIdentifiers.current());
        tokenMinted += 1;
    }

    function mintNFT(uint256 _cnt) public payable {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        require(getNFTPrice().mul(_cnt) == msg.value, "ETH value sent is not correct");

        if(!publicSale) {
            require(whitelist[msg.sender], "Not ");
            require(_cnt <= 5, "Exceded the Minting Count");
        }

        for(uint256 i = 0; i < _cnt; i++) {
            _tokenIdentifiers.increment();
            _safeMint(msg.sender, _tokenIdentifiers.current());
            tokenMinted += 1;
        }
    }

    function batchURLs(string[] memory _revealURIs) public onlyOwner {
        for(uint i = 0; i < _revealURIs.length; i++) {
            revealURIs.push(_revealURIs[i]);
        }
    }

    function withdraw() public onlyOwner {
        require(endSale, "Ongoing Minting");
        uint balance = address(this).balance;
        address payable ownerAddress = payable(msg.sender);
        ownerAddress.transfer(balance);
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        require(_exists(tokenId), "ERC721URIStorage: URI query for nonexistent token");

        string memory _tokenURI;        
        if(reveal) {
            _tokenURI = revealURI[tokenId];
        } else {
            _tokenURI = unrevealURI;
        }
        string memory base = _baseURI();

        if (bytes(base).length == 0) {
            return _tokenURI;
        }

        if (bytes(_tokenURI).length > 0) {
            return string(abi.encodePacked(base, _tokenURI));
        }

        return super.tokenURI(tokenId);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function setBaseURI(string memory baseURI_) external onlyOwner() {
        _baseURIextended = baseURI_;
    }

    function setUnrevealURI(string memory _uri) external onlyOwner() {
        unrevealURI = _uri;
    }

    function Reveal() public onlyOwner() {
        reveal = true;
    }

    function UnReveal() public onlyOwner() {
        reveal = false;
    }

    function _price() public view returns (uint256) {
        return _priceextended;
    }

    function setPrice(uint256 _priceextended_) external onlyOwner() {
        _priceextended = _priceextended_;
    }

    function setRevealURI(uint256 tokenId, string memory _tokenURI) internal virtual {
        require(_exists(tokenId), "ERC721URIStorage: URI set of nonexistent token");
        revealURI[tokenId] = _tokenURI;
    }
}