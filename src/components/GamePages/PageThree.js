import React from 'react'
import background from '../../assets/images/page_3_bg_3.png';
import TOKENOMICS from '../../assets/images/TOKENOMICS.png';

export const PageThree = () => {
  return (
    <>
        <div className="image_background page_three">
            <img className="background_three" src={background} alt="Logo"  />
            <img className="Tokenomics_Custom" src={TOKENOMICS}  alt="Logo" />
        </div>
    </>
  )
}
