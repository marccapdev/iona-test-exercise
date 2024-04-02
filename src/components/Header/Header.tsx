import React from 'react'
import Logo from './Logo'
import Nav from './Nav'

const Header: React.FC = () => {
  return (
    <div className='header'>
      <div className="container">
        <div className="row">
          <div className="header__logo-wrapper col-6 col-md-3">
            <Logo />
          </div>
          <div className="header__nav-wrapper col-6 col-md-9">
            <Nav />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
