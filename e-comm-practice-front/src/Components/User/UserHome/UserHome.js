import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

function UserHome() {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();

 

  const currentLocalstorage = localStorage.getItem("usersUser");
  const userIdFromCurrentLocalStorage = JSON.stringify(
    JSON.parse(currentLocalstorage)._id
  );

  // for api we create function seprate and import the function in useEffect
  useEffect(() => {
    getProduct();
  }, []);

  // api for show product list
  const getProduct = async () => {
    let result = await fetch("http://localhost:4000/products");
    result = await result.json();
    setProducts(result);
    navigate("/UserHome");
  };

 
  // API for search Product
  const searchHandle = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:4000/search/${key}`);
      result = await result.json();
      // now check if search box is empty call all product list
      if (result) {
        setProducts(result);
      }
    } else {
      getProduct();
    }
  };

  return (
    <div className="product-component">
      <h2 className="product-comp-heading">File Management System <br /> <span style={{fontSize:'1.2rem', color:'#008cff'}}>(User Dashboard)</span></h2>
  
      <input
        type="text"
        className="search-product-inp-box"
        onChange={searchHandle}
        placeholder="Search Here..."
      />
      <div className="full-form-details-container">
      <div className="full-form-details-box">
<span className="full-form-key">N.O.N.P. :-</span> <span className="full-form-value">Number Of Noting Pages.</span> 
</div>
<div className="full-form-details-box">
<span className="full-form-key">N.O.C.P. :-</span> <span className="full-form-value">Number Of Corosponded Pages.</span>
</div>
      </div>

      <table className="product-api-table" border={1}>
        <thead>
          <tr>
            <td>S. No</td>
            <td>Adex file No.</td>
            <td>Year</td>
            <td>File No.</td>
            <td>subject</td>
            <td>N.O.N.P.</td>
            <td>N.O.C.P.</td>
            <td>Total Pages</td>
            <td>Division</td>
          
            <td>Files</td>
          </tr>
        </thead>

        {products.length > 0 ? (
          products.map((item, index) => (
            <tbody key={item._id}>
              <tr>
                <td>{index + 1}</td>
                <td>{item.adexFileNo}</td>
                <td> {item.year}</td>
                <td>{item.fileNo}</td>
                <td>{item.subject}</td>
                <td>{item.nonp}</td>
                <td>{item.nocp}</td>
                <td>{item.totalPages}</td>
                <td>{item.division}</td>

                <td> <a href={`http://localhost:4000/uploads/${item.files}`} target="_blank" rel="noreferrer" className="files-on-show-product"><BsFillFileEarmarkPdfFill/></a> </td>

              </tr>
            </tbody>
          ))
        ) : (
          <h2 className="no-result-found-text"> No Result Found</h2>
        )}
      </table>
      {/* {isHovered ?  <div className="acces-denied-msg-prompt">ACCESS DENIED</div> : null} */}
     
     
    </div>
  );
}

export default UserHome;
