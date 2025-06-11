import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { updateData } from "../../services/api";

import { showSuccessToast , showErrorToast} from '../../components/toastConfig';

const EditData = () => {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state) {
      setFormData({
        name: location.state.name || "",
        email: location.state.email || "",
        password: "",
      });
      console.log("Edit mode data:", location.state);
    } else {
      console.log("Add mode or no data");
    }
  }, [id, location.state]);

  const submitUpdateForm = async () => {
    try {
      const res = await updateData(id, formData);
      
      // Check if response exists before trying to parse JSON
      if (!res) {
        throw new Error("No response from server");
      }
  
      const data = await res.json();
  
      if (res.ok) {
        showSuccessToast(data.message || "User updated successfully!");
        navigate("/ListData", { state: { message: "User updated successfully!" } });
      } else {
        showErrorToast(data.error || "Update failed");
        navigate("/ListData", { state: { message: "Update failed" } });
      }
    } catch (error) {
      console.error("Error:", error);
      showErrorToast(error.message || "Something went wrong");
      
      // Only use alert as a last resort
      if (!navigator.onLine) {
        alert("Network error - please check your internet connection");
      }
    }
  };

  
  return (
    <>
      {/*  */}
      <table>
        <tbody>
          <tr>
            <td>Name</td>
            <td>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                }}
              />
            </td>
          </tr>
          <tr>
            <td>Email</td>
            <td>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </td>
          </tr>
          {/*  
          <tr>
            <td>Password</td>
            <td>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </td>
          </tr>
          */}
        </tbody>
      </table>
      <button onClick={() => {submitUpdateForm()}}> Updates </button>
    </>
  )
}

export default EditData