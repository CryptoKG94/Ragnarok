import React from 'react'
import background from '../assets/images/page_2_bg.png';
import GETTING_STARTED from '../assets/images/GETTING_STARTED.png';
import { Comman } from './Comman';

export const PageTwo = () => {
  return (
    <>
        <div className="image_background page_two" style={{ backgroundImage: `url(${background})` }}>
            {/* <Comman /> */}
            <img className="GETTING_STARTED" src={GETTING_STARTED} />
        </div>
    </>
  )
}
