import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { postApi } from '../../utils/helper'
import Input from '../Form/Input/Input'
import NumInput from '../Form/NumInput/NumInput'
import Button from '../Form/Button/Button'

const StockForm = ({ stock }) => {
    let date = stock && stock.date ? new Date(stock.date) : ''
    const defaultValue = {
        lotNo: stock && stock.lotNo ? stock.lotNo : '',
        desc: stock && stock.desc ? stock.desc : '',
        qty: stock && stock.qty ? stock.qty : '',
        date: stock && stock.date ? date.getDate()+'-' + (date.getMonth()+1) + '-'+date.getFullYear() : ''
    }

    const [numBox, setNumBox] = useState('')
    const [formData, setFormData] = useState(defaultValue)

    const handleNumBox = (e, type) => {
        e.preventDefault()
        setNumBox(type)
    }

    const closeNumBox = (e) => {
        e.preventDefault()
        setNumBox('')
    }

    const submitNumBox = (e, result) => {
        e.preventDefault()
        setFormData({...formData, [numBox]: result})
        setNumBox('')
    }

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const submitHandler = async (e) => {
        e.preventDefault()
    
        let newStock = {
            lotNo: formData.lotNo,
            desc: formData.desc,
            qty: formData.qty,
            price: formData.price,
            date: formData.date
        };
        
        const data = await postApi('stock', newStock)
    
        if(data.status) {
          toast.success('Stock Added')
          setFormData(defaultValue)
        } else {
          toast.error('Something\'s Wrong')
        }
      }

    return (
        <form action="" onSubmit={ submitHandler }>
            <Input type='text' label='Lot No.' name='lotNo' value={ formData.lotNo } onChange={ handleInputChange } />
            <Input type='text' label='Description' name='desc' value={ formData.desc } onChange={ handleInputChange } />
            <Input type='text' onClick={(e)=>handleNumBox(e, 'qty')} label='Qty' value={ formData.qty } readOnly/>

            {
                numBox && <NumInput closeNumBox={closeNumBox} submitNumBox={submitNumBox} name={numBox} value={ formData[numBox] } />
            }

            <Input type='date' onChange={handleInputChange} name="date" label='Date' value={ formData.date }/>

            <div className="btn_group">
                <Button btnType='primary' label='Submit' className='submit_btn' formBtnType='submit' />
            </div>
        </form>
    )
}

export default StockForm