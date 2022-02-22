import React from 'react'
import background from '../../assets/images/page_5_bg.png';
import background_slider from '../../assets/images/background_slider.png';
import { Slider } from '../../components/Slider';
import seasonal from "../../assets/images/buying/seasonal.png"

import Aura1 from "../../assets/images/buying/aura/1.jpg"
import Aura2 from "../../assets/images/buying/aura/2.jpg"
import Aura3 from "../../assets/images/buying/aura/3.jpg"
import Aura4 from "../../assets/images/buying/aura/4.jpg"
import Aura5 from "../../assets/images/buying/aura/5.jpg"
import Aura6 from "../../assets/images/buying/aura/6.jpg"
import Aura7 from "../../assets/images/buying/aura/7.jpg"
import Aura8 from "../../assets/images/buying/aura/8.jpg"

import Pet1 from "../../assets/images/buying/pet/1.jpg"
import Pet2 from "../../assets/images/buying/pet/2.jpg"
import Pet3 from "../../assets/images/buying/pet/3.jpg"
import Pet4 from "../../assets/images/buying/pet/4.jpg"
import Pet5 from "../../assets/images/buying/pet/5.jpg"
import Pet6 from "../../assets/images/buying/pet/6.jpg"
import Pet7 from "../../assets/images/buying/pet/7.jpg"
import Pet8 from "../../assets/images/buying/pet/8.jpg"
import Pet9 from "../../assets/images/buying/pet/9.jpg"
import Pet10 from "../../assets/images/buying/pet/10.jpg"
import Pet11 from "../../assets/images/buying/pet/11.jpg"
import Pet12 from "../../assets/images/buying/pet/12.jpg"

import Wing1 from "../../assets/images/buying/wing/1.jpg"
import Wing2 from "../../assets/images/buying/wing/2.jpg"
import Wing3 from "../../assets/images/buying/wing/3.jpg"
import Wing4 from "../../assets/images/buying/wing/4.jpg"
import Wing5 from "../../assets/images/buying/wing/5.jpg"
import Wing6 from "../../assets/images/buying/wing/6.jpg"



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
