import React from 'react'
import background from '../assets/images/page_3_bg_3.png';
import TOKENOMICS from '../assets/images/TOKENOMICS.png';
import { Comman } from './Comman';

export const PageThree = () => {
  return (
    <>
        <div className="image_background page_three" style={{ backgroundImage: `url(${background})` }}>
            {/* <Comman /> */}
            <img className="Tokenomics_Custom" src={TOKENOMICS} />
        </div>
    </>
  )
}
