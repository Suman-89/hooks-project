import React, { useEffect, useState } from "react";
import AxiosInstance from "../../../api/axios/axios";
import { endPoints } from "../../../api/endpoints/endpoint";
import { toast } from "react-toastify";
import "./Profile.css"; // CSS file
import {profile_pic} from "../../../api/axios/axios"


export default function Profile({media}) {
  const [user, setUser] = useState({});
  const imageData = profile_pic(media)
  console.log(user);
  useEffect(() => {
    async function fetchData() {
      try {
        const profile = await AxiosInstance.get(endPoints.auth.profileDetails);
        setUser(profile.data.data);
        toast.success(profile.data.message);
      } catch (error) {
        console.error("Failed to load profile", error);
        toast.error("Failed to load profile");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-actions">
          <div className="action">
            <i className="fas fa-user-friends"></i>
            <span>Connect</span>
          </div>
          <div className="action">
            <i className="fas fa-comment-dots"></i>
            <span>Message</span>
          </div>
        </div>

        {user.profile_pic && (
          <div className="profile-image">
            <img src={imageData} alt="Profile" />
          </div>
        )}

        <h2 className="profile-name">
          {user.first_name || ""} {user.last_name || ""}
        </h2>
        <p className="profile-location">{user.city || "City"}, {user.country || "Country"}</p>

        <p className="profile-role">{user.role || "Web Producer - Web Specialist"}</p>
        <p className="profile-university">Columbia University - New York</p>

        <div className="profile-stats">
          <div>
            <span>65</span>
            <p>Friends</p>
          </div>
          <div>
            <span>43</span>
            <p>Photos</p>
          </div>
          <div>
            <span>21</span>
            <p>Comments</p>
          </div>
        </div>

        <button className="profile-button">Show more</button>
      </div>
    </div>
  );
}
