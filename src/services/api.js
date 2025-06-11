const API_URL  = `http://127.0.0.1:8000/api`;
const Auth_key = `Bearer 26|4Sno0MHbjXwmTKixp2bvTx8hJh4ybTOCqbFJknHgcae17432`;



//Get All Data
export const getData = async () => { 
    const response = await fetch(`${API_URL}/user`, {
        headers: {
            Authorization: `${Auth_key}`,
            Accept: "application/json",
        },
    });
    return await response.json();
}


export const deleteData = async (id) => { 
const response = await fetch(`http://127.0.0.1:8000/api/user/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer 26|4Sno0MHbjXwmTKixp2bvTx8hJh4ybTOCqbFJknHgcae17432`,
    },
  });
  return await response.json();
}

export const updateData = async (id, formData) => { 
    const response = await fetch(`${API_URL}/user/${id}`, {
        method: "PUT",
        headers: {
        Authorization: `${Auth_key}`,
        "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    });
    return response;
}



