import React, { useState } from "react";
import './AddData.css'
import { useNavigate } from "react-router-dom";

function AddData() {   

  //    adexFileNo,year,fileNo,subject, nonp,nocp,totalPages,division,userId,UploadedBy

  const [adexFileNo, setAdexFileNo] = useState("");
  const [year, setYear] = useState("");
  const [fileNo, setFileNo] = useState("");
  const [subject, setSubject] = useState("");

  const [nonp, setNonp] = useState("");
  const [nocp, setNocp] = useState("");
  const [totalPages, setTotalPages] = useState("");
  const [division, setDivision] = useState("");

  const [files, setFiles] = useState("");

  const Navigate = useNavigate();

  // for check error validation
  const [error, setError] = useState(false);

  const addProduct = async () => {
    // e.preventDefault();

    // for cheack empty filed.. when we write (!name) this will return value in true and false
    console.warn(!adexFileNo);
    if (!adexFileNo || !year || !fileNo || !subject || !files || !nonp || !nocp || !totalPages || !division) {
      setError(true);
      return false; // return false means code with end here if we get error
    }

    // For get user id from localStorage

    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const UploadedBy = JSON.parse(localStorage.getItem("user")).name;

    const formData= new FormData();
    
      formData.append('adexFileNo',adexFileNo);
      formData.append('year',year);
      formData.append('fileNo',fileNo);
      formData.append('subject',subject);
      formData.append('nonp',nonp);
      formData.append('nocp',nocp);
      formData.append('totalPages',totalPages);
      formData.append('division',division);




      formData.append('userId',userId);
      formData.append('UploadedBy',UploadedBy);
      formData.append('files',files);

    
    

      try {
        const response = await fetch('http://localhost:4000/add-product', {
          method: 'POST',
          body: formData,
        });
  
        if (response.ok) {
         console.error(error)
        } else {
          alert('Error adding product');
        }
      } catch (error) {
        console.error(error);
        alert('Error adding product');
      }
    
    alert('Uploaded...')
    Navigate('/')
  };

  return (
    <div className="product-component">
      <h2 className="product-comp-heading">Add New Data</h2>
      
      <div className="inpbox-of-add-product input-box-container-of-signup-page">
        <input
          type="text"
          placeholder="Adex file No."
          value={adexFileNo}
          className="input-box-of-add-product input-box-signup"
          onChange={(e) => {
            setAdexFileNo(e.target.value);
          }}
        />
        {/* error validation */}
        {error && !adexFileNo && <span className="error-validation-span-in-add-product">Enter valid Adex file No.</span>}

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
          placeholder="Enter File No."
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
          placeholder="Enter Subject"
          value={subject}
          className="input-box-of-add-product input-box-signup"
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        {/* error validation */}
        {error && !subject && <span className="error-validation-span-in-add-product">Enter valid Subject</span>}


{/* *************************** */}

   {/* adexFileNo,year,fileNo,subject,|||  nonp,nocp,totalPages,division,userId,UploadedBy */}
        <input
          type="text"
          placeholder="Enter N.O.N.P."
          value={nonp}
          className="input-box-of-add-product input-box-signup"
          onChange={(e) => {
            setNonp(e.target.value);
          }}
        />
          {/* error validation */}
          {error && !nonp && <span className="error-validation-span-in-add-product">Enter valid Number Of Noting Pages</span>}
       
        <input
          type="text"
          placeholder="Enter N.O.C.P."
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
          placeholder="Enter Total Pages"
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
          placeholder="Enter Division"
          value={division}
          className="input-box-of-add-product input-box-signup"
          onChange={(e) => {
            setDivision(e.target.value);
          }}
        />
        
  {/* error validation */}
  {error && !division && <span className="error-validation-span-in-add-product">Enter valid division</span>}
      <input
          type="file"
          accept="application/pdf"
          placeholder="Upload Pdf Files"
          className="input-box-of-add-product input-box-signup"
          onChange={(e) => setFiles(e.target.files[0])}
        />
          {/* error validation */}
          {error && !files && <span className="error-validation-span-in-add-product">Upload file</span>}

  
       
      </div>
      <button
        className="button-of-add-product sing-up-button"
        onClick={addProduct}
      >
        Add Product
      </button>
    </div>
  );
}

export default AddData;
