import React from "react";
import Admin_Navbar from "./Admin_navbar";

import RoomConstraint from "./RoomConstraint.jsx";
import RoomAllocationRequest from "./RoomAllocationRequestList.js";
import RoomAvailable from "../student/RoomAvailable.jsx";
import Allocate from "./Allocate.jsx";
import Deallocate from "./Deallocate.jsx";
import RoomChangeRequest from "../student/RoomChangeRequest.jsx";


const Home = ()=>{
    return <>
    <Admin_Navbar/>
    <RoomConstraint/>
    <RoomAllocationRequest/>
    <Allocate/>
    <Deallocate/>
    <RoomAvailable/>
    <RoomChangeRequest/>
    </>
}

export default Home;