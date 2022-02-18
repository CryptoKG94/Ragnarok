import React from 'react'
import { PageOne } from '../GamePages/PageOne';
import { PageTwo } from '../GamePages/PageTwo';
import { PageThree } from '../GamePages/PageThree';
import PageFour from '../GamePages/PageFour';
import { Header } from '../Components/Header';
import { useRef } from 'react';
import { Footer } from '../Components/Footer';
import header_2 from '../../assets/images/page_header_1.png';

export const Dashboard = () => {
    let page1 = useRef(null);
    let page2 = useRef(null);
    let page3 = useRef(null);
    let page4 = useRef(null);
    let page5 = useRef(null);

    const pull_data = (page) => {  
      if (!page.current) return;
        page.current.scrollIntoView({ behavior: "smooth" });
    }

    const headerPages = [
        { 'page':'HOME', 'scroll':page1 },
        { 'page':'GETTING STARTED', 'scroll':page2 },
        { 'page':'TOKEMONICS', 'scroll':page3 },
        { 'page':'ROAD MAP', 'scroll':page4 },
        { 'page':'LITE PAPER', 'scroll':page5 }
    ];
      
    return (
        <>    
        <div className="Game_Start">
            <div className="App-intro">
            <Header  func={pull_data} headerPages={headerPages} image={header_2} headerClass={'dashboardHeader'}/>
                <div ref={page1}>
                <PageOne className="" />
                </div>
                <div ref={page2}>
                <PageTwo className="" />
                </div>
                <div ref={page3}>
                <PageThree className="" />
                </div>
                <div ref={page4}>
                <PageFour className="" />
                </div>
            </div>
            <Footer />
        </div>
        </>
    )
}
