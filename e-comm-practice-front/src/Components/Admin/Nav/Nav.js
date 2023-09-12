import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
// import logo from "./../../dice1.jpg";
import logo from "../../../dice1.jpg";
import { BsFillCaretDownFill } from "react-icons/bs";

function Nav() {
  const auth = localStorage.getItem("user");
  const userAuth = localStorage.getItem("usersUser");
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="navigation-component">
      <div className="navigation-container">
        <div className="e-comm-logo-container">
          {/* <img src="https://i.gifer.com/XOsX.gif" alt="logo" /> */}
          <a
            href="https://brajeshfrombr06.netlify.app"
            target="blank"
            rel="norefral"
          >
            {" "}
            <img src={logo} alt="logo" title="Go To My Profile" />{" "}
          </a>
        </div>

        {auth ? (
          <ul>
            <li>
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/addData" className="nav-link">
                Add Data
              </Link>
            </li>
            <li>
              <Link to="/updateProduct" className="nav-link">
                Update
              </Link>
            </li>
            {/* <li>
              <Link to="/profile" className="nav-link">
                Profile
              </Link>
            </li> */}
            {/* <li>
              <Link to="/login" className="nav-link" onClick={logOut}>
                Log Out
              </Link>
            </li> */}

            {/* innner ul */}

            <li className="hello-name-in-navigation expendable-li-for-more-info-nav">
              <Link to="/profile" className="nav-link hello-name-in-navigation">
                <span style={{ color: "#696969" }}>Hello! </span>{" "}
                {JSON.parse(auth).name}{" "}
                <span>
                  <BsFillCaretDownFill
                    style={{ color: "red", position: "relative", top: "6px" }}
                  />
                </span>
              </Link>
              <ul className="inner-ul-for-logout-and-profile">
                <li>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/login" className="nav-link" onClick={logOut}>
                    Log Out
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        ) : userAuth ? ( // for user authention
          <ul>
            <li className="hello-name-in-navigation expendable-li-for-more-info-nav">
              <Link  className="nav-link hello-name-in-navigation">
                <span style={{ color: "#696969" }}>Hello! </span>{" "}
                {JSON.parse(userAuth).name}
              </Link>{" "}
            </li>
            <li>
              <Link to="/login" className="nav-link" onClick={logOut}>
                Log Out
              </Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}

export default Nav;
