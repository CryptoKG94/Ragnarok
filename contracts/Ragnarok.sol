// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./uniswapv2/interfaces/IUniswapV2Router02.sol";

contract WorldOfRagnarok is ERC721Enumerable, Ownable {
    using Strings for uint256;
    using SafeMath for uint256;

    uint256 public feeDivisor = 10000;
    uint256 public devFee = 1000;   // 1000: 10%
    uint256 public marketFee = 1000;
    uint256 public otherFee = 1000;

    address public devWallet = address(0);
    address public marketWallet = address(0);
    address public otherWallet = address(0);

    bool public publicSale = true;
    mapping(address => bool) whitelist;

    mapping (uint256 => string) private revealURI;
    string public unrevealURI = "https://gateway.pinata.cloud/ipfs/";
    string[] public revealURIs;
    bool public reveal = false;

    bool public endSale = false;

    string private _baseURIextended;
    uint256 private _priceextended;  // busd
    mapping (uint256 => bool) registerID;
    mapping (uint256 => uint256) public tokenIds;

    IUniswapV2Router02 public uniswapV2Router;

    address public routerAddress = address(0x8954AfA98594b838bda56FE4C12a09D7739D179b);

    // pancakeswap testnet router address
    // testnet PCS router: 0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3
    // mainnet PCS V2 router: 0x10ED43C718714eb63d5aA57B78B54704E256024E

    // mumbai router:   0x8954AfA98594b838bda56FE4C12a09D7739D179b
    // polygon router:  0xa5E0829CaCEd8fFDD4De3c43696c57F7D7A678ff -- not confirmed

    address public constant stableToken = address(0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1);
    // BUSD mainnet 0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56
    // BUSD testnet 0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7

    // DAI mumbai  0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1
    // USDT polygon 

    uint256 public tokenMinted = 0;
    uint256 public subMintedCount = 0;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdentifiers;

    uint256 private constant MAX_TOKENID_NUMBER = 1 * 10 ** 7;
    uint256 public constant MAX_NFT_SUPPLY = 200000;

    
    /**
     * @dev Emitted when new Token minted.
     */
    event MintNFT(
        uint256 indexed tokenId,
        address indexed minter, 
        uint256 tokenCount,
        uint256 tokenPrice
    );


    constructor() ERC721("World of Ragnarok", "WOR") {
        _baseURIextended = "https://ipfs.io/ipfs/";
        _priceextended = 10000000000000000000; // 10 DAI
        // _priceextended = 10000000000000000; // 0.01 MATIC

        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(routerAddress);
        uniswapV2Router = _uniswapV2Router;
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

    function getNFTBalance(address _owner) public view returns (uint256) {
       return ERC721.balanceOf(_owner);
    }

    function getNFTPrice() public view returns (uint256) {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        return getAmountsTokenForETH(_priceextended);
        // return _priceextended;
    }

    function getNFTPriceStable() public view returns (uint256) {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        return _priceextended;
    }

    function getAmountsTokenForETH(uint256 busdAmount) internal view returns(uint256) {

        address[] memory path = new address[](2);
        path[0] = address(stableToken);
        path[1] = uniswapV2Router.WETH();

        uint256[] memory amountOutMins = uniswapV2Router.getAmountsOut(busdAmount, path);
        return amountOutMins[path.length - 1];
    }

    function random() internal returns (uint) {
        uint256 ran = 0;
        while(true) {
            ran = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, _tokenIdentifiers.current()))).mod(MAX_TOKENID_NUMBER);
            if(registerID[ran] == false)
                break;
            _tokenIdentifiers.increment();
        }
        return ran;        
    }

    function claimNFT() public onlyOwner {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");

        _tokenIdentifiers.increment();
        uint256 newRECIdentifier = random();
        _safeMint(msg.sender, newRECIdentifier);
        registerID[newRECIdentifier] = true;
        tokenMinted += 1;
        tokenIds[newRECIdentifier] = tokenMinted;
        subMintedCount += 1;
    }

    function mintNFT(uint256 _cnt) public payable {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        // slippage 1%
        uint256 minPriceForSale = getNFTPrice().mul(_cnt).mul(99).div(100);
        require(minPriceForSale <= msg.value, "ETH value sent is not correct");

        if(!publicSale) {
            require(whitelist[msg.sender], "Not ");
            require(_cnt <= 5, "Exceded the Minting Count");
        }

        uint256 devFeePrice = msg.value * devFee /  feeDivisor;
        uint256 marketFeePrice = msg.value * marketFee /  feeDivisor;
        uint256 otherFeePrice = msg.value * otherFee /  feeDivisor;

        if (marketWallet != address(0) && devFeePrice > 0) {
            (bool sent, ) = payable(marketWallet).call{value: marketFeePrice}("");
            require(sent, "Failed payment");
        }

        if (devWallet != address(0) && devFeePrice > 0) {
            (bool sent, ) = payable(devWallet).call{value: devFeePrice}("");
            require(sent, "Failed payment");
        }

        if (otherWallet != address(0) && devFeePrice > 0) {
            (bool sent, ) = payable(otherWallet).call{value: otherFeePrice}("");
            require(sent, "Failed payment");
        }

        for(uint256 i = 0; i < _cnt; i++) {
            _tokenIdentifiers.increment();
            uint256 newRECIdentifier = random();

            // price increasing
            if (subMintedCount >= 1000) {
                subMintedCount = 0;
                _priceextended = _priceextended.mul(101).div(100);
            }

            _safeMint(msg.sender, newRECIdentifier);
            registerID[newRECIdentifier] = true;
            tokenMinted += 1;
            tokenIds[newRECIdentifier] = tokenMinted;
            subMintedCount += 1;
        }

        emit MintNFT(tokenMinted, _msgSender(), _cnt, _priceextended);
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
            return string(abi.encodePacked(_tokenURI, tokenIds[tokenId].toString()));
        }

        return super.tokenURI(tokenIds[tokenId]);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function setUnrevealURI(string memory _uri) external onlyOwner() {
        unrevealURI = _uri;
    }

    function _price() public view returns (uint256) {
        return _priceextended;
    }

    function setPrice(uint256 _priceextended_) external onlyOwner() {
        _priceextended = _priceextended_; // as busd
    }

    function setMarketWallet(address _addr) external onlyOwner {
        require(_addr != address(0), "Zero Address");
        marketWallet = _addr;
    }

    function setDevWallet(address _addr) external onlyOwner {
        require(_addr != address(0), "Zero Address");
        devWallet = _addr;
    }

    function setOtherWallet(address _addr) external onlyOwner {
        require(_addr != address(0), "Zero Address");
        otherWallet = _addr;
    }

    function setMarketFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Tax can't be over 10%");
        marketFee = _newFee;
    }

    function setDevFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Tax can't be over 10%");
        devFee = _newFee;
    }

    function setOtherFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 1000, "Tax can't be over 10%");
        otherFee = _newFee;
    }
}