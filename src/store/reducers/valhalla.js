import { getType } from 'typesafe-actions';
import * as actions from '../actions';
import { initEntityState, entityLoadingStarted, entityLoadingSucceeded, entityLoadingFailed } from '../utils';

export const defaultState = {
    nftInfo: initEntityState(null),
};

const states = (state = defaultState, action) => {
    switch (action.type) {

        case getType(actions.getNFTInfo.request):
            return { ...state, nftInfo: entityLoadingStarted(state.nftInfo, action.payload) };
        case getType(actions.getNFTInfo.success):
            return { ...state, nftInfo: entityLoadingSucceeded(state.nftInfo, action.payload) };
        case getType(actions.getNFTInfo.failure):
            return { ...state, nftInfo: entityLoadingFailed(state.nftInfo) };

        default:
            return state;
    }
};

export default states;
