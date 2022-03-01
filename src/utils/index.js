import supportedChains from './chains'
import * as config from '../config'

export const getChainData = (chainId) => {
    if(!chainId) {
        return null
    }
    const chainData = supportedChains.filter(
        (chain) => chain.chain_id === chainId
    )[0]

    if(!chainData) {
        throw new Error("ChainId missing or not supported")
    }

    const API_KEY = process.env.INFURA_ID
    if (
        chainData.rpc_url.includes('infura.io') &&
        chainData.rpc_url.includes('%API_KEY%') &&
        API_KEY
    ) {
        const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY)

        return {
            ...chainData,
            rpc_url: rpcUrl
        }
    }

    return chainData
}

export const ellipseAddress = (address = '', width = 4) => {
    if(!address)
        return ''
    return `${address.slice(0, width)}...${address.slice(-width)}`
}

export const formatSize = (size) => {
    let sz = parseInt(size * 100 / 1024.0) / 100.0;
    if(sz > 1024)
    {
        sz = parseInt(sz * 100 / 1024.0) / 100.0;
        return sz + "MB"
    }
    return sz + "KB";
}

export const allocateTimeUnits = (timeDifference) => {
    const milliSecondsInASecond = 1000;
    const hoursInADay = 24;
    const minutesInAnHour = 60;
    const SecondsInAMinute  = 60;
    let secondsToDday = Math.floor((timeDifference) / (milliSecondsInASecond) % SecondsInAMinute);
    let minutesToDday = Math.floor((timeDifference) / (milliSecondsInASecond * minutesInAnHour) % SecondsInAMinute);
    let hoursToDday = Math.floor((timeDifference) / (milliSecondsInASecond * minutesInAnHour * SecondsInAMinute) % hoursInADay);
    let daysToDday = Math.floor((timeDifference) / (milliSecondsInASecond * minutesInAnHour * SecondsInAMinute * hoursInADay));

    let strTime = daysToDday + " Day " + hoursToDday + " Hour " + minutesToDday + " Min " + secondsToDday + " Sec"
    return strTime;
}