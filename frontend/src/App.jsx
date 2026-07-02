import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";  
import MainLayout from "./layout/MainLayout";
import Login from '../pages/login';
import Signup from '../pages/Signup';
import Listings from '../pages/listing';
 import { useEffect } from 'react';
 import AddNewListing from '../pages/addListing'; 
import ShowListing from '../pages/show';

function App() {
  const [count, setCount] = useState(0)

  return (
     <>
      <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

        <Route path="/listings" element={<Listings />} />

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
