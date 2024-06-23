import React, { useState } from 'react'
import './add_stock.css'
import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'
import NumInput from '../../components/Form/NumInput/NumInput'
import { postApi } from '../../utils/helper'

function AddStock() {
  const [numBox, setNumBox] = useState('')
  const [apiMessage, setApiMessage] = useState('')
  const [formData, setFormData] = useState({
    lotNo: '',
    desc: '',
    qty: '',
    price: '',
    date: ''
  })

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
      setApiMessage('Success')
    } else {
      setApiMessage('Something\'s Wrong')
    }
  }

  const resetFormHandler = () => {
    setFormData({
      lotNo: '',
      desc: '',
      qty: '',
      price: '',
      date: ''
    })
  }

  return (
    <>
        <h1>Add Stock</h1>

        <div className='add_stock_container'>
            <form action="" onSubmit={ submitHandler }>
                <Input type='text' label='Lot No.' name='lotNo' value={ formData.lotNo } onChange={ handleInputChange } />
                <Input type='text' label='Description' name='desc' value={ formData.desc } onChange={ handleInputChange } />
                <Input type='text' onClick={(e)=>handleNumBox(e, 'qty')} label='Qty' value={ formData.qty } readOnly/>
                <Input type='text' onClick={(e)=>handleNumBox(e, 'price')} label='Price' value={ formData.price } readOnly/>

                <div className='total'>Total: <b>{formData.qty * formData.price}</b></div>

                {
                  numBox && <NumInput closeNumBox={closeNumBox} submitNumBox={submitNumBox} name={numBox} value={ formData[numBox] } />
                }

                <Input type='date' onChange={handleInputChange} name="date" label='Date' value={ formData.date }/>

                { apiMessage }
                <div className="btn_group">
                  <Button btnType='primary' label='Add' className='submit_btn' formBtnType='submit' />
                </div>
            </form>
        </div>
    </>
  )
}

export default AddStock