import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <header>
        <Link to="/">
          <div className="heading">Stockalizer</div>
        </Link>
    </header>
  )
}

export default Header