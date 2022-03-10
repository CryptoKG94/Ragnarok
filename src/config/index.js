import { sortBy } from "lodash"

export const BSC_BLOCK_TIME = 3

const MAINNET = 56
const TESTNET = 97

const POLYGON = 137
const MUMBAI = 80001

const ChainID = MUMBAI

export const CHAIN_NAME = {
    [MAINNET] : 'BSC Mainnet',
    [TESTNET] : 'BSC Testnet',
    [MUMBAI] : 'Polygon Testnet',
    [POLYGON] : 'Polgyon Mainnet'
}

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

export const NATIVE_CURRENCY = {
    [MAINNET]: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
    },
    [TESTNET]: {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
    },
    [MUMBAI]: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    },
    [POLYGON]: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
    }
}
export const connectorLocalStorageKey = "connectorIdv2"
export const walletLocalStorageKey = "wallet";
export const id = "salary"
export const cakeId = "tether"
export const currency = "usd"
export const baseURLforIPFS = "https://worldofragnarok.mypinata.cloud/"
export const contractAddress = "0x0416FD33c9f1Caa7a204A0afFb585b0e0CDEFfD7"

export const SECOND_TO_START = 864000 // 10 days
export const EndDay = new Date('Mar 12 2022 20:00:00');

export default {
    ChainID,
    CHAIN_NAME,
    NATIVE_CURRENCY,
    Node: NODE[ChainID],
    WalletLocalStorageKey: walletLocalStorageKey,
    BASE_BSC_SCAN_URLS,
    BaseURLforIPFS : baseURLforIPFS,
    ContractAddress : contractAddress
};