import React from 'react'
import background from '../../assets/images/page_5_bg.png';
import background_slider from '../../assets/images/background_slider.png';
import { SliderParty } from '../Slider/SliderParty';

export const PageFive = () => {
  return (
    <>
        <div className="image_background page_five">
            <img className="background_five" src={background}  alt="Logo" />
        </div>
        <div className="party_hall_slider col-md-12">
            <SliderParty />
        </div>
    </>
  )
}