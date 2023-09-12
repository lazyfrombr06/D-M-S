import React, { useState, useEffect } from "react";
import "./Home.css";
import { Link, useNavigate } from "react-router-dom";
import { MdDeleteForever, MdDelete } from "react-icons/md";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";

function Home() {
  const [products, setProducts] = useState([]);

  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const currentLocalstorage = localStorage.getItem("user");
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
    navigate("/");
  };

  //api for delete product list
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:4000/product/${id}`, {
      method: "DELETE",
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
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
      <h2 className="product-comp-heading">File Management System <br /> <span style={{fontSize:'1.2rem', color:'#008cff'}}>(Admin Dashboard)</span></h2>
  
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
            <td>uploaded By</td>
            <td>Operations</td>
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
           
                {/* adexFileNo,year,fileNo,subject, nonp,nocp,totalPages,division,userId,UploadedBy */}

                <td>
                  {item.UploadedBy} 
                </td>
                <tr style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                  <td>
                    {userIdFromCurrentLocalStorage ===
                    JSON.stringify(item.userId) ? (
                      <Link
                        onClick={() => deleteProduct(item._id)}
                        className="delete-button-e-comm"
                      >
                        <MdDelete />
                      </Link>
                    ) : (
                      <>
                        <Link
                          className="delete-button-e-comm--disebled"
                          onClick={() => alert("Access Denied")}
                          onMouseEnter={handleMouseEnter}
                          onMouseLeave={handleMouseLeave}
                          title="Access Denied"
                        >
                          <MdDeleteForever />
                        </Link>
                      </>
                    )}
                  </td>
                  {/* If You are loging with your id , you can only delete which data you had uploded earlier 
                  code running Method:- code is cheaking if uploader user id and your login localStorage user id is same then it will 
                  show you delete button other wise it will hide...
                  we will alse let update button under the if else code but i have coded for update data in updateProduct component.. 
                  
                    */}

                  <td>
                    {userIdFromCurrentLocalStorage ===
                    JSON.stringify(item.userId) ? (
                      <Link
                        to={`/updateProduct/${item._id}`}
                        className="update-button-e-comm"
                      >
                        Update
                      </Link>
                    ) : (
                      <Link
                        to={`/updateProduct/${item._id}`}
                        className="update-button-e-comm"
                        title="access Denied"
                      > <s>
                        Update</s>
                      </Link>
                    )}
                  </td>
                </tr>
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

export default Home;
