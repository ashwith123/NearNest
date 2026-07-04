import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import MainLayout from "./layout/MainLayout";
import Login from '../pages/login';
import Signup from '../pages/Signup';
import Listings from '../pages/listing';
import EditListing from '../pages/editListing';
 import { useEffect } from 'react';
 import AddNewListing from '../pages/addListing'; 
import ShowListing from '../pages/show';
import useAuthStore from "./store/authStore";




function App() {
 const setUser = useAuthStore((state) => state.setUser);


useEffect(() => {
    async function fetchUser() {
        try {
            const res = await axios.get(
                "http://localhost:3000/me",
                {
                    withCredentials: true,
                }
            );

            setUser(res.data.user);
        } catch {
            setUser(null);
        }
    }

    fetchUser();
}, []);

  return (
     <>
      <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

        <Route path="/listings" element={<Listings />} />

        <Route path="/listings/:id/edit" element={<EditListing />} />

        <Route
          path="/listings/add"
          element={<AddNewListing />}
          />

        <Route
          path="/listings/:id"
          element={<ShowListing />}
        />
 

        <Route
          path="/login"
          element={<Login />}
        />

         <Route
          path="/signup"
          element={<Signup />}
        />

        </Route>

      </Routes>

    </BrowserRouter>
     </>
  )
}

export default App
