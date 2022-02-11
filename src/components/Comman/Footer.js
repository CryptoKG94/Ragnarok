import React from 'react'

export const Footer = () => {
  return (
    <div className="footer_page">
        <div className="footer_custom">
            <a href="#" rel="noopener noreferrer">facebook</a>
            <a href="#" rel="noopener noreferrer">Twitter</a>
            <a href="#" rel="noopener noreferrer">Telegram</a>
            <a href="#" rel="noopener noreferrer">Medium</a>
            <a href="#" rel="noopener noreferrer">Discord</a>
        </div>
        <div className="footer_last">
            <span className="ml-1">&copy; {new Date().getFullYear()} WOR. No copyright infringement intended.</span>
            <span className="ml-1">All credit goes to the rightful owner GRAVITY CO.</span>
        </div>
    </div>
  )
}
