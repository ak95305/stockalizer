import React from 'react'

function Table({ stocks }) {
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
    <div className="stock_listing_container table" style={{ marginTop: "20px" }}>
        <table border="1" style={{ borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Type</th>
                </tr>
            </thead>
            <tbody>
            {
                stocks && stocks.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.phonenumber}</td>
                            <td>{getType(item.type)}</td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </div>
  )
}

export default Table