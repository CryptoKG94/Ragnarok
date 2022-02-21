import React from 'react'
import Footer_bar from '../assets/images/Footer_bar.png'

export const Footer = (props) => {
	return (
		<div className='footer_fixs'>
			<div className='foot_bar'>
				<div className="main_footer">
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="facebook" href="#" rel="noopener noreferrer">Facebook</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="twitter" href="#" rel="noopener noreferrer">Twitter</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="telegram" href="#" rel="noopener noreferrer">Telegram</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="medium" href="#" rel="noopener noreferrer">Medium</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="discord" href="#" rel="noopener noreferrer">Discord</a></div>
				</div>
				<div className="last_footer">
					<span className="ml-1">&copy; {new Date().getFullYear()} WOR. No copyright infringement intended.</span>
					<span className="ml-1">all credit goes to the rightful owner GRAVITY CO.</span>
				</div>
			</div>
			<img alt="" src={Footer_bar} />
		</div>
	)
}
