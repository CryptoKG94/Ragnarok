import React from 'react'
import background from '../../assets/images/page_3_bg_3.png';
import TOKENOMICS from '../../assets/images/TOKENOMICS.png';
import TOKENOMICS_ from '../../assets/images/tokenomics_.png';

export const Tokenomics = () => {
    return (
        <>
            <div className="image_background page_three">
                <img className="background_three" src={background} alt="Logo" />
                <img className="tokenomics_new" src={TOKENOMICS_} alt="Logo" />
                {/* <img className="Tokenomics_Custom" src={TOKENOMICS} alt="Logo" /> */}
            </div>
        </>
    )
}
