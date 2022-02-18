import React from 'react'
import Footer_bar from '../../assets/images/Footer_bar.png'

export const Footer = () => {
  return (

    <div className='footer_fixs'>
      <div className='foot_bar'>
        <div className="main_footer">
          <a className="facebook" href="#" rel="noopener noreferrer">Facebook</a>
          <a className="twitter" href="#" rel="noopener noreferrer">Twitter</a>
          <a className="telegram" href="#" rel="noopener noreferrer">Telegram</a>
          <a className="medium" href="#" rel="noopener noreferrer">Medium</a>
          <a className="discord" href="#" rel="noopener noreferrer">Discord</a>
        </div>
        <div className="last_footer">
          <span className="ml-1">&copy; {new Date().getFullYear()} WOR. No copyright infringement intended.</span>
          <span className="ml-1">all credit goes to the rightful owner GRAVITY CO.</span>
        </div>
      </div>
      <img src={Footer_bar} />
    </div>
  )
}
