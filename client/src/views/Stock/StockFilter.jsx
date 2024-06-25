import React, { useState } from 'react'
import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'

function StockFilter({ filterSubmit, closeFilter, value }) {
    const [fitlerData, setFilterData] = useState({
        from_date: value.from_date || '',
        to_date: value.to_date || ''
    })

    const handleInputChange = (e) => {
        setFilterData({ ...fitlerData, [e.target.name]: e.target.value })
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        filterSubmit(fitlerData)
    }

    const resetFilter = () => {
        setFilterData({
            from_date: '',
            to_date: ''
        })
    }

  return (
    <div className="stock_filter">
        <div className="inner_filter">
            <div className="filter_heading">Fitler</div>
            <form className="filter_form" onSubmit={handleFilterSubmit}>
                <Input type='date' label='From Date' name='from_date' value={ fitlerData.from_date } onChange={ handleInputChange } />
                <Input type='date' label='To Date' name='to_date' value={ fitlerData.to_date } onChange={ handleInputChange } />

                <div className="btn_group">
                  <Button btnType='grey' label='Close' className='submit_btn' onClick={closeFilter}/>
                  <Button btnType='primary' label='Reset' className='submit_btn' onClick={resetFilter}/>
                  <Button btnType='primary' label='Submit' className='submit_btn' formBtnType='submit' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default StockFilter