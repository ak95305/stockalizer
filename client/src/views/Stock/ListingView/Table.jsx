import React from 'react'

function Table({ stocks }) {
    const getDate = (date) => {
        const cDate = new Date(date)
        return cDate.toDateString()
    }

  return (
    <div className="stock_listing_container table" style={{ marginTop: "20px" }}>
        <table border="1" style={{ borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Lot No.</th>
                    <th>Desc.</th>
                    <th>Qty.</th>
                    <th>Price</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
            {
                stocks && stocks.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{getDate(item.date)}</td>
                            <td>{item.lotNo}</td>
                            <td>{item.desc}</td>
                            <td>{item.qty}</td>
                            <td>{item.price}</td>
                            <td>{item.qty * item.price}</td>
                        </tr>
                    )
                })
            }
            <tr>
                <td></td>
                <td></td>
                <td></td>
                <td><b>{stocks.reduce((total, item) => total+item.qty, 0)}</b></td>
                <td>Avg. <i>{stocks.reduce((total, item) => total+item.price, 0)/stocks.length}</i></td>
                <td><b>{stocks.reduce((total, item) => total+(item.qty*item.price), 0)}</b></td>
            </tr>
            </tbody>
        </table>
    </div>
  )
}

export default Table