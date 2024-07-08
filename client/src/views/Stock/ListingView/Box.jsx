import React, { useState } from 'react'
import { getApi } from '../../../utils/helper';
import StockForm from '../../../components/Stock/StockForm';
import toast from 'react-hot-toast';

function Box({ stocks, getStocks }) {
    const [openFormData, setOpenFormData] = useState(null)

    const getDate = (date) => {
        const cDate = new Date(date)
        return cDate.toDateString()
    }

    let firstClick;
    let clickInterval;
    const handleCardClick = (e) => {
        if(firstClick) {
            openEditForm(e)
            clearInterval(clickInterval)
            firstClick = false
        } else {
            firstClick = true
        }

        clickInterval = setTimeout(()=>{
            firstClick = false
        }, 1000)
    }

    const openEditForm = async (e) => {
        let clickedStockBox = e.target.closest(".stock_box")
        let stockId = clickedStockBox.getAttribute("data-id")

        let stock = await getApi(`stock/${stockId}`)
        if(stock.status) {
            setOpenFormData(stock.resp.data.stock)
        } else {
            toast.error("Something\'s Wrong")
        }
    }

    const closeEditForm = () => {
        setOpenFormData(null)
        getStocks()
    }

    return (
        <div className="stock_listing_container" style={{ marginTop: "20px" }}>
            {
                openFormData ? 
                <div className="edit_form_holder">
                    <div className="cross_img" onClick={() => {setOpenFormData(false)}}>
                        <img src='./cross.svg' />
                    </div>
                    <StockForm stock={openFormData} type="edit" closeEditForm={closeEditForm}/>
                </div>
                : ''
            }
            {
                stocks && stocks.map((item, index) => {
                    return (
                        <div key={index} className='stock_box' data-id={item._id} onClick={handleCardClick}>
                            <div>
                                <p>Lot No. <b>{item.lotNo}</b></p>
                                <p>Desc. <b>{item.desc}</b></p>
                                <p className='date_box'>{getDate(item.date)}</p>
                                <p>Qty. <b>{item.qty}</b></p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Box