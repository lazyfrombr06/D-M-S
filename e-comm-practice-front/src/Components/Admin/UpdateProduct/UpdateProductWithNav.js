import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateProductWithNav = () => {
    const [inputId, setInputId]= useState("")
    const navigate = useNavigate();
    
    function searchByInputId(){
        if(inputId.length>6){
      navigate(`/updateProduct/${inputId}`)
        }else{(alert('enter valid details'))}
    }
  return (
    <div className="product-component">
    <h2 className="product-comp-heading">Update Product</h2>
    <div className="inpbox-of-add-product input-box-container-of-signup-page">

        <input type="text" value={inputId} onChange={(e)=>setInputId(e.target.value)} placeholder='enter Product id Manualy' />


    <button onClick={searchByInputId} className='button-of-add-product sing-up-button'>Search</button>

    </div>
    </div>
  )
}

export default UpdateProductWithNav
