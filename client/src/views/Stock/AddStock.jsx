import React, { useState } from 'react'
import './add_stock.css'
import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/button'
import NumInput from '../../components/Form/NumInput/NumInput'

function AddStock() {
  const [numBox, setNumBox] = useState('')
  const [formData, setFormData] = useState({
    lotNo: '',
    desc: '',
    qty: '',
    price: ''
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

  return (
    <>
        <h1>Add Stock</h1>

        <div className='add_stock_container'>
            <form action="">
                <Input type='text' label='Lot No.' name='lotNo' value={ formData.lotNo } onChange={ handleInputChange } />
                <Input type='text' label='Description' value={ formData.desc } onChange={ handleInputChange } />
                <Input type='number' onClick={(e)=>handleNumBox(e, 'qty')} label='Qty' value={ formData.qty } readOnly/>
                <Input type='number' onClick={(e)=>handleNumBox(e, 'price')} label='Price' value={ formData.price } readOnly/>

                {
                  numBox && <NumInput closeNumBox={closeNumBox} submitNumBox={submitNumBox} name={numBox} value={ formData[numBox] } />
                }

                <div className="btn_group">
                  <Button btnType='grey' label='Reset' className='reset_btn' />
                  <Button btnType='primary' label='Next' className='submit_btn' />
                </div>
            </form>
        </div>
    </>
  )
}

export default AddStock