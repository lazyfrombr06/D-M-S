import { Route, Routes } from "react-router-dom";
import "./App.css";

import Footer from "./Components/Footer/Footer";
import Nav from "./Components/Admin/Nav/Nav";
import SignUp from "./Components/Admin/Sign Up/SignUp";
import Home from "./Components/Admin/Home/Home";
import AddData from "./Components/Admin/Add Data/AddData";
import Profile from "./Components/Admin/Profile/Profile";
import PrivateComp from "./Components/Admin/Private Component/PrivateComp";
import Login from "./Components/Admin/Login/Login";
import UpdateProduct from "./Components/Admin/UpdateProduct/UpdateProduct";
import UpdateProductWithNav from "./Components/Admin/UpdateProduct/UpdateProductWithNav";
// import PageNotFound from "./Components/MouseTorchEffect/PageNotFound";
import AdminLogin from "./Components/Admin/Login/AdminLogin";
import UserLogin from "./Components/User/UserLogin/UserLogin";
import UserSignUp from "./Components/User/UserSignUp/UserSignUp";
import PrivateCompForUser from "./Components/User/PrivateCompForUser";
import UserHome from "./Components/User/UserHome/UserHome";
import GoToTop from "./Components/GoToTop";
// import PrivateComp from './Components/Admin/Private Component/PrivateComp'

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* private comp start from here for ADMIN */}
        <Route element={<PrivateComp />}>
          <Route path="/" element={<Home />} />
          <Route path="/addData" element={<AddData />} />
          <Route path="/updateProduct/:id" element={<UpdateProduct />} />

          {/* update product with manual Id inter */}
          <Route path="/updateProduct" element={<UpdateProductWithNav />} />

          <Route path="/profile" element={<Profile />} />
        </Route>
        {/* private comp end here */}

        {/* private comp start from here for USER */}
        <Route element={<PrivateCompForUser />}>
          <Route path="/userHome" element={<UserHome />} />
        </Route>

        <Route path="/signUp" element={<SignUp />} />
        <Route path="/userSignUp" element={<UserSignUp />} />

        <Route path="/login" element={<Login />}>
          <Route path="adminLogin" element={<AdminLogin />} />
          <Route path="userLogin" element={<UserLogin />} />
        </Route>

        <Route path="/*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <GoToTop className="go-to-top-comp" />
      <Footer />
    </div>
  );
}

export default App;
