import React from 'react'
import Footer_bar from '../assets/images/Footer_bar.png'

export const Footer = (props) => {
	return (
		<div className='footer_fixs'>
			<div className='foot_bar'>
				<div className="main_footer">
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="facebook" href="https://www.facebook.com/WorldOfRagnarokOfficial" rel="noopener noreferrer" aria-current="page" target="_blank">Facebook</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="twitter" href="https://twitter.com/WorldOfRagna" rel="noopener noreferrer" aria-current="page" target="_blank">Twitter</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="telegram" href="https://t.me/+p4YYrUcleiI5MzRl" rel="noopener noreferrer" aria-current="page" target="_blank">Telegram</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="medium" href="https://medium.com/@WorldofRagnarok" rel="noopener noreferrer" aria-current="page" target="_blank">Medium</a></div>
					<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><a className="discord" href="https://discord.gg/ysSHZQRsXs" rel="noopener noreferrer" aria-current="page" target="_blank">Discord</a></div>
				</div>
				<div className="last_footer">
					{/* <span className="ml-1">&copy; {new Date().getFullYear()} WOR. No copyright infringement intended.</span> */}
					<span className="ml-1">No copyright infringement intended.</span>
					<span className="ml-1">all credit goes to the rightful owner GRAVITY CO.</span>
				</div>
			</div>
			<img alt="" src={Footer_bar} />
		</div>
	)
}
