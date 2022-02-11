import React from 'react'
import background from '../../assets/images/page_2_bg.png';
import GETTING_STARTED from '../../assets/images/GETTING_STARTED.png';

export const PageTwo = () => {
  return (
    <>
        <div className="image_background page_two">
            <img className="background_two" src={background}  alt="Logo" />
            <img className="GETTING_STARTED" src={GETTING_STARTED}  alt="Logo" />
        </div>
    </>
  )
}
