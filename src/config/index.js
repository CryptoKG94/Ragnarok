import { sortBy } from "lodash"

export const BSC_BLOCK_TIME = 3

const MAINNET = 56
const TESTNET = 97

const POLYGON = 137
const MUMBAI = 80001

const ChainID = MUMBAI

export const BASE_BSC_SCAN_URLS = {
    [MAINNET] : 'https://bscscan.com',
    [TESTNET] : 'https://testnet.bscscan.com',
    [MUMBAI] : 'https://mumbai.polygonscan.com',
    [POLYGON] : 'https://polygonscan.com'
}

export const NODE = {
    [MAINNET] : 'https://bsc-dataseed.binance.org',
    [TESTNET] : 'https://data-seed-prebsc-1-s1.binance.org:8545',
    [MUMBAI] : 'https://matic-mumbai.chainstacklabs.com',
    [POLYGON] : 'https://polygon-rpc.com/'
}

export const SortOption = {
    CLASSES: 'Class',
    LEVEL: 'Level',
    GENDER: 'Gender',
    UPPER: 'Headgear Upper',
    MID: 'Headgear Mid',
    LOWER: 'Headgear Lower'
}

export const connectorLocalStorageKey = "connectorIdv2"
export const walletLocalStorageKey = "wallet";
export const id = "salary"
export const cakeId = "tether"
export const currency = "usd"
export const baseURLforIPFS = "https://worldofragnarok.mypinata.cloud/"
export const contractAddress = "0x1dfA69312d07C76422547b808CD8692b11b89370"

export const SECOND_TO_START = 864000 // 10 days

export default {
    ChainID,
    Node: NODE[ChainID],
    WalletLocalStorageKey: walletLocalStorageKey,
    BASE_BSC_SCAN_URLS,
    BaseURLforIPFS : baseURLforIPFS,
    ContractAddress : contractAddress
};