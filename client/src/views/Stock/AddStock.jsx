import React from 'react'
import './stock.css'
import StockForm from '../../components/Stock/StockForm'

function AddStock() {
  return (
    <>
        <h1>Add Stock</h1>

        <div className='add_stock_container'>
            <StockForm />
        </div>
    </>
  )
}

export default AddStock