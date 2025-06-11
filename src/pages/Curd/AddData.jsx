import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { addData } from "../../services/api";
import { showSuccessToast , showErrorToast} from '../../components/toastConfig';

const AddData = () => {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    });

    const submitAddForm_old = async () => {
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
                toast.success("Record Successfully Saved!", { 
                    position: "top-center",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                navigate("/ListData", {   
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

    const submitAddForm = async () => {
        const response = await addData(formData);
        if(response){
            showSuccessToast("Record Successfully Saved!"); // Cleaner call
            navigate("/ListData", {   
                state: { message: "New User Added Successfully!" },
                });
        }else{
            showErrorToast("Something went wrong");
            navigate("/ListData", {   
                state: { message: "New User Added Failed!" },
                });
        }   
    }

    return (
        <>
            <h1>Create User</h1>
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
            <br></br>
            <button onClick={() => submitAddForm()} style={{ marginRight: "10px" }}>Add Data</button>
            <button onClick={() => submitAddForm()} style={{ marginRight: "10px" }}>Reset Form</button>
            <button onClick={() => navigate("/home")}>Home Page</button>
        </>
    )
}

export default AddData