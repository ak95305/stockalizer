import React from 'react'

function Box({ stocks }) {
    const getDate = (date) => {
        const cDate = new Date(date)
        return cDate.toDateString()
    }

  return (
    <div className="stock_listing_container" style={{ marginTop: "20px" }}>
        {
            stocks && stocks.map((item, index) => {
                return (
                    <div key={index} className='stock_box'>
                        <div>
                            <p>Lot No. <b>{item.lotNo}</b></p>
                            <p>Desc. <b>{item.desc}</b></p>
                            <p className='date_box'>{getDate(item.date)}</p>
                            <p>Qty. <b>{item.qty}</b></p>
                            <p>Price <b>{item.price}</b></p>
                            <p className='total_box'>Total: {item.qty * item.price}</p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Box