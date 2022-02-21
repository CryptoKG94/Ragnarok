export const BSC_BLOCK_TIME = 3

const MAINNET = 56
const TESTNET = 97
const ChainID = TESTNET

export const BASE_BSC_SCAN_URLS = {
    [MAINNET] : 'https://bscscan.com',
    [TESTNET] : 'https://testnet.bscscan.com'
}

export const NODE = {
    [MAINNET] : 'https://bsc-dataseed.binance.org',
    [TESTNET] : 'https://data-seed-prebsc-1-s1.binance.org:8545'
}

export const connectorLocalStorageKey = "connectorIdv2"
export const walletLocalStorageKey = "wallet";
export const id = "salary"
export const cakeId = "tether"
export const currency = "usd"
export const baseURLforIPFS = "https://worldofragnarok.mypinata.cloud/"
export const contractAddress = "0x9d6b8399cCDdD2812b519e4a34d71779F556377C"

export default {
    ChainID,
    Node: NODE[ChainID],
    WalletLocalStorageKey: walletLocalStorageKey,
    BASE_BSC_SCAN_URLS,
    BaseURLforIPFS : baseURLforIPFS,
    ContractAddress : contractAddress
};