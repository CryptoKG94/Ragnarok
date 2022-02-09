import React from 'react'
import background from '../assets/images/page_4_bg_4.png';
import { Comman } from './Comman';
import ROAD_MAP from '../assets/images/ROAD_MAP.png';


export default function PageFour() {
  return (
    <>
        <div className="image_background page_four" style={{ backgroundImage: `url(${background})` }}>
            {/* <Comman /> */}
            <img className="RoadMap_Custom" src={ROAD_MAP} />
        </div>
    </>
  )
}
