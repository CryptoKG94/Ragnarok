import React from 'react'
import background from '../../assets/images/PAGE1_bg.png';
import PAGE_1_play from '../../assets/images/PAGE_1_PLAYNOW.png';
import PLAY_TO_EARN from '../../assets/images/PLAY_TO_EARN.png';
import { useHistory } from 'react-router-dom'

export const PageOne = () => {
  const history = useHistory();
  return (
    <>
        <div className="image_background page_one">
            <img className="background_one" src={background}  alt="Logo" />
            <img className="PLAY_TO_EARN" src={PLAY_TO_EARN} alt="Logo" />
            <img className="PAGE_1_play" src={PAGE_1_play}  onClick={() => history.push("/createParty")} alt="Logo" />
        </div>
    </>
  )
}
