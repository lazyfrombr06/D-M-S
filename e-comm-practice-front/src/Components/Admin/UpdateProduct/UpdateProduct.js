import React,{useEffect, useState} from "react";
import {  useNavigate,useParams } from "react-router-dom";

const UpdateProduct =()=>{
  const [adexFileNo, setAdexFileNo] = useState("");
  const [year, setYear] = useState("");
    const [fileNo, setFileNo] = useState("");
    const [subject, setSubject] = useState("");
    const [nonp, setNonp] = useState("");
    const [nocp, setNocp] = useState("");
    const [totalPages, setTotalPages] = useState("");
    const [division, setDivision] = useState("");

    const [userId, setUserId] = useState('')

    

    const currentLocalstorage = localStorage.getItem("user");
    const userIdFromCurrentLocalStorage = JSON.stringify(JSON.parse(currentLocalstorage)._id);
    // these two line for extract userId from localStorage
 
  
    const Navigate = useNavigate();
  const params= useParams()

  useEffect(()=>{

    
    getProductDetails();
  },[])

  // Api for send data via API
  const getProductDetails = async ()=>{
    console.warn(params)
    let result= await fetch(`http://localhost:4000/product/${params.id}`);
    result=await result.json();
    setAdexFileNo(result.adexFileNo);
    setYear(result.year);
  setFileNo(result.fileNo);
  setSubject(result.subject);   
  setNonp(result.nonp);   
  setNocp(result.nocp);   
  setTotalPages(result.totalPages);   
  setDivision(result.division);    

  setUserId(JSON.stringify(result.userId)); //i took this for match user id from uploader and localStorage user id for update data
  }

    // for check error validation
    const [error, setError] = useState(false);
  
    // Update Product API
    const updateProduct = async () => {
     let result= await fetch(`http://localhost:4000/product/${params.id}`,{
      method:'put',
      body:JSON.stringify({adexFileNo, year, fileNo, subject,nonp,nocp,totalPages,division}),
      headers:{
        'content-type':'application/json'
      }
     });

     result=await result.json()
     console.warn(result);
  
     Navigate('/')
     
      // for cheack empty filed.. when we write (!name) this will return value in true and false
      console.warn(!adexFileNo);
      if (!adexFileNo || !year || !fileNo || !subject || !nonp || !nocp || !totalPages || !division) {
        setError(true);
        return false; // return false means code with end here if we get error
      }
  
      
    };
  
    return (
      <div className="product-component">
        <h2 className="product-comp-heading">Update Product</h2>
        <div className="inpbox-of-add-product input-box-container-of-signup-page">
          <input
            type="text"
            placeholder="Enter Adex file no"
            value={adexFileNo}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setAdexFileNo(e.target.value);
            }}
          />
          {/* error validation */}
          {error && !adexFileNo && <span className="error-validation-span-in-add-product">Enter valid Adex file no.</span>}
  
          <input
            type="text"
            placeholder="Enter Year"
            value={year}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setYear(e.target.value);
            }}
          />
          {/* error validation */}
          {error && !year && <span className="error-validation-span-in-add-product">Enter valid Year</span>}
  
          <input
            type="text"
            placeholder="Enter Deparment File No."
            value={fileNo}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setFileNo(e.target.value);
            }}
          />
          {/* error validation */}
          {error && !fileNo && <span className="error-validation-span-in-add-product">Enter valid File No.</span>}
  
          <input
            type="text"
            placeholder="Enter subject"
            value={subject}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setSubject(e.target.value);
            }}
          />
          
          {/* error validation */}
          {error && !subject && <span className="error-validation-span-in-add-product">Enter valid subject</span>}
  
          <input
            type="text"
            placeholder="Enter Noting Pages No."
            value={nonp}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setNonp(e.target.value);
            }}
          />
          
          {/* error validation */}
          {error && !nonp && <span className="error-validation-span-in-add-product">Enter valid Number Of Noting Pages.</span>}
  
          <input
            type="text"
            placeholder="Enter Corosponded Pages No."
            value={nocp}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setNocp(e.target.value);
            }}
          />
          
          {/* error validation */}
          {error && !nocp && <span className="error-validation-span-in-add-product">Enter valid Number Of Corosponded Pages.</span>}
  
          <input
            type="text"
            placeholder="Enter totalPages"
            value={totalPages}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setTotalPages(e.target.value);
            }}
          />
          
          {/* error validation */}
          {error && !totalPages && <span className="error-validation-span-in-add-product">Enter valid totalPages</span>}
  
          <input
            type="text"
            placeholder="Enter Division Here"
            value={division}
            className="input-box-of-add-product input-box-signup"
            onChange={(e) => {
              setDivision(e.target.value);
            }}
          />
          
          {/* error validation */}
          {error && !division && <span className="error-validation-span-in-add-product">Enter valid division</span>}
        </div>

{/* There is the code of If user id (means uploaded user id ) and localStorage userId will same then you can see the update button in update page */}
        { userIdFromCurrentLocalStorage === userId?
        <button
          className="button-of-add-product sing-up-button"
          onClick={updateProduct}
        >
          Update Product
        </button> :null
        }
        </div>
    )
}

export default UpdateProduct