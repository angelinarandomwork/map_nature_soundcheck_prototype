import type { JSX } from 'react'
import './style.css'

export const Footer = (): JSX.Element => {

  const currentYear = new Date().getFullYear()
    
  return (
    <footer className="siteFooter" style={{background: 'var(--blue-low)'}}>
      <div className="siteFooterInner">© {currentYear}</div>
    </footer>
  )
}