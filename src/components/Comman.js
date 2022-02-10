import React from 'react'
import header_2 from '../assets/images/all_page_header.png';
import p1 from '../assets/images/1.png';
import p2 from '../assets/images/2.png';
import p3 from '../assets/images/3.png';
import p4 from '../assets/images/4.png';
import p5 from '../assets/images/5.png';

export const Comman = (props) => {
  const SetPage = (page) => {
    props.func(page);
  }

  return (
    <>
        <div className="commanNavbar comman_header">
          {/* <div className="customHeader">
            <img src={p1} className="comman_header"/>
            <img src={p2} className="comman_header"/>
            <img src={p3} className="comman_header"/>
            <img src={p4} className="comman_header"/>
            <img src={p5} className="comman_header"/>
          </div> */}
            <img src={header_2} className="comman_header"/>
            <nav class="Page_Navbar">
                <div class="" id="navbarNav">
                <ul class="navbar-nav ">
                    <li class="nav-item item1" onClick={() => SetPage(props.page1)}>
                    <a className="nav-link active" aria-current="page">HOME</a>
                    </li>
                    <li className="nav-item item2" onClick={() => SetPage(props.page2)}>
                    <a className="nav-link">GETTING STARTED</a>
                    </li>
                    <li className="nav-item item3 tokeminics" onClick={() => SetPage(props.page3)}>
                    <a className="nav-link">TOKEMONICS</a>
                    </li>
                    <li className="nav-item item4 roadmap" onClick={() => SetPage(props.page4)}>
                    <a className="nav-link">ROAD MAP</a>
                    </li>
                    <li className="nav-item item5 litepaper">
                    <a className="nav-link">LITE PAPER</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </>
  )
}
