import React from 'react'
import header_2 from '../../assets/images/page_header_1.png';

import '../../assets/styles/header.css'

export const Header = (props) => {

  const SetPage = (page) => {
    props.func(page);
  }

  return (
    <>
        <div className={'commanNavbar comman_header ' + props.headerClass} style={props.style}>
           
            <img src={props.image ? props.image : header_2} className="comman_header" alt="header"/>
              <div className="" id="navbarNav">
                <ul className="navbar-nav ">
                  {
                    props.headerPages ? props.headerPages.map((item,key)=>{
                      return(
                        <>
                          <li className={'nav-item item'+(key+1)} onClick={() => SetPage(item.scroll)}>
                            <a className="nav-link active" aria-current="page">{item.page}</a>
                          </li>
                        </>
                      )
                    }):''
                  }                    
                </ul>
              </div>
              {props.children}
        </div>
    </>
  )
}
