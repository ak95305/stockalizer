import React, { useEffect, useState } from 'react'
import './add_stock.css'
import axios from 'axios'
import { getApi } from '../../utils/helper'

function StockListing() {
    const [stocks, setStocks] = useState([])

    const getStocks = async () => {
        let data = await getApi('stock')
        if(data.status) {
            setStocks(data.resp.data.stocks)
        }
    }

    useEffect(()=>{
        getStocks()
    }, [])

  return (
    <>
        <h1>Stock Listing</h1>

        <div className="stock_listing_container" style={{ marginTop: "20px" }}>
            {
                stocks && stocks.map((item, index) => {
                    return (
                        <div key={index}>
                            <div style={{ border: "1px solid #333", marginBottom: "10px", padding: "10px" }}>
                                <p>Lot No. <b>{item.lotNo}</b></p>
                                <p>Desc. <b>{item.desc}</b></p>
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