import { useState } from 'react'
import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'

function StockSearch({ filterSubmit, closeSearch, value }) {
    const [searchData, setSearchData] = useState({
        search: value.search || ''
    })

    const handleInputChange = (e) => {
        setSearchData({ ...searchData, [e.target.name]: e.target.value })
    }

    const handleFilterSubmit = (e) => {
        e.preventDefault()
        filterSubmit(searchData)
    }

  return (
    <div className="stock_filter">
        <div className="inner_filter">
            <div className="filter_heading">Search</div>
            <form className="filter_form" onSubmit={handleFilterSubmit}>
                <Input type='text' label='Search' name='search' value={ searchData.search } onChange={ handleInputChange } />

                <div className="btn_group">
                  <Button btnType='grey' label='Close' className='submit_btn' onClick={closeSearch}/>
                  <Button btnType='primary' label='Search' className='submit_btn' formBtnType='submit' />
                </div>
            </form>
        </div>
    </div>
  )
}

export default StockSearch