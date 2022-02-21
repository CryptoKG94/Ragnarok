import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import Contract from 'web3-eth-contract';
import { baseURLforIPFS, provider, contractAddress, walletLocalStorageKey } from '../config';
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
        if (chainId != 97) { //56: mainnet, 97: testnet
            return {
                address: "",
                status: "Please connect to the BSC Testnet."
            }
        }

        const accounts = await window.web3.eth.getAccounts();
        const address = accounts[0];

        window.localStorage.setItem(walletLocalStorageKey, address);

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
    window.localStorage.removeItem(walletLocalStorageKey);
    walletProvider = null
}

export const mintNFT = async (count) => {
    if (!walletProvider)
        return {
            success: false,
            status: 'Connect to Wallet'
        }
    const web3 = new Web3(walletProvider);
    let contract = await new web3.eth.Contract(contractABI, contractAddress)

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

export const getImageHash = async (hashVal) => {
    try {
        let response = await fetch(hashVal);
        let responseJson = await response.json();
        console.log(responseJson.image);

        return responseJson.image;
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
    let contract = await new web3.eth.Contract(contractABI, contractAddress)

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
            const imageUrl = await getImageHash(tokenUri + ".json")
            data.balance = balance
            data.tokenIds.push(tokenId)
            data.metadatas.push(baseURLforIPFS + imageUrl)
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
    Contract.setProvider(provider)
    let contract = new Contract(contractABI, contractAddress)
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
    let contract = await new web3.eth.Contract(contractABI, contractAddress)
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