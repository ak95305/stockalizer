import React from 'react'
import './input.css'

function Input({ label, type, value, disabled, readOnly, onClick, onChange, name }) {
  return (
    <div className="form_group">
        <label className='form_label'>{ label }</label>
        <input 
          className='form_input' 
          type={ type } 
          value={ value } 
          disabled={disabled} 
          readOnly={readOnly} 
          onClick={onClick}
          onChange={onChange}
          name={name}
        />
    </div>
  )
}

export default Input