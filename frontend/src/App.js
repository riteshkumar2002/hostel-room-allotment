import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './component/admin/Home.jsx';
import Admin_Navbar from './component/admin/Admin_navbar'
import RoomAllocationRequest from './component/admin/RoomAllocationRequestList'
import RoomConstraint from './component/admin/RoomConstraint'
import RoomAvailable from './component/student/RoomAvailable';
import Allocate from './component/admin/Allocate';
import Deallocate from './component/admin/Deallocate.jsx';
import RoomChangeRequest from './component/student/RoomChangeRequest.jsx';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/room-constraints' element={<RoomConstraint/>} />
        <Route path='/room-allocation-request' element={<RoomAllocationRequest/>} />
        <Route path='/room-available' element={<RoomAvailable/>}  />
        <Route path='/allocate' element={<Allocate/>}  />
        <Route path='/Deallocate' element={<Deallocate/>}  />
        <Route path='/room-changeRequest' element={<RoomChangeRequest/>}  />

        
      </Routes>
    </BrowserRouter>
    </>

  )
  
}

export default App;
