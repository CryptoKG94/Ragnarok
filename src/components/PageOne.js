import React from 'react'
import background from '../assets/images/PAGE1_bg.png';
import PAGE_1_play from '../assets/images/PAGE_1_PLAYNOW.png';

export const PageOne = () => {
  return (
    <>
        <div className="image_background page_one">
            <img className="background_one" src={background} />
            <img className="PAGE_1_play" src={PAGE_1_play} />
        </div>
    </>
  )
}
