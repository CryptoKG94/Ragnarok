import React from 'react'
import { Home } from './Home';
import { GettingStarted } from './GettingStarted';
import { Tokenomics } from './Tokenomics';
import { RoadMap } from './RoadMap';
import { Header } from '../../components/Header';
import { useRef } from 'react';
import { Footer } from '../../components/Footer';
import header_2 from '../../assets/images/page_header_1.png';
import pdf from '../../assets/World-of-Ragnarok-Official-White-Paper.pdf'

export const Dashboard = () => {
    let home = useRef(null);
    let gettingStarted = useRef(null);
    let tokenomics = useRef(null);
    let roadMap = useRef(null);
    let litePaper = useRef(null);

    const headerFuncs = (page) => {
        if (!page.current) return;
        page.current.scrollIntoView({ behavior: "smooth" });
    }

    const headerPages = [
        { page: 'HOME', target: home },
        { page: 'GETTING STARTED', target: gettingStarted },
        { page: 'TOKENOMICS', target: tokenomics },
        { page: 'ROAD MAP', target: roadMap },
        { page: 'LITEPAPER', target: null, href: pdf }
    ];

    return (
        <>
            <div className="Game_Start">
                <div className="App-intro">
                    <Header func={headerFuncs} headerPages={headerPages} image={header_2} headerClass={'dashboardHeader'} />
                    <div ref={home}>
                        <Home className="" />
                    </div>
                    <div ref={gettingStarted}>
                        <GettingStarted className="" />
                    </div>
                    <div ref={tokenomics}>
                        <Tokenomics className="" />
                    </div>
                    <div ref={roadMap}>
                        <RoadMap className="" />
                    </div>
                    <div style={{ position: 'absolute', bottom: '-300vh', width: '100%', height: '100%' }}>
                        <Footer />
                    </div>
                </div>
            </div>
        </>
    )
}
