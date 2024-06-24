import React, { useEffect, useState } from 'react'
import './stock.css'
import { getApi } from '../../utils/helper'
import StockFilter from './StockFilter'

function StockListing() {
    const [stocks, setStocks] = useState([])
    const [openFilter, setOpenFilter] = useState(false)

    const getStocks = async (filterData) => {
        let filterUrl = []
        
        if(filterData) {
            let { from_date, to_date } = filterData;
    
            if(from_date) {
                filterUrl.push(`from_date=${from_date}`)
            }
            if(to_date) {
                filterUrl.push(`to_date=${to_date}`)
            }
        }

        filterUrl = filterUrl.join('&')
        
        let data = await getApi('stock?'+filterUrl)
        if(data.status) {
            setStocks(data.resp.data.stocks)
        }
    }

    const openFilterHandler = () => {
        setOpenFilter(true)
    }

    const handleFilterSubmit = (filterData) => {
        setOpenFilter(false)
        getStocks(filterData)
    }

    useEffect(()=>{
        getStocks()
    }, [])

  return (
    <>
        {
            openFilter && <StockFilter filterSubmit={handleFilterSubmit} closeFilter={() => setOpenFilter(false)}/>
        }
        <div className="heading_container">
            <h1>Stock Listing</h1>

            <div className="filter_box">
                <button className={`filter_icon ${ openFilter && 'clicked' }`} onClick={openFilterHandler}>
                    <img src="./filter.svg" alt="" />
                </button>
            </div>
        </div>

        <div className="stock_listing_container" style={{ marginTop: "20px" }}>
            {
                stocks && stocks.map((item, index) => {
                    return (
                        <div key={index}>
                            <div style={{ border: "1px solid #333", marginBottom: "10px", padding: "10px" }}>
                                <p>Lot No. <b>{item.lotNo}</b></p>
                                <p>Desc. <b>{item.desc}</b></p>
                                <p>Date. <b>{item.date}</b></p>
                                <p>Qty. <b>{item.qty}</b></p>
                                <p>Price <b>{item.price}</b></p>
                                <p>Total <b>{item.qty * item.price}</b></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>

    </>
  )
}

export default StockListing