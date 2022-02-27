import React from 'react'
import header_2 from '../assets/images/page_header_1.png';
import { useHistory } from 'react-router-dom'
import '../assets/styles/header.css'

export const Header = (props) => {
	const history = useHistory();
	const SetPage = (page) => {
		if(!page) return;
		props.func(page);
	}

	return (
		<>
			<div className={'commanNavbar comman_header ' + props.headerClass} style={props.style}>
				<img src={props.image ? props.image : header_2} className="comman_header" alt="header" />
				<div className="" id="navbarNav">
					<div className={`header_title item0`} onClick={()=>history.push("/")} style={{width: '12vw', height: '8.6vw'}}></div>
					{
						props.headerPages ? props.headerPages.map((item, key) => {
							return (
								<div className={`header_title item${key+1}`} key={key} onClick={() => SetPage(item.target)}>
									<a className="nav-link active" aria-current="page" target={item.href ? '_blank' : '_self'} href={item.href}>{item.page}</a>
								</div>
							)
						}) : ''
					}
				</div>
				{props.children}
			</div>
		</>
	)
}
