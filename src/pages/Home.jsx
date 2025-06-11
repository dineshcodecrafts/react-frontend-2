// import React from 'react'
import { useState, useEffect } from "react";
import Counter from "../features/counter/Counter";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import "../main.css";

const Home = () => {
  const count = useSelector((state) => state.counter.value);

  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  // const state = location || {}; // ✅ handle null/undefined safely

  const location = useLocation() || {};

  useEffect(() => {

    const loadUsers = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/user`, {
          headers: {
            Authorization: `Bearer 26|4Sno0MHbjXwmTKixp2bvTx8hJh4ybTOCqbFJknHgcae17432`,
            Accept: "application/json",
          },
        });
        const data = await res.json();
        setItems(data);
      } catch (err) {
        console.error("Fetch error:", err);
        // navigate('/');
      }

    };
    loadUsers();
  }, []);

  const handleEdit = (item) => {
    alert(item.id);
    console.log(item);
    // navigate(`/UserEdit/${item.id}`, { state: item , method : 'edit' });
    navigate(`/UserEdit/${item.id}`, { state: { ...item, method: 'edit' } });
  };

  const handleDelete = async (id) => {
    try {
      const del = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer 26|4Sno0MHbjXwmTKixp2bvTx8hJh4ybTOCqbFJknHgcae17432`,
        },
      });
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  const handleAdd = () => {
    alert('Welcome Add Page');
    let method = 'add';
    navigate('/add/', { state: { method } }); // ✅ Correct: state is an object
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
                      handleEdit(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      handleDelete(item.id);
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

export default Home;
