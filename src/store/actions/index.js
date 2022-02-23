import { 
    createAction as action, 
    createAsyncAction as asyncAction 
} from 'typesafe-actions';

export const getNFTInfo = asyncAction(
    'GET_NFT_PRICE',
    'GET_NFT_PRICE_SUCCESS',
    'GET_NFT_PRICE_FAIL'
)();