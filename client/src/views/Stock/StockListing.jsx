import React, { useEffect, useState } from 'react'
import './stock.css'
import { getApi } from '../../utils/helper'
import StockFilter from './StockFilter'
import StockSearch from './StockSearch'
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min'

function StockListing() {
    const [stocks, setStocks] = useState([])
    const [openFilter, setOpenFilter] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const history = useHistory();
    const location = useLocation();
    const params = new URLSearchParams(location)
    let queryString = params.get('search')
    
    let queryFilter = {}
    if(queryString) {
        queryString = queryString.replace("?", "")
        queryString = queryString.split("&")
        queryString.forEach((item) => {
            let tempKeyValue = item.split("=")
            queryFilter = {...queryFilter, [tempKeyValue[0]]: tempKeyValue[1]}
        })      
    }

    const [filterData, setFilterData] = useState(queryFilter)


    const getStocks = async () => {
        let filterUrl = []
        
        if(filterData) {
            let { from_date, to_date, search } = filterData;
    
            if(from_date) {
                filterUrl.push(`from_date=${from_date}`)
            }
            if(to_date) {
                filterUrl.push(`to_date=${to_date}`)
            }
            if(search) {
                filterUrl.push(`search=${search}`)
            }
        }

        filterUrl = filterUrl.join('&')
        
        let data = await getApi('stock?'+filterUrl)
        if(data.status) {
            const params = new URLSearchParams(filterData);
            history.replace({ pathname: location.pathname, search: params.toString() });
            
            setStocks(data.resp.data.stocks)
        }
    }

    // Filter
    const openFilterHandler = () => {
        setOpenFilter(true)
    }

    const handleFilterSubmit = (udpatedFilterData) => {
        setOpenFilter(false)
        setFilterData({...filterData, ...udpatedFilterData})
    }

    const closeFilter = (e) => {
        e.preventDefault()
        setOpenFilter(false)
    }

    // Search
    const handleSearchSubmit = (udpatedFilterData) => {
        setOpenSearch(false)
        setFilterData({...filterData, ...udpatedFilterData})
    }

    const openSearchHandler = () => {
        setOpenSearch(true)
    }

    const closeSearch = (e) => {
        e.preventDefault()
        setOpenSearch(false)
    }

    useEffect(()=>{
        getStocks()
    }, [filterData])

    useEffect(()=>{
        const params = new URLSearchParams(location)
        let queryString = params.get('search')
        
        if(queryString) {
            queryString = queryString.replace("?", "")
            queryString = queryString.split("&")
            let queryFilter = {}
            queryString.forEach((item, index) => {
                let tempKeyValue = item.split("=")
                queryFilter = {...queryFilter, [tempKeyValue[0]]: tempKeyValue[1]}
            })
            
            setFilterData(queryFilter)
        }
    }, [])

    const getDate = (date) => {
        const cDate = new Date(date)
        return cDate.toDateString()
    }

  return (
    <>
        {
            openFilter && <StockFilter filterSubmit={handleFilterSubmit} value={filterData} closeFilter={closeFilter}/>
        }
        {
            openSearch && <StockSearch filterSubmit={handleSearchSubmit} value={filterData} closeSearch={closeSearch}/>
        }
        <div className="heading_container">
            <h1>Stock Listing</h1>

            <div className="filter_box">
                <button className={`filter_icon ${ openFilter && 'clicked' }`} onClick={openFilterHandler}>
                    <img src="./filter.svg" alt="" />
                </button>
            </div>

            <div className="filter_box search_box">
                <button className={`filter_icon ${ openSearch && 'clicked' }`} onClick={openSearchHandler}>
                    <img src="./search.svg" alt="" />
                </button>
            </div>
        </div>

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

    </>
  )
}

export default StockListing