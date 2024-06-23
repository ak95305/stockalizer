import React from 'react'
import "./home.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

function Home() {
  const navigations = [
    {
        id: 'stocks',
        title: 'Stocks',
        options: [
            {
                id: 1,
                title: 'Stock Listings',
                url: '/stocks',
                icon_url: './layers.svg'
            },
            {
                id: 2,
                title: 'Add Stock',
                url: '/add-stock',
                icon_url: './layers_add.svg'
            }
        ]
    },
    {
        id:'workers',
        title: 'Workers',
        options: [
            {
                id: 1,
                title: 'Workers Listings',
                url: '/workers',
                icon_url: './layers.svg'
            },
            {
                id: 2,
                title: 'Add Worker',
                url: '/add-worker',
                icon_url: './layers_add.svg'
            }
        ]
    }
  ]

  return (
    <>
        <div className="home_container">
            {
                navigations && navigations.map((item, index) => {
                    return (
                        <div className="option_box" key={item.id}>
                            <div className="option_heading">{ item.title }</div>
                            <div className="option_lists">
                                {
                                    item.options && item.options.map((item, index) => {
                                        return (
                                            <div className="opt" key={item.id}>
                                                <Link to={item.url}>
                                                    <div className="opt_inner">
                                                        <div className="opt_icon">
                                                            <img src={item.icon_url} alt="" />
                                                        </div>
                                                        <div className="opt_title">
                                                            {item.title}
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </>
  )
}

export default Home