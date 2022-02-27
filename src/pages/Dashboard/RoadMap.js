import React from 'react'
import background from '../../assets/images/page_4_bg_4.png';
import ROAD_MAP from '../../assets/images/ROAD_MAP.png';
import ROADMAP from '../../assets/images/roadmap_.png';

export const RoadMap = () => {
    return (
        <>
            <div className="image_background page_four" >
                <img className="background_four" src={background} alt="Logo" />
                <img className="RoadMap_Custom" src={ROAD_MAP} alt="Logo" />
                <img className="roadmap_new" src={ROADMAP} alt="Logo" />
            </div>
        </>
    )
}
