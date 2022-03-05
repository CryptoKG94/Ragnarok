import React from 'react'
import background from '../../assets/images/page_2_bg.png';
import getting_started_ from '../../assets/images/1_getting_started.png';
import mint_your_character from '../../assets/images/1-1_mint your_character.gif';
import organize_party from '../../assets/images/1-2_organize_party.gif';
import Adventure_Battle from '../../assets/images/1-3_Adventure_Battle.gif';
import getting_started_learn_more from '../../assets/images/getting_started_learn_more.png';
import { useHistory } from 'react-router-dom'
import Pdf from '../../assets/whitepaper.pdf';

export const GettingStarted = () => {
    const history = useHistory();
    return (
        <>
            <div className="image_background page_two">
                <img className="background_two" src={background} alt="Logo" />
                <div className="getting_started_images">
                    <img className="getting_started_ getting_started_bg" src={getting_started_} alt="Logo" />
                    <div className="getting_started_" style={{ padding: '50px' }}>
                        <div>
                        <img src={mint_your_character} alt="Logo" />
                        <div className="getting_started_learn_more">
                        <a href="https://medium.com/@WorldofRagnarok/nft-cosmetics-rarity-292146825c65"><img src={getting_started_learn_more}alt="Logo" /> </a>
                        </div>
                        </div>
                        <div>
                        <img src={organize_party} alt="Logo" />
                        <div className="getting_started_learn_more">
                        <a onClick={() => history.push("/partyhall")}><img src={getting_started_learn_more} alt="Logo" /></a>
                        </div>
                        </div>
                        <div>
                        <img src={Adventure_Battle} alt="Logo" />
                        <div className="getting_started_learn_more">
                            <a href={Pdf} rel="noopener noreferrer" target="_blank"><img src={getting_started_learn_more} alt="Logo" /></a>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
