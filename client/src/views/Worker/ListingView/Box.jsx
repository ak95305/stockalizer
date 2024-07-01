import React from 'react'

function Box({ stocks }) {
    const getDate = (date) => {
        const cDate = new Date(date)
        return cDate.toDateString()
    }

    const getType = (type) => {
        switch (type) {
            case 1: 
                return 'Tailor'
            case 2: 
                return 'Fitup/Overlock/Belt'
            case 3: 
                return 'Packing'
            case 4: 
                return 'Pressman'
            case 5: 
                return 'Cutting Master'
            case 6: 
                return 'Rikshaw'
        }
    }

  return (
    <div className="stock_listing_container" style={{ marginTop: "20px" }}>
        {
            stocks && stocks.map((item, index) => {
                return (
                    <div key={index} className='stock_box'>
                        <div>
                            <p>Name. <b>{item.name}</b></p>
                            <p>Phonenumber. <b>{item.phonenumber}</b></p>
                            {/* <p className='date_box'>{getDate(item.date)}</p> */}
                            <p>Type. <b>{getType(item.type)}</b></p>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}

export default Box