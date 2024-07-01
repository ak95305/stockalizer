import React from 'react'
import Select from 'react-select'
import './select.css'

function SelectI({ label, options, tooltip, value, disabled, readOnly, onClick, onChange, name }) {
  return (
    <div className="form_group">
        <div className='flex gap-3'>
          <label className='form_label'>{ label }</label>
          {
            tooltip ? 
            <button type="button" className="tooltip_button size-4 text-xs inline-flex justify-center items-center gap-2 rounded-full bg-white border border-gray-600 text-gray-600 relative">
              ?
              <span className="transition-opacity inline-block invisible absolute z-10 py-1 px-2 bg-gray-900 text-xs font-medium text-white rounded shadow-sm bottom-6 text-left" role="tooltip">
                <ul>
                  {
                    options.map(item => {
                      return <li key={item.value}>{item.label}({item.value})</li>
                    })
                  }
                </ul>
              </span>
            </button>
            : ''  
          }
        </div>
        {/* <input 
          className='form_input' 
          type={ type } 
          defaultValue={ value } 
          disabled={disabled} 
          readOnly={readOnly} 
          onClick={onClick}
          onChange={onChange}
          name={name}
        /> */}

        <Select 
          className='form_select' 
          options={options}
          onChange={onChange}
        />

    </div>
  )
}

export default SelectI