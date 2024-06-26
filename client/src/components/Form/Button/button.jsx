import React from 'react'
import './button.css'

function Button({ tagType, label, btnType, className, onClick, formBtnType }) {
  return (
    <>
      {
        tagType == 'a' ?
        <a className={`btn btn-${btnType} ${className}`} onClick={onClick}>{ label }</a>
        : <button className={`btn btn-${btnType} ${className}`} onClick={onClick} type={formBtnType}>{ label }</button>
      }
    </>
  )
}

export default Button