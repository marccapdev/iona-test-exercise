import React from 'react'
import { Link } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <nav className='header__nav'>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
