import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import Contract from 'web3-eth-contract';
import Constants from '../config';
import BigNumber from "bignumber.js";

const Web3 = require('web3');
const jsonFile = require("../contracts/RagnarokProject.json");
const contractABI = jsonFile["abi"];

let walletProvider = null;
let walletAddress = "";

const providerOptions = {
    walletconnect: {
        package: WalletConnectProvider, // required
        options: {
            infuraId: "460f40a260564ac4a4f4b3fffb032dad", // required
            bridge: "https://bridge.walletconnect.org"
        }
    }
};

const web3Modal = new Web3Modal({
    network: "testnet", // optional
    cacheProvider: false, // optional
    disableInjectedProvider: false,
    providerOptions // required
});

export const getBNBDecimals = () => {
    return 18;
}

export const getWalletProvider = () => {
    return walletProvider;
}
export const getWalletAddres = () => {
    return walletAddress
}

export const getAccountInfo = async () => {

    try {
        // const provider = localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER");
        // Check if browser is running Metamask
        let web3;
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
        } else if (window.web3) {
            web3 = new Web3(window.web3.currentProvider);
        };

        // Check if User is already connected by retrieving the accounts
        const accounts = await web3.eth.getAccounts();

        return {
            address: accounts[0],
            status: ""
        }

    } catch (err) {
        return {
            address: "",
            status: err.message
        }
    }
}

export const setupNetwork = async () => {
    const provider = window.ethereum
    if (provider) {
        // const chainId = parseInt(process.env.REACT_APP_CHAIN_ID, 10)
        const chainId = Constants.ChainID
        try {
            await provider.request({
                method: 'wallet_addEthereumChain',
                params: [
                    {
                        chainId: `0x${chainId.toString(16)}`,
                        chainName: 'Binance Smart Chain Mainnet',
                        nativeCurrency: {
                            name: 'BNB',
                            symbol: 'bnb',
                            decimals: 18,
                        },
                        rpcUrls: [Constants.Node],
                        blockExplorerUrls: [Constants.BASE_BSC_SCAN_URLS[chainId]],
                    },
                ],
            })
            return true
        } catch (error) {
            console.error('Failed to setup the network in Metamask:', error)
            return false
        }
    } else {
        console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
        return false
    }
}

export const connectWallet = async () => {
    try {
        //console.log("Wallet Connecting ... ")
        await web3Modal.clearCachedProvider()
        const provider = await web3Modal.connect()
        window.web3 = new Web3(provider)
        //console.log("web3")

        window.web3.eth.extend({
            methods: [
                {
                    name: "chainId",
                    call: "eth_chainId",
                    outputFormatter: window.web3.utils.hexToNumber
                }
            ]
        });

        const chainId = await window.web3.eth.chainId();
        if (chainId != Constants.ChainID) { //56: mainnet, 97: testnet
            await setupNetwork();
        }

        provider.on("chainChanged", (chainId) => {
            setupNetwork();
        });

        const accounts = await window.web3.eth.getAccounts();
        const address = accounts[0];

        window.localStorage.setItem(Constants.WalletLocalStorageKey, address);

        walletProvider = provider;
        walletAddress = address;
        //console.log("Connected WalletAddress: ", walletAddress)
        if (accounts.length > 0) {
            return {
                address: walletAddress,
                status: "Success"
            }
        } else {
            return {
                address: "",
                status: "Connect to wallet"
            }
        }
    } catch (err) {
        return {
            address: "",
            status: err.message
        }
    }

}
export const isWalletConnected = () => {
    if (walletProvider !== null && walletProvider !== undefined) return true;
    return false;
}

export const disconnectWallet = async () => {
    //console.log("IsConneted: ", isWalletConnected())
    //console.log("WalletProvider: ", walletProvider)
    await web3Modal.clearCachedProvider()
    if (walletProvider?.disconnect && typeof walletProvider.disconnect === 'function') {
        await walletProvider.disconnect()
    }
    window.localStorage.removeItem(Constants.WalletLocalStorageKey);
    walletProvider = null
}

export const mintNFT = async (count) => {
    if (!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    let contract = await new web3.eth.Contract(contractABI, Constants.ContractAddress)

    try {
        const nftPrice = await contract.methods.getNFTPrice().call();
        let subMintedCount = await contract.methods.subMintedCount().call();

        let price = new BigNumber(nftPrice);
        let amount = new BigNumber(0); // = price.multipliedBy(count);

        for (let i = 0; i < count; i++) {
            if (subMintedCount === 1000) {
                subMintedCount = 0;
                price = price.multipliedBy(101).dividedBy(100);
            }
            subMintedCount++;
            amount = amount.plus(price);
        }

        await contract.methods.mintNFT(count).send({ from: walletAddress, value: amount });
        return {
            success: true,
            status: 'Success'
        }
    } catch (err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const getMetaData = async (hashVal) => {
    try {
        let response = await fetch(hashVal);
        let responseJson = await response.json();
        console.log(responseJson.image);

        return responseJson;
    } catch (error) {
        console.error(error);
        return "";
    }
}

export const getAssetInfo = async () => {
    if (!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    let contract = await new web3.eth.Contract(contractABI, Constants.ContractAddress)

    try {
        let data = {
            balance: 0,
            tokenIds: [],
            metadatas: []
        };

        const balance = await contract.methods.balanceOf(walletAddress).call()

        for (let i = 0; i < balance; i++) {
            const tokenId = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call()
            const tokenUri = await contract.methods.tokenURI(tokenId).call()
            const metadata = await getMetaData(tokenUri + ".json")
            console.log('[kg] => imageURL: ', metadata.image);
            data.balance = balance
            data.tokenIds.push(tokenId)
            // data.metadatas.push(Constants.BaseURLforIPFS + imageUrl)
            data.metadatas.push(metadata);
        }
        return {
            success: true,
            status: data
        }
    } catch (err) {
        //console.log("getAssetInfo: err=", err)
        return {
            success: false,
            status: err.message
        }
    }
}

export const getTokenURI = async (tokenId) => {
    Contract.setProvider(Constants.NODE)
    let contract = new Contract(contractABI, Constants.ContractAddress)
    try {
        let res = await contract.methods.tokenURI(tokenId).call()
        return {
            success: true,
            status: res
        }
    } catch (err) {
        return {
            success: false,
            status: err.message
        }
    }
}

export const withdraw = async () => {
    if (!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    let contract = await new web3.eth.Contract(contractABI, Constants.ContractAddress)
    try {
        await contract.methods.withdraw().send();
        return {
            success: true,
        }
    } catch (err) {
        return {
            success: false,
            status: err.message
        }
    }
}

const ContractUtils = {
    getBNBDecimals,
    getWalletProvider,
    getWalletAddres,
    connectWallet,
    disconnectWallet,
    isWalletConnected,
    mintNFT,
    getAssetInfo,
    getAccountInfo,
    getTokenURI,
    withdraw
};

export default ContractUtils;