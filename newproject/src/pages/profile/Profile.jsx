import React from "react";
import { useLocation } from "react-router-dom";

const Profile = () => {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div className = "card p-3 m-4">
      <h1>Profile</h1>
      {user && (
        <div>
          <p><strong>Username:</strong> {user.username}</p>
          <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Address:</strong> {user.adress}</p>
            <p><strong>Phone:</strong> {user.phonenumber}</p>
        </div>
      )}    
    </div>
  );
};

export default Profile;