import React, { useState } from 'react'
import './num-input.css'
import Button from '../Button/Button'

function NumInput({ closeNumBox, submitNumBox, name, value }) {
  const [result, setResult] = useState(value ? value : '')
  let numHtmlArray = []

  const handleButtonClicked = (e) => {
    e.target.classList.add('clicked')
    
    setTimeout(()=>{
      e.target.classList.remove('clicked')
    }, 150)

    let dataValue = e.target.getAttribute('data-value')
    if(dataValue === 'clear') {
      setResult('');
    } else {
      setResult((prev)=>prev+dataValue)
    }
  }

  for (let i = 1; i < 10; i++) {
    numHtmlArray.push(<span key={i} onClick={handleButtonClicked} data-value={i}>{i}</span>)     
  }


  return (
    <div className="num_input">
      <div className="inner_area">
        <h3>{ name.toUpperCase() }</h3>
        <div className="num_container">
          <div className="result_box">{ result }</div>
          <div className="num_box">
            { numHtmlArray }
            <span onClick={handleButtonClicked} data-value={0}>0</span>
            <span onClick={handleButtonClicked} data-value='clear'>X</span>
          </div>
          <div className="btn_group">
            <Button tagType='button' btnType='grey' label='Close' className='done_input_btn' onClick={closeNumBox}/>
            <Button tagType='button' btnType='primary' label='Done' className='done_input_btn' onClick={(e)=>submitNumBox(e, result)}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NumInput