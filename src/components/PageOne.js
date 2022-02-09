import React from 'react'
import background from '../assets/images/page_1_bg.png';
import PAGE_1_play from '../assets/images/PAGE_1_PLAY.png';
import { Comman } from './Comman';

export const PageOne = () => {
  return (
    <>
        <div className="image_background" style={{ backgroundImage: `url(${background})` }}>
            <Comman />
            <img className="PAGE_1_play" src={PAGE_1_play} />
        </div>
    </>
  )
}
