import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const method = location.state?.method || "edit";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state && method === "edit") {
      setFormData({
        name: location.state.name || "",
        email: location.state.email || "",
        password: "",
      });
      console.log("Edit mode data:", location.state);
    } else {
      console.log("Add mode or no data");
    }
  }, [id, location.state, method]);

  const submitEditForm = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer YOUR_TOKEN_HERE`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.message);
        navigate("/home", { state: { message: "User updated successfully!" } });
      } else {
        alert("Update failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  const submitAddForm = async () => {
    alert("add form");
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/user/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer 26|4Sno0MHbjXwmTKixp2bvTx8hJh4ybTOCqbFJknHgcae17432`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        navigate("/home", {
          state: { message: "New User Added Successfully!" },
        });
      } else {
        alert("Add failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    }
  };

  return (
    <>
      <p>UserEdit mode: {method}</p>
      <p>User ID: {id}</p>
      <p>User Name: {formData.name}</p>
      <button
        onClick={() => {
          navigate("/home");
        }}
      >
      Back
      </button>

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
        </tbody>
      </table>

      <button
        onClick={() => {
          method === "add" ? submitAddForm() : submitEditForm();
        }}
      >
      {method === "add" ? "Add" : "Edit"} Submit
      </button>
    </>
  );
};

export default UserEdit;
