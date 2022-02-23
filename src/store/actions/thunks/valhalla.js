import ContractUtils from '../../../utils/contractUtils';
import * as actions from '../../actions';

export const getNFTInfo = () => async (dispatch) => {

  dispatch(actions.getNFTInfo.request(true));
  try {
    const nftPrice = await ContractUtils.getNFTPrice();

    if (nftPrice.success) {
      dispatch(actions.getNFTInfo.success(nftPrice.status));
    } else {
      dispatch(actions.getNFTInfo.failure(nftPrice.status));  
    }
  } catch (err) {
    dispatch(actions.getNFTInfo.failure(err));
  }
};