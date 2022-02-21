import React from 'react'
import background from '../../assets/images/page_5_bg.png';
import background_slider from '../../assets/images/background_slider.png';
import { Slider } from '../../components/Slider';
import seasonal from "../../assets/images/buying/seasonal.png"

import Aura1 from "../../assets/images/buying/Character Aura/1.png"
import Aura2 from "../../assets/images/buying/Character Aura/2.png"
import Aura3 from "../../assets/images/buying/Character Aura/3.png"
import Aura4 from "../../assets/images/buying/Character Aura/4.png"
import Aura5 from "../../assets/images/buying/Character Aura/5.png"
import Aura6 from "../../assets/images/buying/Character Aura/6.png"
import Aura7 from "../../assets/images/buying/Character Aura/7.png"
import Aura8 from "../../assets/images/buying/Character Aura/8.png"

import Pet1 from "../../assets/images/buying/Character Pet/1.png"
import Pet2 from "../../assets/images/buying/Character Pet/2.png"
import Pet3 from "../../assets/images/buying/Character Pet/3.png"
import Pet4 from "../../assets/images/buying/Character Pet/4.png"
import Pet5 from "../../assets/images/buying/Character Pet/5.png"
import Pet6 from "../../assets/images/buying/Character Pet/6.png"
import Pet7 from "../../assets/images/buying/Character Pet/7.png"
import Pet8 from "../../assets/images/buying/Character Pet/8.png"
import Pet9 from "../../assets/images/buying/Character Pet/9.png"
import Pet10 from "../../assets/images/buying/Character Pet/10.png"
import Pet11 from "../../assets/images/buying/Character Pet/11.png"
import Pet12 from "../../assets/images/buying/Character Pet/12.png"

import Wing1 from "../../assets/images/buying/wings/1.png"
import Wing2 from "../../assets/images/buying/wings/2.png"
import Wing3 from "../../assets/images/buying/wings/3.png"
import Wing4 from "../../assets/images/buying/wings/4.png"
import Wing5 from "../../assets/images/buying/wings/5.png"
import Wing6 from "../../assets/images/buying/wings/6.png"



const AuraList = [Aura1, Aura2, Aura3, Aura4, Aura5, Aura6, Aura7, Aura8,];
const PetList = [Pet1, Pet2, Pet3, Pet4, Pet5, Pet6, Pet7, Pet8, Pet9, Pet10, Pet11, Pet12,];
const WingList = [Wing1, Wing2, Wing3, Wing4, Wing5, Wing6];

export const AssetsSlider = () => {
    return (
        <>
            {/* <div className="image_background page_five"> */}
            {/* <img className="background_five" src={background}  alt="Logo" /> */}
            {/* </div> */}

            {/* <div className="party_hall_slider col-md-12">
            <SliderParty />
        </div>
        <div className="party_hall_slider col-md-12">
            <SliderParty />
        </div> */}
            <div style={{ marginTop: '10vw', textAlign: 'center', marginBottom: '10vw' }}>
                <img src={seasonal} alt="" style={{ width: '39vw', height: '3.3vw' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'relative', height: '550px' }}>
                {/* <div style={{ position: 'relative', height: '100%' }}> */}
                <div className="party_hall_slider col-md-12" style={{ top: 0 }}>
                    <Slider images={AuraList} />
                </div>
                <div className="party_hall_slider col-md-12" style={{ top: '150px' }}>
                    <Slider images={PetList} />
                </div>
                <div className="party_hall_slider col-md-12" style={{ top: '300px' }}>
                    <Slider images={WingList} />
                </div>
                {/* </div> */}
            </div>
        </>
    )
}
