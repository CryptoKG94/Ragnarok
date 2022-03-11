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
    uint256 public devFee = 2500;   // 25%
    uint256 public marketFee = 0;
    uint256 public liquidityFee = 7500;

    address public devWallet = address(0);
    address public marketWallet = address(0);
    address public liquidityWallet = address(0);

    bool public publicSale = false;
    mapping(address => bool) private whitelist;

    mapping (uint256 => string) private revealURI;
    string public unrevealURI = "https://worldofragnarok.mypinata.cloud/ipfs/QmPNkvaNq7XKcvjkE6HtYJjZbLKeFoYA9XaRBGoJZq5Kto/";
    string[] public revealURIs;
    bool public reveal = false;

    bool public endSale = false;

    string private _baseURIextended;
    uint256 private _priceextended;     // usdc
    uint256 private _pricePrivate;      // usdc
    mapping (uint256 => bool) registerID;
    mapping (uint256 => uint256) public tokenIds;

    // increase price
    bool public increasePrice = false;

    IUniswapV2Router02 public uniswapV2Router;

    address public routerAddress = address(0x8954AfA98594b838bda56FE4C12a09D7739D179b);

    // mumbai router:   0x8954AfA98594b838bda56FE4C12a09D7739D179b

    address public constant stableToken = address(0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1);

    // DAI mumbai  0xcB1e72786A6eb3b44C2a2429e317c8a2462CFeb1
    // USDT polygon 0xc2132D05D31c914a87C6611C10748AEb04B58e8F

    uint256 public tokenMinted = 0;
    uint256 public subMintedCount = 0;

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdentifiers;

    uint256 private constant MAX_TOKENID_NUMBER = 200000;
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
        _priceextended = 10000000000000000000; // 10 usdc(now dai)
        _pricePrivate = 9500000000000000000;

        IUniswapV2Router02 _uniswapV2Router = IUniswapV2Router02(routerAddress);
        uniswapV2Router = _uniswapV2Router;
    }

    function setEndSale(bool _endSale) public onlyOwner {
        endSale = _endSale;
    }

    function getNFTBalance(address _owner) public view returns (uint256) {
       return ERC721.balanceOf(_owner);
    }

    function getNFTPrice() public view returns (uint256) {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        return getAmountsTokenForETH(_priceextended);
    }

    function getNFTPricePrivate() public view returns (uint256) {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");
        return getAmountsTokenForETH(_pricePrivate);
    }

    function _price() public view returns (uint256) {
        return _priceextended;
    }

    function setPrice(uint256 _priceextended_) external onlyOwner() {
        _priceextended = _priceextended_;
    }

    function _privatePrice() public view returns (uint256) {
        return _pricePrivate;
    }

    function setPrivatePrice(uint256 _privatePrice_) external onlyOwner() {
        _pricePrivate = _privatePrice_;
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

        if (increasePrice)
            subMintedCount += 1;
    }

    function mintNFT(uint256 _cnt) public payable {
        require(tokenMinted < MAX_NFT_SUPPLY, "Sale has already ended");

        uint256 salePrice = _priceextended;
        // slippage 5%
        uint256 minPriceForSale = getNFTPrice().mul(_cnt).mul(95).div(100);
        if ( !publicSale && whitelist[msg.sender] ) {
            salePrice = _pricePrivate;
            minPriceForSale = getNFTPricePrivate().mul(_cnt).mul(95).div(100);
            require(minPriceForSale <= msg.value, "ETH value sent is not correct");
        } else {
            require(minPriceForSale <= msg.value, "ETH value sent is not correct");
        }

        uint256 devFeePrice = msg.value * devFee /  feeDivisor;
        uint256 marketFeePrice = msg.value * marketFee /  feeDivisor;
        uint256 liquidityFeePrice = msg.value * liquidityFee /  feeDivisor;

        if (marketWallet != address(0) && marketFeePrice > 0) {
            (bool sent, ) = payable(marketWallet).call{value: marketFeePrice}("");
            require(sent, "Failed payment");
        }

        if (devWallet != address(0) && devFeePrice > 0) {
            (bool sent, ) = payable(devWallet).call{value: devFeePrice}("");
            require(sent, "Failed payment");
        }

        if (liquidityWallet != address(0) && liquidityFeePrice > 0) {
            (bool sent, ) = payable(liquidityWallet).call{value: liquidityFeePrice}("");
            require(sent, "Failed payment");
        }

        for(uint256 i = 0; i < _cnt; i++) {
            _tokenIdentifiers.increment();
            uint256 newRECIdentifier = random();

            // price increasing
            if (subMintedCount >= 1000) {
                subMintedCount = 0;
                _priceextended = _priceextended.mul(101).div(100);
                _pricePrivate = _pricePrivate.mul(101).div(100);
            }

            _safeMint(msg.sender, newRECIdentifier);
            registerID[newRECIdentifier] = true;
            tokenMinted += 1;
            tokenIds[newRECIdentifier] = tokenMinted;

            if (increasePrice)
                subMintedCount += 1;
        }

        emit MintNFT(tokenMinted, _msgSender(), _cnt, salePrice);
    }
    
    function setWhitelistAll(address[] memory _adds) public onlyOwner {
        for(uint256 i = 0; i < _adds.length; i++) {
            address tmp = address(_adds[i]);
            whitelist[tmp] = true;
        }
    }

    function removeBatchWhitelist(address[] calldata addrs) external onlyOwner {
        for (uint256 i = 0; i < addrs.length; i++) {
            require(addrs[i] != address(0), "Zero Address");
            whitelist[addrs[i]] = false;
        }
    }

    function isInWhitelist(address user) external view returns (bool) {
        return whitelist[user];
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
            return string(abi.encodePacked(
                _tokenURI,
                 tokenIds[tokenId].toString(),
                 ".json"));
        }

        return super.tokenURI(tokenIds[tokenId]);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseURIextended;
    }

    function setUnrevealURI(string memory _uri) external onlyOwner() {
        unrevealURI = _uri;
    }

    function setIncreasePrice(bool _bIncreasePrice) external onlyOwner() {
        increasePrice = _bIncreasePrice;
    }

    function setSaleType(bool _saleType) external onlyOwner() {
        publicSale = _saleType;
    }

    function setMarketWallet(address _addr) external onlyOwner {
        require(_addr != address(0), "Zero Address");
        marketWallet = _addr;
    }

    function setDevWallet(address _addr) external onlyOwner {
        require(_addr != address(0), "Zero Address");
        devWallet = _addr;
    }

    function setLiquidityWallet(address _addr) external onlyOwner {
        require(_addr != address(0), "Zero Address");
        liquidityWallet = _addr;
    }

    function setMarketFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 2500, "Tax can't be over 25%");
        marketFee = _newFee;
    }

    function setDevFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 2500, "Tax can't be over 25%");
        devFee = _newFee;
    }

    function setLiquidityFee(uint256 _newFee) external onlyOwner {
        require(_newFee <= 7500, "Tax can't be over 75%");
        liquidityFee = _newFee;
    }

    function getAmountsTokenForETH(uint256 busdAmount) internal view returns(uint256) {

        address[] memory path = new address[](2);
        path[0] = address(stableToken);
        path[1] = uniswapV2Router.WETH();

        uint256[] memory amountOutMins = uniswapV2Router.getAmountsOut(busdAmount, path);
        return amountOutMins[path.length - 1];
    }

    function withdraw() public onlyOwner {
        require(endSale, "Ongoing Minting");
        uint balance = address(this).balance;
        address payable ownerAddress = payable(msg.sender);
        ownerAddress.transfer(balance);
    }
}