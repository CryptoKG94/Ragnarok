import React from 'react'
import header_2 from '../assets/images/all_page_header.png';

export const Comman = () => {
  return (
    <>
        <div className="commanNavbar comman_header">
            <img src={header_2} className="comman_header"/>
            <nav class="navbar navbar-expand-lg navbar-light bg-light Page_Navbar">
                <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ">
                    <li class="nav-item">
                    <a className="nav-link active" aria-current="page" href="#">HOME</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">GETTING STARTED</a>
                    </li>
                    <li className="nav-item tokeminics">
                    <a className="nav-link" href="#">TOKEMONICS</a>
                    </li>
                    <li className="nav-item roadmap">
                    <a className="nav-link" href="#">ROAD MAP</a>
                    </li>
                    <li className="nav-item litepaper">
                    <a className="nav-link" href="#">LITE PAPER</a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    </>
  )
}
