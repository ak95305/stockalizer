import React, { useEffect, useState } from 'react'
import './add_stock.css'
import axios from 'axios'

function StockListing() {
    const [stocks, setStocks] = useState([])

    useEffect(()=>{
        axios
        .get("http://localhost:3000/api/stock")
        .then((resp)=>{
          setStocks(resp.data.stocks)
        })
        .catch((err)=>{
          console.log(err)
        })
    }, [])

  return (
    <>
        <h1>Stock Listing</h1>

        <div className="stock_listing_container">
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