import React, { useState, useEffect } from "react";
import "./Profile.css";
import blankUser from './blank-user.png'
function Profile() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("");

  
  const [editProfile, setEditProfile] = useState(false);
  const auth = localStorage.getItem("user");
  const userId = JSON.parse(auth)._id;
  




  // Function to fetch the user's profile from the backend
  const fetchProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/profile/${userId}`);
      if (response.ok) {
        const profileData = await response.json();
        setName(profileData.name);
        setDob(profileData.dob);
        setEmail(profileData.email);
        setMobile(profileData.mobile);
        setDesignation(profileData.designation);
      } else {
        console.log("Profile not found");
      }
    } catch (error) {
      console.log("Error fetching the profile");
    }
  };

  // Fetch the user's profile when the component mounts
  useEffect(() => {
    fetchProfile();
  }, []);

  // Function to handle updating the profile
  const handleUpdateProfile = async () => {
    try {
      const response = await fetch("http://localhost:4000/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, name, dob, email, mobile, designation }),
      });

      if (response.ok) {
        console.log("Profile updated successfully.");
      } else {
        console.log("Error updating profile.");
        alert("Error updating profile.");
      }
    } catch (error) {
      console.log("Error updating profile.");
      alert("Error updating profile.", error);
    }
    setEditProfile(!editProfile);
  };

  return (
    <div className="product-component">
      <h2 className="product-comp-heading">Profile</h2>

      <div className="user-profile-picture-container">
        <img src='https://w0.peakpx.com/wallpaper/723/306/HD-wallpaper-virat-kohli-wali-face-sidelook-virat-kohli-face-sidelook-cricketer-king-kohli.jpg' alt="User" />
        <input type="file" placeholder="Update Image" />
      </div>

      <div className="profile-personal-details-container">


        
        <div className=" company-details-on-prrofile-page">
         <span>Avcom Network Technologies</span>
        </div>

        <div className="personal-detail-each-container">
          <div className="personal-details-key">User ID </div><span>:</span>
          <div className="personal-details-value">{userId}</div>
        </div>

        <div className="personal-detail-each-container">
          <div className="personal-details-key">Name </div><span>:</span>
          <div className="personal-details-value">{name}</div>
        </div>

        <div className="personal-detail-each-container">
          <div className="personal-details-key">Email </div><span>:</span>
          <div className="personal-details-value">{email}</div>
        </div>

        <div className="personal-detail-each-container">
          <div className="personal-details-key">Mobile No </div><span>:</span>
          <div className="personal-details-value"> {mobile}</div>
        </div>

        <div className="personal-detail-each-container">
          <div className="personal-details-key">Date Of Birth </div><span>:</span>
          <div className="personal-details-value">{dob}</div>
        </div>

        <div className="personal-detail-each-container">
          <div className="personal-details-key">Designation </div><span>:</span>
          <div className="personal-details-value">{designation}</div>
        </div>
        {editProfile ? null : (
          <button
            className="edit-profile-btn-toggle"
            onClick={() => setEditProfile(!editProfile)}
          >
            Edit Profile
          </button>
        )}
      </div>

      {/* Edit profile section start here */}
      {editProfile ? (
        <div className="edit-profile-input-container">
          <div className="edit-profile-input-each-container">
            <label htmlFor="name">Name </label> <span>:</span>

            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}  required
            />
          </div>

          <div className="edit-profile-input-each-container">
            <label htmlFor="email">Email </label><span>:</span>

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} required
            />
          </div>

          <div className="edit-profile-input-each-container">
            <label htmlFor="mobile">Mobile No. </label><span>:</span>

            <input
              type="text"
              placeholder="Mobile"
              value={mobile}
              onChange={(e) => setMobile( e.target.value)} required
            />
          </div>

          <div className="edit-profile-input-each-container">
            <label htmlFor="dob">Date Of Birth </label><span>:</span>

            <input
              type="text"
              placeholder="Date Of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)} required
            />
          </div>

          <div className="edit-profile-input-each-container">
            <label htmlFor="designation">Designation (Optional) </label><span>:</span>

            <input
              type="text"
              placeholder="Designation"
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
            />
          </div>
          <button
            onClick={handleUpdateProfile}
            className="edit-profile-btn-toggle"
          >
            Update Profile
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default Profile;
