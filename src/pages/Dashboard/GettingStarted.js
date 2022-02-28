import React from 'react'
import background from '../../assets/images/page_2_bg.png';
import GETTING_STARTED from '../../assets/images/GETTING_STARTED.png';
import getting_started_ from '../../assets/images/1_getting_started.png';
import mint_your_character from '../../assets/images/1-1_mint your_character.gif';
import organize_party from '../../assets/images/1-2_organize_party.gif';
import Adventure_Battle from '../../assets/images/1-3_Adventure_Battle.gif';

export const GettingStarted = () => {
    return (
        <>
            <div className="image_background page_two">
                <img className="background_two" src={background} alt="Logo" />
                <img className="GETTING_STARTED" src={GETTING_STARTED} alt="Logo" />
                <div className="getting_started_images">
                    <img className="getting_started_ getting_started_bg" src={getting_started_} alt="Logo" />
                    <div className="getting_started_" style={{ padding: '50px' }}>
                        <img src={mint_your_character} alt="Logo" />
                        <img src={organize_party} alt="Logo" />
                        <img src={Adventure_Battle} alt="Logo" />
                    </div>
                </div>
            </div>
        </>
    )
}
