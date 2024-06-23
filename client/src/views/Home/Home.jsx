import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Home() {
  return (
    <>
        <div className="home_container">
            <div className="option_box">
                <div className="option_heading">Stocks</div>
                <div className="option_lists">
                    <div className="opt">
                        <Link to="/stocks">
                            <div className="opt_inner">
                                <div className="opt_icon">
                                    <img src="./layers.svg" alt="" />
                                </div>
                                <div className="opt_title">
                                    Stock Listing
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className="opt">
                        <Link to="/add-stock">
                            <div className="opt_inner">
                                <div className="opt_icon">
                                    <img src="./layers.svg" alt="" />
                                </div>
                                <div className="opt_title">
                                    Add Stock
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Home