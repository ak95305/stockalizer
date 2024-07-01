import React, { useState } from 'react'
import './worker.css'
import Input from '../../components/Form/Input/Input'
import Button from '../../components/Form/Button/Button'
import SelectI from '../../components/Form/Select/Select'
import { postApi } from '../../utils/helper'

// Worker Type
const workerTypes = [
  { value: 1, label: 'Tailor'},
  { value: 2, label: 'Fitup/Overlock/Belt'},
  { value: 3, label: 'Packing'},
  { value: 4, label: 'Pressman'},
  { value: 5, label: 'Cutting Master'},
  { value: 6, label: 'Rikshaw'},
  { value: 7, label: 'Ladies'},
]

function AddWorker() {
  const [formData, setFormData] = useState({
      name: '',
      phonenumber: '',
      type: ''
  })
  const [apiMessage, setApiMessage] = useState('')

  const handleWorkerSubmit = async (e) => {
    e.preventDefault()
    let newWorker = {
      name: formData.name,
      phonenumber: formData.phonenumber,
      type: formData.type,
    };
  
  const data = await postApi('worker', newWorker)

  if(data.status) {
    setApiMessage('Success')  
  } else {
    setApiMessage('Something\'s Wrong')
  }
  }

  return (
    <>
        <h1>Add Worker</h1>

        <div className='add_worker_container'>
            <form action="" onSubmit={handleWorkerSubmit}>
                <Input type='text' label='Name' name='name' value={ formData.name } onChange={ (e) => { setFormData({...formData, name: e.target.value}) } } />
                <Input type='text' label='Contact Number' name='phonenumber' value={ formData.phonenumber } onChange={ (e) => { setFormData({...formData, phonenumber: e.target.value}) }} />
                
                <SelectI 
                  label='Type' 
                  options={workerTypes} 
                  tooltip={true}
                  onChange={(selectedOption) => { setFormData({...formData, type: selectedOption.value}) }}
                />

                {apiMessage}
                <div className="btn_group">
                  <Button btnType='primary' label='Submit' className='submit_btn' formBtnType='submit' />
                </div>
            </form>
        </div>
    </>
  )
}

export default AddWorker