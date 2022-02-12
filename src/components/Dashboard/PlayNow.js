import React from 'react'
import { Header } from '../Comman/Header';
import header_2 from '../../assets/images/page_header_2.png';
import header_logo from '../../assets/images/CONTACT_WALL.png';
import { PageSix } from '../GamePages/PageSix';
import { PageFive } from '../GamePages/PageFive';
import { useRef } from 'react';
import { Footer } from '../Comman/Footer';

export const PlayNow = () => {
    let page5 = useRef(null);
    let page6 = useRef(null);

    const headerPages = [
        { 'page':'VALHALLA', 'scroll':page5 },
        { 'page':'PARTY HALL', 'scroll':page6 },
        { 'page':'ADVENTURE', 'scroll':null },
        { 'page':'MARKET PLACE', 'scroll':null },
        { 'page':'WEDDING HALL', 'scroll':null }
      ];
      const pull_data = (page) => {  
        if (!page.current) return;
          page.current.scrollIntoView({ behavior: "smooth" });
      }
      
      return (
        <>
            <Header func={pull_data} headerPages={headerPages} image={header_2} headerClass={'palyNowHeader'}/>
            <img src={header_logo} className='header_con' />
            <div ref={page5}>
              <PageFive className="" />
            </div>
            {/* <div ref={page6}>
              <PageSix className="" />
            </div> */}
            <Footer />
        </>
      )
}
