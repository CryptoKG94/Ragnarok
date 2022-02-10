import React from 'react'
import header_2 from '../assets/images/all_page_header.png';

export const Comman = (props) => {
  const SetPage = (page) => {
    props.func(page);
  }

  return (
    <>
        <div className="commanNavbar comman_header">
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
