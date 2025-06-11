// import React from 'react'
import { useState, useEffect } from "react";
// import Counter from "../features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getData, deleteData } from "../../services/api";
import { showSuccessToast } from '../../components/toastConfig';
import "../../main.css";

const ListData  = () => {

    


  const count = useSelector((state) => state.counter.value);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const location = useLocation() || {};
  // const state = location || {}; // ✅ handle null/undefined safely

  useEffect(() => {
    loadUsers();
   
  }, []);


  

  const loadUsers = async () => {
    const data = await getData();
    setItems(data);
  };

  const handleEditButton = (item) => {
    navigate(`/EditData/${item.id}`, { state: { ...item, method: 'edit' } });
  };

  const handleDeleteButton = async (id) => {
    try {
        await deleteData(id);
        await loadUsers();
        showSuccessToast("Record Successfully Saved!"); // Cleaner call
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAdd = () => {
    let method = 'add';
    navigate('/AddData/', { state: { method } }); // ✅ Correct: state is an object
  };

  return (
   <>
   <p>{location.state?.message || 'No message found'}</p>
   <p>{location.state?.user || 'No message found'}</p>
      <button  onClick={() => { handleAdd(); }} >Add</button>
      <p>Welcome Home Page {count}</p>
      <table>
        <thead>
          <tr>
            <th>name </th>
            <th>email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(items) &&
            items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>
                  <button
                    onClick={() => {
                        handleEditButton(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteButton(item.id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
};

export default ListData;
